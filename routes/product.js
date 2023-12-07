const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Endpoint para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Endpoint para obtener un producto
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product)
})

// Endpoint para crear uno o varios productos, recibe un arreglo de estos
router.post('/', async (req, res) => {
  try {
    const productArray = req.body.productArray;
    const newProductArray = [];

    for (let i = 0; i < productArray.length; i++) {
      const product = new Product({
        brand: productArray[i].brand,
        model: productArray[i].model,
        price: productArray[i].price,
        sizes: productArray[i].sizes,
        images: productArray[i].images,
        description: productArray[i].description
      });

      const newProduct = await product.save();
      newProductArray.push(newProduct);
    }

    res.status(201).json(newProductArray);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para actualizar un registro de producto
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.brand != null) {
    res.product.brand = req.body.brand
  }
  if (req.body.model != null) {
    res.product.model = req.body.model
  }
  if (req.body.price != null) {
    res.product.price = req.body.price
  }
  if (req.body.sizes != null) {
    res.product.sizes = req.body.sizes
  }
  if (req.body.images != null) {
    res.product.images = req.body.images
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Endpoint para eliminar un registro de producto
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.deleteOne()
    res.json({ message: 'Deleted Product' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}

module.exports = router