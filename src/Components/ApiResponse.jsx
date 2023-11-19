import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

function ApiResponse({ data }) {
  console.log(data);
  const item = data ? data[0] : null;

  return (
    <div>
      <Grid item xs={12} sm={12} md={12} sx={{ marginLeft: 3 }}>
        {item ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" style={{ marginTop: "30px" }}>
                Parsed Data
              </Typography>
            </Box>
            <Grid container spacing={2}>
            
                <>
                  <Grid xs={6} sm={6} md={6}>
                    <TextField
                      id="standard-basic"
                      label="Aadhaar Number"
                      variant="standard"
                      fullWidth
                      value={item.aadhaarNumber}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={6}>
                    <TextField
                      id="standard-basic"
                      label="Name on Aadhaar"
                      variant="standard"
                      fullWidth
                      value={item.name}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={6}>
                    <TextField
                      id="standard-basic"
                      label="Date of Birth"
                      variant="standard"
                      fullWidth
                      value={item.dob}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={6}>
                    <TextField
                      id="standard-basic"
                      label="Gender"
                      variant="standard"
                      fullWidth
                      value={item.gender}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={12}>
                    <TextField
                      id="standard-basic"
                      label="Address"
                      variant="standard"
                      fullWidth
                      value={item.address}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={6}>
                    <TextField
                      id="standard-basic"
                      label="Pincode"
                      variant="standard"
                      fullWidth
                      value={item.pincode}
                    />
                  </Grid>
                </>
              
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" style={{ marginTop: "30px" }}>
                API Response
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "lightgrey", 
            height: "8rem",
            borderRadius: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",}}>
              <Typography variant="body2" style={{ marginTop: "30px" }}>
              {`Response Data: ${JSON.stringify(item)}`}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" style={{ marginTop: "30px" }}>
                API Response
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "lightgrey", 
            height: "8rem",
            borderRadius: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",}}>
              <Typography variant="body2" style={{ marginTop: "30px" }}>
                Start Performing OCR Inputting Your Aadhaar front and back
              </Typography>
            </Box>
          </>
        )}
      </Grid>
    </div>
  );
}

export default ApiResponse;
