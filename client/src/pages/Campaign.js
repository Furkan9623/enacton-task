import { TextField, Box, Button, Typography } from "@mui/material";
import CompaignUrl from "../components/CompaginUrl";
import CampaignForm from "../components/CampaignForm";
const Campaign = () => {
  return (
    <Box
      sx={{
        width: "35rem",
        boxShadow: "0 0 5px grey",
        padding: "2rem",
        margin: "auto",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">ADD COMPAIGN</Typography>
      <CampaignForm />
      <CompaignUrl />
    </Box>
  );
};
export default Campaign;
