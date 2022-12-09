import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany(); //remove is same as deleteMany
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteMany();
  const createdUsers = await User.insertMany(data.users);
  res.status(200).send(createdUsers);
});

export default seedRouter;
