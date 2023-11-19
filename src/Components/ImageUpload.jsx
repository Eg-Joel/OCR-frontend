import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../utils/axios";
import ApiResponse from "../Components/ApiResponse";

function ImageUpload() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);
  const [loading, setLoading] = useState(null)
  const [textData, setTextData] = useState(null);

  const handleFrontImage = (e) => {
    const selectedImage = e.target.files[0];
      setFrontImage(selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFrontImagePreview(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    } else {
      setFrontImagePreview(null);
    }
  };

  const handleBackImage = (e) => {
    const selectedImage = e.target.files[0];
      setBackImage(selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBackImagePreview(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    } else {
      setBackImagePreview(null);
    }
  };

  const handleOCR = async (e) => {
    try {
      setLoading(true);
      if (!frontImage || !backImage) {
        toast.error("Please upload both Aadhaar front and back images.");
        setLoading(false);
        return;
      }

      const isImageTypeValid = (image) =>
      image.type === "image/png" ||
      image.type === "image/jpeg" ||
      image.type === "image/jpg";

    if (!isImageTypeValid(frontImage) || !isImageTypeValid(backImage)) {
      toast.error(
        "Invalid file type. Please select a PNG, JPEG, or JPG image."
      );
      setLoading(false);
      return;
    }
      const formData = new FormData();
      formData.append("files", frontImage);
      formData.append("files", backImage);
      

      const response = await axios.post(
        "ocr/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 201) {
        const data = response?.data?.data;
        setTextData(data);
        setLoading(false)
        toast.success("Aadhaar Parsed successfully");
      } else {
        toast.error(" Aadhaar Parsed failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CssBaseline />

      <Box sx={{ flexGrow: 1, margin: 0 }}>
        <Grid container>
          <Grid xs={5} sm={12} md={5}>
            <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ m: 3 }}>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Typography variant="h5">Aadhaar Front</Typography>
                </Box>

                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    {frontImagePreview ? (
                      <img
                        src={frontImagePreview}
                        alt="Front Aadhaar"
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                      />
                    ) : (
                      <label htmlFor="front-upload">
                        <IconButton color="primary" component="span">
                          <CloudUploadIcon fontSize="large" />
                        </IconButton>
                      </label>
                    )}
                    <input
                      type="file"
                      id="front-upload"
                      accept="image/*"
                      name="files"
                      onChange={handleFrontImage}
                      style={{ display: "none" }}
                    />
                    <Box>
                      <label htmlFor="front-upload">
                        {frontImagePreview
                          ? "Press to re-capture/Upload"
                          : "Click here to Upload/Capture"}
                      </label>
                    </Box>
                  </CardContent>
                </Card>
                <ToastContainer />
                <Box sx={{ display: "flex", mt: 2, alignContent: "center" }}>
                  <Typography variant="h5">Aadhaar Back</Typography>
                </Box>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    {backImagePreview ? (
                      <img
                        src={backImagePreview}
                        alt="Back Aadhaar"
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                      />
                    ) : (
                      <label htmlFor="back-upload">
                        <IconButton color="primary" component="span">
                          <CloudUploadIcon fontSize="large" />
                        </IconButton>
                      </label>
                    )}
                    <input
                      type="file"
                      id="back-upload"
                      accept="image/*"
                      name="files"
                      onChange={handleBackImage}
                      style={{ display: "none" }}
                    />
                    <Box>
                      <label htmlFor="front-upload">
                        {backImagePreview
                          ? "Press to re-capture/Upload"
                          : "Click here to Upload/Capture"}
                      </label>
                    </Box>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  onClick={handleOCR}
                  sx={{ mt: 3, mb: 2, background: "primary" }}
                >
                  {loading ? "loading" : "PARSE AADHAAR"}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid xs={7} sm={12} md={7}>
            <ApiResponse data={textData} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ImageUpload;
