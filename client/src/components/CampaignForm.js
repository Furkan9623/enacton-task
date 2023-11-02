import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { addCampaign } from "../api/campaign-api";
const CampaignForm = ({ getCampaigns }) => {
  const [formInput, setFormInput] = useState("");
  const formSubmit = async (e) => {
    e.preventDefault();
    const result = await addCampaign({ campaign: formInput });
    console.log(result);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("new campaign added"), setFormInput(""), getCampaigns())
      : alert(error);
  };
  return (
    <form style={{ display: "flex", gap: "0.5rem" }} onSubmit={formSubmit}>
      <TextField
        type="text"
        fullWidth
        size="small"
        label="Add Compaign....."
        value={formInput}
        onChange={(e) => setFormInput(e.target.value)}
      />
      <Button variant="contained" type="submit" color="secondary" size="small">
        add
      </Button>
    </form>
  );
};

export default CampaignForm;
