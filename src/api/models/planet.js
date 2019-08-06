const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      index: true,
      unique: true,
      trim: true
    },
    climate: {
      type: String,
      maxlength: 128,
      trim: true
    },
    terrain: {
      type: String,
      maxlength: 128,
      trim: true
    },
    filmsCount: {
      type: Number
    },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Planet', planetSchema);
