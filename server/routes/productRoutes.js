import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import Media from "../models/Media.js";
import upload from "../utils/uploadConfig.js";

const router = express.Router();

// Handler for creating a new product
const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    upload.array("medias", 20)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const thumbnailIndex = parseInt(req.body.thumbnail, 10);

      const mediaPromises = req.files.map((file, index) => {
        return new Media({
          type: file.mimetype.startsWith("image") ? "image" : "video",
          path: file.path,
          isThumbnail: index === thumbnailIndex,
        }).save();
      });

      const savedMedias = await Promise.all(mediaPromises);

      let customization = [];
      if (req.body.customization) {
        try {
          customization = JSON.parse(req.body.customization);
        } catch (error) {
          return res.status(400).json({message: 'Invalid customization data'});
        }
      }

      let categories = [];
      if (req.body.categories) {
        try {
          categories = JSON.parse(req.body.categories);
        } catch (error) {
          return res.status(400).json({message: "Invalid categories data"});
        }
      }


      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        discountPrice: req.body.discountPrice,
        categories: categories,
        productType: req.body.productType,
        customization: customization,
        medias: savedMedias.map(media => media._id),
        isProductNew: true,
      });


      const createdProduct = await product.save();

      return res.status(201).json(createdProduct);

    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTES
router.post("/create-product", createProduct);

export default router;
