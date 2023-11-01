const mongoose = require("mongoose");
const campaignSchema = new mongoose.Schema(
  {
    campaign: { type: String, required: [true, "campaign name required..."] },
    campaignUrl: { type: String, required: [true, "campaign url required..."] },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
