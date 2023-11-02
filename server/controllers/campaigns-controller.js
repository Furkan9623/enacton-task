const { createError } = require("../middleware/error-handler-middleware.js");
const Campaign = require("../models/campaigns-model.js");
require("dotenv").config();
const addCampaignController = async (req, res, next) => {
  console.log(req.body);
  const deviceName = req.headers["user-agent"];
  console.log(deviceName);
  console.log(req);
  console.log("IP address ", req.ip);
  const ipAddress = req.ip;
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
      ipAddress,
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

const getAllCampaignController = async (req, res, next) => {
  try {
    const allCampaign = await Campaign.find({});
    if (!allCampaign)
      return next(
        createError(
          "Not any campaign available",
          400,
          "get all campaign controler"
        )
      );
    return res.status(200).json({
      success: true,
      message: "fetch all campaign",
      allCampaign,
    });
  } catch (error) {
    return next(createError(error.message, 500, "get all campaign controller"));
  }
};

const increaseClickCountController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError("Please provide id", 400, "increase count"));
  try {
    const existUser = await Campaign.findOne({ _id: id });
    if (!existUser)
      return next(
        createError("campaign not exist", 400, "inc count controller")
      );
    await Campaign.findByIdAndUpdate(
      { _id: id },
      { $set: { clickCount: existUser?.clickCount + 1 } },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "inc count" });
  } catch (error) {
    return next(createError(error.message, 500, "increase count"));
  }
};

const deleteCampaignController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existCampaign = await Campaign.findOne({ _id: id });
    if (!existCampaign)
      return next(
        createError("not campaign found", 404, "delete campaign controller")
      );
    await Campaign.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true, message: "campaign deleted" });
  } catch (error) {
    return next(createError(error.message, 500, "delete campaign controller"));
  }
};
module.exports = {
  addCampaignController,
  getAllCampaignController,
  increaseClickCountController,
  deleteCampaignController,
};
