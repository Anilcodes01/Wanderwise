import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availableDates: {
      type: [Date],
      required: true,
      validate: {
        validator: function (dates) {
          return dates.length > 0;
        },
        message: "There must be at least one available date.",
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (url) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(url);
        },
        message: "Invalid image URL.",
      },
    },
  },
  { timestamps: true }
);
const Package = mongoose.model("Package", packageSchema);

export default Package;
