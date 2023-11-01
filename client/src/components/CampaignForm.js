import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { addCampaign } from "../api/campaign-api";
const CampaignForm = () => {
  const [formInput, setFormInput] = useState("");
  const formSubmit = async (e) => {
    e.preventDefault();
    const result = await addCampaign({ campaign: formInput });
    console.log(result);
  };
  return (
    <form style={{ display: "flex", gap: "0.5rem" }} onSubmit={formSubmit}>
      <TextField
        type="text"
        fullWidth
        size="small"
        label="Add Compaign....."
        onChange={(e) => setFormInput(e.target.value)}
      />
      <Button variant="contained" type="submit" color="secondary" size="small">
        add
      </Button>
    </form>
  );
};

export default CampaignForm;
