import mongoose, { Schema, Document } from "mongoose";

interface ClgProps extends Document {
  clgname: string;
  Category: string;
  compositescore: number;
  VARC_percentile: mongoose.Types.Decimal128;
  DILR_percentile: mongoose.Types.Decimal128;
  QA_percentile: mongoose.Types.Decimal128;
  overall_percentile: mongoose.Types.Decimal128;
  admin?: mongoose.Schema.Types.ObjectId;
}

const CollegeSchema = new Schema<ClgProps>({
  clgname: {
    type: String,
    required: true,
    unique: true,
  },
  Category: {
    type: String,
    default: "GEN",
  },
  compositescore: {
    type: Number,
    max: [100, "Invalid input"],
  },
  VARC_percentile: {
    type: mongoose.Schema.Types.Decimal128,
    default: mongoose.Types.Decimal128.fromString("0"),
    validate: {
      validator: (value: mongoose.Types.Decimal128) =>
        parseFloat(value.toString()) <= 100,
      message: "Invalid input",
    },
  },
  QA_percentile: {
    type: mongoose.Schema.Types.Decimal128,
    default: mongoose.Types.Decimal128.fromString("0"),
    validate: {
      validator: (value: mongoose.Types.Decimal128) =>
        parseFloat(value.toString()) <= 100,
      message: "Invalid input",
    },
  },
  DILR_percentile: {
    type: mongoose.Schema.Types.Decimal128,
    default: mongoose.Types.Decimal128.fromString("0"),
    validate: {
      validator: (value: mongoose.Types.Decimal128) =>
        parseFloat(value.toString()) <= 100,
      message: "Invalid input",
    },
  },
  overall_percentile: {
    type: mongoose.Schema.Types.Decimal128,
    default: mongoose.Types.Decimal128.fromString("0"),
    validate: {
      validator: (value: mongoose.Types.Decimal128) =>
        parseFloat(value.toString()) <= 100,
      message: "Invalid input",
    },
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const Clgscore = mongoose.model<ClgProps>("Clgscore", CollegeSchema);
export default Clgscore;
