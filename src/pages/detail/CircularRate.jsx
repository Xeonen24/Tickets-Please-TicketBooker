import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value }) => {
  return (
    <Box sx={{
      position: "absolute",
      display: "inline-block",
      width: "max-content",
    }}>
      <CircularProgress 
        variant="determinate" 
        value={value * 10} 
        color="error" 
        size={60} 
        />
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Typography
          variant="caption"
          component="div"
          fontWeight="800"
          sx={{ marginTop: "-7px",fontSize: "17px" }}
        >
          {Math.floor(value * 10) / 10}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;