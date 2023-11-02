import { Box, Typography } from "@mui/material";
import { deleteUserCampaign, incCount } from "../api/campaign-api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const CompaignUrl = ({ elem, getCampaigns }) => {
  const { _id, campaign, clickCount, campaignUrl } = elem;
  const increaseCount = async () => {
    const result = await incCount(_id);
    console.log(result);
    const error = result?.response?.data?.message;
    return result?.status === 200 ? getCampaigns() : alert(error);
  };

  const deleteCampaign = async () => {
    const result = await deleteUserCampaign(_id);
    console.log(result);
    const er = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("campaign deleted"), getCampaigns())
      : alert(er);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{campaign}</Typography>

      <Box
        sx={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            color: "blue",
          }}
          onClick={increaseCount}
        >
          {campaignUrl}
        </Typography>
        <Typography>Count : {clickCount}</Typography>
        <IconButton onClick={deleteCampaign}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CompaignUrl;
