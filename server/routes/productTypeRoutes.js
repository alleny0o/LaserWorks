import express from "express";
import expressAsyncHandler from "express-async-handler";
import ProductType from "../models/ProductType.js";

const router = express.Router();

const createProductType = expressAsyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const productType = new ProductType({
      name: name,
    });

    const createdProductType = await productType.save();

    res.status(201).json(createdProductType);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad request" });
  }
});

const getAllProductTypes = expressAsyncHandler(async (req, res) => {
  try {
    const allProductTypes = await ProductType.find({});
    res.status(201).json(allProductTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server malfunction" });
  }
});

router.route("/create-product-type").post(createProductType);
router.route('/get-all-product-types').get(getAllProductTypes);

export default router;
