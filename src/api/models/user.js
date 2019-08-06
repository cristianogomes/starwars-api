const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptService = require('../service/bcrypt.service');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128
    },
    login: {
      type: String,
      maxlength: 128,
      index: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      maxlength: 128,
      trim: true
    },
    planets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const hash = bcryptService().password(this);
    this.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods = {
  transform() {
    const transformed = {};
    const fields = ['_id', 'name', 'email', 'login', 'createdAt'];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
};

module.exports = mongoose.model('User', userSchema);
