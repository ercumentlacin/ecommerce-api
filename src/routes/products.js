const express = require('express');
const Products = require('../models/products');

const router = express.Router();

// GET REQUEST
router.get('/', async (req, res) => {
  const { productId } = req.query;

  if (productId) {
    try {
      const product = await Products.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.value} numaralı ürün bulunamadı` });
    }
  } else {
    Products.find()
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
});

// POST REQUEST
router.post('/', (req, res, next) => {
  const newProduct = req.body;

  const product = new Products({
    title: newProduct.title,
    description: newProduct.description,
    price: newProduct.price,
    image: newProduct.image,
    color: newProduct.color,
    category: newProduct.category,
  });

  product
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// GET REQUEST BY ID
router.get('/?productId', async (req, res) => {
  try {
    const product = await Products.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: `${error.value} numaralı ürün bulunamadı` });
  }
});

// DELETE REQUEST BY ID
router.delete('/', (req, res) => {
  const { productId } = req.query;
  if (productId) {
    Products.findByIdAndDelete(productId)
      .then((deleted) => {
        res.status(204).json({ message: 'Silme işlemi başarılı.' });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res
      .status(404)
      .json({ message: "Ürün id'si olmadan silme işlemi yapılamaz." });
  }
});

// PATCH REQUEST
router.patch('/', async (req, res) => {
  const { productId } = req.query;

  if (productId) {
    try {
      const updateObject = req.body;
      const updatedProduct = await Products.updateOne(
        { _id: productId },
        {
          $set: updateObject,
        }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.value} numaralı ürün güncellenemedi` });
    }
  } else {
    res
      .status(404)
      .json({ message: "Ürün id'si olmadan düzenleme  işlemi yapılamaz." });
  }
});

module.exports = router;
