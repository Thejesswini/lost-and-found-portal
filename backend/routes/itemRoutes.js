const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// CREATE - Add new item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
});

// READ - Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// UPDATE - Update an item by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params; // ID of the item to update
  const updatedData = req.body; // New data for the item

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});

// DELETE - Remove an item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

module.exports = router;
