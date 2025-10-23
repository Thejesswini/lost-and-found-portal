const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // ✅ increased limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/lostfound', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Multer setup (store uploaded images in memory as buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define item schema
const itemSchema = new mongoose.Schema({
 
  images: [String], // store base64 strings
  description: String,
  location: String,
  tag: String,
  dateLost: Date,
  status: { type: String, enum: ['lost','found','found and returned'], default: 'lost' },
  autofill: { type: Boolean, default: false },
  contact: String,
  additionalContact: String
});

const Item = mongoose.model('Item', itemSchema);


// UPDATE - Change item details only
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = { ...req.body };

    // Optional: convert dateLost to Date object if provided
    if (req.body.dateLost) updatedData.dateLost = new Date(req.body.dateLost);

    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});

// DELETE - Remove item by ID
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});
// Default route
app.get('/', (req, res) => res.send('Backend is running!'));

// Start server
app.listen(PORT, () => console.log(`🚀 Server is listening on http://localhost:${PORT}`));
