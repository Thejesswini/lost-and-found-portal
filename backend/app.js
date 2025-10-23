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

// ✅ READ - Get all items
app.get('/api/items', async (req, res) => {
  try {
    console.log('GET /api/items called');
    const items = await Item.find();
    console.log('Items found:', items.length);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// ✅ CREATE - Add new item with images
// `upload.array('images')` handles multiple file uploads with field name "images"
app.post('/api/items', upload.array('images'), async (req, res) => {
  try {
    console.log('POST /api/items called');

    // Convert uploaded images to base64
    const imageBase64 = req.files && req.files.length > 0
  ? req.files.map(file => file.buffer.toString('base64'))
  : [];


    const itemData = {
      ...req.body,
      images: imageBase64,
      dateLost: req.body.dateLost ? new Date(req.body.dateLost) : null,
      autofill: req.body.autofill === 'true' || false
    };

    console.log('Item data to save:', itemData);

    const item = new Item(itemData);
    const savedItem = await item.save();

    console.log('Item saved to MongoDB:', savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item', error });
  }
});

// Default route
app.get('/', (req, res) => res.send('Backend is running!'));

// Start server
app.listen(PORT, () => console.log(`🚀 Server is listening on http://localhost:${PORT}`));
