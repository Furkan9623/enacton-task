const { createError } = require("../middleware/error-handler-middleware.js");
const Campaign = require("../models/campaigns-model.js");
require("dotenv").config();
const addCampaignController = async (req, res, next) => {
  console.log(req.body);
  const { campaign } = req.body;
  const clientUrl = process.env.CLIENT_URL;
  if (!campaign)
    return next(
      createError(
        "Please fill all the detaisl...",
        404,
        "add campaign controller"
      )
    );
  try {
    const existCampaing = await Campaign.findOne({ campaign });
    if (existCampaing)
      return next(
        createError("Campaign already exist...", 400, "add campaign")
      );
    let random = Math.floor(Math.random() * 9000) + 1000;
    const newCampaign = new Campaign({
      campaign,
      campaignUrl: `${clientUrl}/${random}`,
    });
    await newCampaign.save();
    return res.status(200).json({
      success: true,
      message: "add campaign...",
    });
  } catch (error) {
    return next(createError(error.message, 500, "add controller"));
  }
};

module.exports = { addCampaignController };
