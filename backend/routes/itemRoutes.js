
const express = require('express');
const router = express.Router();
const Item = require('../models/Items');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {verifyToken} = require("../middleware/auth-middleware");

// CREATE - Add new item
router.post('/', upload.array('images'), verifyToken, async (req, res) => {
  console.log(req.body);
  console.log(res.body);
  // try {
  //   const item = new Item(req.body);
  //   await item.save();
  //   res.status(201).json(item);
  // } catch (error) {
  //   res.status(500).json({ message: 'Error creating item', error });
  // }
  try {
    console.log('POST /items called');

    // Convert uploaded images to base64
    const imageBase64 = req.files && req.files.length > 0
  ? req.files.map(file => file.buffer.toString('base64'))
  : [];


    const itemData = {
      ...req.body,
      images: imageBase64,
      dateLost: req.body.dateLost ? new Date(req.body.dateLost) : null,
      autofill: req.body.autofill === 'true' || false,
      createdBy: req.user.id
    };

    console.log('Item data to save:', itemData);

    const item = new Item(itemData);
    const savedItem = await item.save();

    console.log('Item saved to MongoDB:', savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item', error });
}});

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
router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Update text fields
    item.description = req.body.description;
    item.location = req.body.location;
    item.tag = req.body.tag;
    item.dateLost = req.body.dateLost;
    item.status = req.body.status;
    item.autofill = req.body.autofill;
    item.contact = req.body.contact;
    item.additionalContact = req.body.additionalContact;

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      const newImgBase64 = req.files.map(file => file.buffer.toString('base64'));
      item.images.push(...newImgBase64);
    }

    const updatedItem = await item.save();
    res.json(updatedItem);

  } catch (error) {
    console.error(error);
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

// GET single item by ID — place this BEFORE the /:userid route
router.get("/id/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item); // send the single item object
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:userid", verifyToken, async (req, res) => {
    try {
        const items = await Item.find({ createdBy: req.params.userid });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;

router.get("/search/:tag", async (req, res) => {
  console.log("reached itemRoutes");
  try {
    const tag = req.params.tag;
    console.log(tag);
    const items = await Item.find({ tag: tag });
    res.json(items);
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).json({ message: "Server error" });
  }
});
