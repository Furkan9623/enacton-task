import { Box, Typography } from "@mui/material";
import CompaignUrl from "../components/CompaginUrl";
import CampaignForm from "../components/CampaignForm";
import { useEffect, useState } from "react";
import { getAllCampaigns } from "../api/campaign-api";
const Campaign = () => {
  const [campaign, setCampaign] = useState([]);
  const getCampaigns = async () => {
    const result = await getAllCampaigns();
    console.log(result);
    const error = result?.response?.data?.message;
    const res = result?.data?.allCampaign;
    return result?.status === 200 ? setCampaign(res) : alert(error);
  };
  useEffect(() => {
    getCampaigns();
  }, []);
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
      <CampaignForm getCampaigns={getCampaigns} />
      {campaign?.length > 0 ? (
        <>
          {campaign?.map((elem) => {
            return (
              <CompaignUrl
                elem={elem}
                key={elem._id}
                getCampaigns={getCampaigns}
              />
            );
          })}
        </>
      ) : (
        <h2>No data available</h2>
      )}
    </Box>
  );
};
export default Campaign;
