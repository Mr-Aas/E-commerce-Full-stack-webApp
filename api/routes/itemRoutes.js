import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
| Supports search using name and searchQuery
|--------------------------------------------------------------------------
|
| Examples:
| GET /api/items
| GET /api/items?search=namak
| GET /api/items?search=tata
| GET /api/items?search=atta
|
*/

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search?.trim()) {
      query = {
        $or: [
          {
            name: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            searchQuery: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      };
    }

    const products = await Product.find(query).sort({
      name: 1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT
|--------------------------------------------------------------------------
*/

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
*/

router.post('/', async (req, res) => {
  try {
    const {
      name,
      pricePerUnit,
      unitType,
      stock,
      searchQuery,
    } = req.body;

    if (!name || pricePerUnit === undefined || !unitType) {
      return res.status(400).json({
        message:
          'Name, pricePerUnit and Unit Type are required',
      });
    }

    const existingProduct = await Product.findOne({
      name: {
        $regex: `^${name.trim()}$`,
        $options: 'i',
      },
    });

    if (existingProduct) {
      return res.status(400).json({
        message:
          'A product with this name already exists',
      });
    }

    const product = new Product({
      name: name.trim(),
      pricePerUnit: Number(pricePerUnit),
      unitType,
      stock: Number(stock) || 0,
      searchQuery: searchQuery || '',
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT
|--------------------------------------------------------------------------
*/

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    if (req.body.name) {
      const existingProduct =
        await Product.findOne({
          name: {
            $regex: `^${req.body.name.trim()}$`,
            $options: 'i',
          },
          _id: {
            $ne: req.params.id,
          },
        });

      if (existingProduct) {
        return res.status(400).json({
          message:
            'A product with this name already exists',
        });
      }
    }

    product.name =
      req.body.name?.trim() ?? product.name;

    product.pricePerUnit =
      req.body.pricePerUnit ?? product.pricePerUnit;

    product.unitType =
      req.body.unitType ?? product.unitType;

    product.stock =
      req.body.stock ?? product.stock;

    product.searchQuery =
      req.body.searchQuery ??
      product.searchQuery;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
*/

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json({
      message:
        'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
