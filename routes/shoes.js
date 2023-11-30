const express = require('express')
const router = express.Router()
const Shoes = require('../models/shoes')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Getting all
router.get('/', async (req, res) => {
  try {
    const shoes = await Shoes.find()
    res.json(shoes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getShoes, (req, res) => {
  res.json(res.shoes)
})

// Creating one
router.post('/', async (req, res) => {
  try {

    let filename = undefined;

    if (req.body.image) {
      let base64Image = req.body.image.split(';base64,').pop();
      filename = uuidv4() + '.png'; // Genera un nombre de archivo único
      fs.writeFile('./public/' + filename, base64Image, { encoding: 'base64' }, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error al guardar la imagen');
        }
      });
    }

    const shoes = new Shoes({
      brand: req.body.brand,
      model: req.body.model,
      sizes: req.body.sizes,
      colors: req.body.colors,
      image: filename
    })

    const newShoes = await shoes.save()
    res.status(201).json(newShoes)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})

// Updating One
router.patch('/:id', getShoes, async (req, res) => {
  if (req.body.name != null) {
    res.shoes.name = req.body.name
  }
  if (req.body.brand != null) {
    res.shoes.brand = req.body.brand
  }
  if (req.body.model != null) {
    res.shoes.model = req.body.model
  }
  if (req.body.sizes != null) {
    res.shoes.sizes = req.body.sizes
  }
  if (req.body.colors != null) {
    res.shoes.colors = req.body.colors
  }
  if (req.body.image != null) {
    res.shoes.image = req.body.image
  }
  try {
    const updatedShoes = await res.shoes.save()
    res.json(updatedShoes)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getShoes, async (req, res) => {
  try {
    await res.shoes.remove()
    res.json({ message: 'Deleted Shoes' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getShoes(req, res, next) {
  let shoes
  try {
    shoes = await Shoes.findById(req.params.id)
    if (shoes == null) {
      return res.status(404).json({ message: 'Cannot find shoes' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.shoes = shoes
  next()
}

// Deleting One
router.delete('/:id', getShoes, async (req, res) => {
  try {
    await res.shoes.deleteOne()
    res.json({ message: 'Deleted Shoes' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getShoes(req, res, next) {
  let shoes
  try {
    shoes = await Shoes.findById(req.params.id)
    if (shoes == null) {
      return res.status(404).json({ message: 'Cannot find shoes' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.shoes = shoes
  next()
}

module.exports = router