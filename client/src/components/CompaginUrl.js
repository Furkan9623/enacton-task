import { Box, Typography } from "@mui/material";
const CompaignUrl = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography>Campaign 1</Typography>
      <Typography sx={{ cursor: "pointer", color: "blue" }}>
        http://localhost:300/furkan
      </Typography>
      <Typography>Count : 1</Typography>
    </Box>
  );
};

export default CompaignUrl;
