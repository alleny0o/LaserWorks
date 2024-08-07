import mongoose from 'mongoose';

const productTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductType = mongoose.model('ProductType', productTypeSchema);
export default ProductType;