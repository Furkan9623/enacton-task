const express = require("express");
const {
  addCampaignController,
} = require("../controllers/campaigns-controller");
const campaign_router = express.Router();
campaign_router.post("/add-campaign", addCampaignController);
module.exports = campaign_router;
