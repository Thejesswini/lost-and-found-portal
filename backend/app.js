const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const multer = require('multer');
//const Item = require('./models/Item');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const itemRoutes = require('./routes/itemRoutes');
app.use('/items', itemRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/lostfound', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Multer setup (store uploaded images in memory as buffer)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// Define item schema
// const itemSchema = new mongoose.Schema({
 
//   images: [String], // store base64 strings
//   description: String,
//   location: String,
//   tag: String,
//   dateLost: Date,
//   status: { type: String, enum: ['lost','found','found and returned'], default: 'lost' },
//   autofill: { type: Boolean, default: false },
//   contact: String,
//   additionalContact: String
// });

// const Item = mongoose.model('Item', itemSchema);

//  READ - Get all items
// app.get('/items', async (req, res) => {
//   try {
//     console.log('GET /api/items called');
//     const items = await Item.find();
//     console.log('Items found:', items.length);
//     res.json(items);
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).json({ message: 'Error fetching items', error });
//   }
// });

//  CREATE - Add new item with images
// `upload.array('images')` handles multiple file uploads with field name "images"
// app.post('/api/items', upload.array('images'), async (req, res) => {
//   try {
//     console.log('POST /api/items called');

//     // Convert uploaded images to base64
//     const imageBase64 = req.files && req.files.length > 0
//   ? req.files.map(file => file.buffer.toString('base64'))
//   : [];


//     const itemData = {
//       ...req.body,
//       images: imageBase64,
//       dateLost: req.body.dateLost ? new Date(req.body.dateLost) : null,
//       autofill: req.body.autofill === 'true' || false
//     };

//     console.log('Item data to save:', itemData);

//     const item = new Item(itemData);
//     const savedItem = await item.save();

//     console.log('Item saved to MongoDB:', savedItem);
//     res.status(201).json(savedItem);
//   } catch (error) {
//     console.error('Error adding item:', error);
//     res.status(500).json({ message: 'Error adding item', error });
//   }
// });

// UPDATE - Change item details only
// app.put('/api/items/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const updatedData = { ...req.body };

//     // Optional: convert dateLost to Date object if provided
//     if (req.body.dateLost) updatedData.dateLost = new Date(req.body.dateLost);

//     const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });
//     if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

//     res.json(updatedItem);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating item', error });
//   }
// });

// DELETE - Remove item by ID
// app.delete('/items/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedItem = await Item.findByIdAndDelete(id);
//     if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

//     res.json({ message: 'Item deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting item', error });
//   }
// });
// Default route
app.get('/', (req, res) => res.send('Backend is running!'));

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
