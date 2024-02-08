import mongoose from "mongoose";

const ExpendiSchema = new mongoose.Schema({
  amount: String,
  date: Date,
  payee: String,
  reason: String,
});

export default mongoose.models.Expendi || mongoose.model("Expendi", ExpendiSchema);
