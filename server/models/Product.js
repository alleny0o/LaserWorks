import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const customizationOptionSchema = new mongoose.Schema({
  text: {type: String, required: false},
  isDisabled: {type: Boolean, default: false},
});

const customizationDetailSchema = new mongoose.Schema({
  text: {type: String, required: false},
})

const customizationFieldSchema = new mongoose.Schema({
  fieldType: {
    type: String,
    required: true,
    enum: ['select', 'text', 'number', 'textarea']
  },
  label: {type: String, required: true},
  isRequired: {type: String, required: true, enum: ['Yes', 'No']},
  moreDetails: [customizationDetailSchema],
  options: [customizationOptionSchema],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: -1 },
    medias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,          
    }],
    productType: { type: String, required: true },
    customization: [customizationFieldSchema],   
    reviews: [reviewSchema],
    numReviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    isProductNew: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "products");
export default Product;
