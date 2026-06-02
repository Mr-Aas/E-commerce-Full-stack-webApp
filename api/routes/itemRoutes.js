import express from 'express';
import Product from '../models/Item.js';

const router = express.Router();

const toLegacyProductShape = (productDoc) => ({
  _id: productDoc._id,
  name: productDoc.name?.en || productDoc.name?.desi || productDoc.name?.hi || 'Unnamed Product',
  names: productDoc.name,
  category: productDoc.category,
  subcategory: productDoc.subcategory,
  subcategoryType: productDoc.subcategoryType,
  unitType: productDoc.unitType,
  pricePerUnit: productDoc.price,
  price: productDoc.price,
  stock: productDoc.stock,
  isAvailable: productDoc.isAvailable,
});

const normalizeAdminPayloadToProduct = (payload, existingProduct = null) => {
  const baseName =
    payload?.name?.en ||
    payload?.name ||
    existingProduct?.name?.en ||
    '';
  const category = payload?.category || existingProduct?.category || '';
  const subcategory = payload?.subcategory || existingProduct?.subcategory || category || 'General';
  const subcategoryType =
    payload?.subcategoryType || existingProduct?.subcategoryType || 'NonPerishable';
  const priceValue =
    payload?.price ?? payload?.pricePerUnit ?? existingProduct?.price ?? 0;

  return {
    name: {
      en: (payload?.name?.en || payload?.name || existingProduct?.name?.en || '').trim(),
      hi: (payload?.name?.hi || payload?.name || existingProduct?.name?.hi || baseName).trim(),
      desi: (payload?.name?.desi || payload?.name || existingProduct?.name?.desi || baseName).trim(),
    },
    price: Number(priceValue),
    unitType: payload?.unitType || existingProduct?.unitType,
    category: category.trim(),
    subcategory: subcategory.trim(),
    subcategoryType,
    brand: payload?.brand ?? existingProduct?.brand,
    stock:
      payload?.stock !== undefined
        ? Number(payload.stock)
        : (existingProduct?.stock ?? 0),
    images: Array.isArray(payload?.images) ? payload.images : (existingProduct?.images || []),
    description: payload?.description ?? existingProduct?.description,
    isAvailable:
      payload?.isAvailable !== undefined
        ? Boolean(payload.isAvailable)
        : (existingProduct?.isAvailable ?? true),
    expiryDate: payload?.expiryDate || existingProduct?.expiryDate,
  };
};

// GET all Products (with optional search query for dropdown autocomplete)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { 'name.en': { $regex: search, $options: 'i' } },
          { 'name.hi': { $regex: search, $options: 'i' } },
          { 'name.desi': { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }
    
    const Products = await Product.find(query).sort({ 'name.en': 1 });
    res.json(Products.map(toLegacyProductShape));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new Product (Admin)
router.post('/', async (req, res) => {
  const { name, category, unitType, pricePerUnit, price } = req.body;
  
  if (!name || !category || !unitType || (pricePerUnit === undefined && price === undefined)) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const normalized = normalizeAdminPayloadToProduct(req.body);
    // Check if Product name already exists (english primary name)
    const ProductExists = await Product.findOne({
      'name.en': { $regex: `^${normalized.name.en.trim()}$`, $options: 'i' },
    });
    if (ProductExists) {
      return res.status(400).json({ message: 'An Product with this name already exists' });
    }

    const newProduct = new Product(normalized);
    
    const savedProduct = await newProduct.save();
    res.status(201).json(toLegacyProductShape(savedProduct));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) an Product (Admin)
router.put('/:id', async (req, res) => {
  const { name, category, unitType, pricePerUnit } = req.body;
  
  try {
    const Product = await Product.findById(req.params.id);
    if (!Product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (name) {
      // Check if name is already taken by another Product
      const ProductExists = await Product.findOne({ 
        'name.en': { $regex: `^${name.trim()}$`, $options: 'i' },
        _id: { $ne: req.params.id }
      });
      if (ProductExists) {
        return res.status(400).json({ message: 'An Product with this name already exists' });
      }
    }

    const normalized = normalizeAdminPayloadToProduct(req.body, Product);
    Product.name = normalized.name;
    Product.category = normalized.category;
    Product.subcategory = normalized.subcategory;
    Product.subcategoryType = normalized.subcategoryType;
    Product.unitType = normalized.unitType;
    Product.price = normalized.price;
    Product.brand = normalized.brand;
    Product.stock = normalized.stock;
    Product.images = normalized.images;
    Product.description = normalized.description;
    Product.isAvailable = normalized.isAvailable;
    Product.expiryDate = normalized.expiryDate;
    
    const updatedProduct = await Product.save();
    res.json(toLegacyProductShape(updatedProduct));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an Product (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const Product = await Product.findByIdAndDelete(req.params.id);
    if (!Product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
