import { models, model, Schema } from "mongoose";

const adSchema = new Schema(
  {
    title: {
      type: String,
      reqired: true,
    },
    description: {
      type: String,
      reqired: true,
    },
    location: {
      type: String,
      reqired: true,
    },
    phone: {
      type: String,
      reqired: true,
    },
    price: {
      type: Number,
      reqired: true,
    },
    realState: {
      type: String,
      reqired: true,
    },
    constructionDate: {
      type: Date,
      reqired: true,
    },
    category: {
      type: String,
      enum: ["villa", "apartment", "store", "earth"],
      reqired: true,
    },
    rules: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Ad = models.Ad || model("Ad", adSchema);

export default Ad;