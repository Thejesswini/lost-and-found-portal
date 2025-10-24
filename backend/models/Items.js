const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemid: { type: String, required: true, default: () => new mongoose.Types.ObjectId().toString() },
  images: [String], // array of image URLs or filenames
  description: String,
  location: String,
  tag: String,
  dateLost: Date,
  status: { type: String, enum: ['lost', 'found', 'found and returned'], default: 'lost' },
  autofill: { type: Boolean, default: false },
  contact: String,
  additionalContact: String
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
