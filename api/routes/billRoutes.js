import express from 'express';
import Bill from '../models/Bill.js';
import Item from '../models/product.js';

const router = express.Router();

// POST /calculate - Receive client cart, verify pricing, save bill, and return verified bill
router.post('/calculate', async (req, res) => {
  const { items } = req.body; // Array of { itemId, quantity }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No items provided for calculation' });
  }

  try {
    let totalAmount = 0;
    const verifiedItems = [];

    for (const cartItem of items) {
      const { itemId, quantity } = cartItem;
      if (!itemId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid item ID or quantity' });
      }

      // Fetch official price and unit type from database
      const dbItem = await Item.findById(itemId);
      if (!dbItem) {
        return res.status(404).json({ message: `Item with ID ${itemId} not found` });
      }

      // Calculate verified price for this item
      let calculatedPrice = 0;
      if (dbItem.unitType === 'gram') {
        // Quantity is in grams, pricePerUnit is per kg (1000g)
        calculatedPrice = (quantity / 1000) * dbItem.pricePerUnit;
      } else {
        // 'unit' or 'meter' - directly multiplied by quantity
        calculatedPrice = quantity * dbItem.pricePerUnit;
      }

      // Round to 2 decimal places to prevent floating point inaccuracies
      calculatedPrice = Math.round(calculatedPrice * 100) / 100;
      totalAmount += calculatedPrice;

      verifiedItems.push({
        productId: dbItem._id,
        name: dbItem.name || 'Unnamed Product',
        quantity,
        unitType: dbItem.unitType,
        pricePerUnit: dbItem.pricePerUnit,
        price: calculatedPrice,
      });
    }

    // Round total amount
    totalAmount = Math.round(totalAmount * 100) / 100;

    // Create and save new bill
    const newBill = new Bill({
      items: verifiedItems,
      totalAmount,
      status: 'Unpaid', // Default watermark status
    });

    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET / - Fetch all bills (Admin logs)
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /stats - Fetch dashboard statistics (Admin dashboard)
router.get('/stats', async (req, res) => {
  try {
    const totalBills = await Bill.countDocuments();

    // Aggregation for total revenue and average bill amount
    const revenueStats = await Bill.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          avgRevenue: { $avg: '$totalAmount' },
        },
      },
    ]);

    const totalRevenue = revenueStats[0]?.totalRevenue || 0;
    const avgRevenue = revenueStats[0]?.avgRevenue || 0;

    // Aggregation for category-wise distribution
    // Note: We need to pull the category of items from the Item collection or aggregate with lookup
    // However, since Item may get deleted or category info is not stored directly on Bill items,
    // let's do a lookup to resolve category of each sold item.
    const categoryStats = await Bill.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'itemDetails',
        },
      },
      { $unwind: { path: '$itemDetails', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: { $ifNull: ['$itemDetails.category', { $ifNull: ['$items.category', 'Uncategorized'] }] },
          revenue: { $sum: '$items.price' },
          count: { $sum: '$items.quantity' },
        },
      },
      { $sort: { revenue: -1 } }
    ]);

    // Top selling items
    const topSellingItems = await Bill.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          unitType: { $first: '$items.unitType' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.price' },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      totalBills,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      avgRevenue: Math.round(avgRevenue * 100) / 100,
      categoryStats: categoryStats.map(stat => ({
        category: stat._id,
        revenue: Math.round(stat.revenue * 100) / 100,
        count: stat.count
      })),
      topSellingItems: topSellingItems.map(item => ({
        name: item._id,
        unitType: item.unitType,
        totalQuantity: item.totalQuantity,
        totalRevenue: Math.round(item.totalRevenue * 100) / 100,
        salesCount: item.count
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
