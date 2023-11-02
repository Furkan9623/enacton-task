const express = require("express");
const {
  addCampaignController,
  getAllCampaignController,
  increaseClickCountController,
  deleteCampaignController,
} = require("../controllers/campaigns-controller");
const campaign_router = express.Router();
campaign_router.post("/add-campaign", addCampaignController);
campaign_router.get("/get-campaigns", getAllCampaignController);
campaign_router.patch("/inc-count/:id", increaseClickCountController);
campaign_router.delete("/delete/:id", deleteCampaignController);

module.exports = campaign_router;
