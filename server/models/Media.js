import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video"], required: true },
    path: { type: String, required: true },
    isThumbnail: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Media = mongoose.model('Media', mediaSchema);
export default Media;
