import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    // products of Admin user
    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });
    // insert products
    await Product.insertMany(sampleProducts);

    console.log("Data Imported successfully boi ♥");
    process.exit();
  } catch (error) {
    console.error(`${error}`);

    //exit with failure
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(" Data destroyyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);

    //exit with failure
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
