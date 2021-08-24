const express = require('express');
const Products = require('../models/products');

const router = express.Router();

// GET REQUEST
router.get('/', (req, res) => {
  Products.find()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
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
router.get('/:productId', async (req, res) => {
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
router.delete('/:productId', (req, res) => {
  const { productId: id } = req.params;

  Products.findByIdAndUpdate({ _id: id }, req.body)
    .then((deleted) => {
      res.status(204).json({ message: 'Silme işlemi başarılı.' });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// PATCH REQUEST
router.patch('/:productId', async (req, res) => {
  try {
    const updateObject = req.body;
    const updatedProduct = await Products.updateOne(
      { _id: req.params.productId },
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
});

module.exports = router;
