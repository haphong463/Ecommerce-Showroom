import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getImages } from "../../Vehicle/VehicleLibrary";

const StyledImageListItem = styled(ImageListItem)({
  position: "relative",
  overflow: "hidden",
  "&:hover img": {
    filter: "brightness(1.2)",
  },
  transition: "filter 0.3s ease-in-out",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "brightness(0.8)",
  transition: "filter 0.3s ease-in-out",
});
const Gallery = memo(() => {
  const [dataImage, setDataImage] = useState([]);
  useEffect(() => {
    getImages().then((data) => {
      if (data) {
        setDataImage(data);
      }
    });
  }, []);
  return (
    <Container
      sx={{
        mb: 15,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        className="title-specs"
        gutterBottom
        sx={{
          fontSize: ["1.5rem", "2.3rem", "3rem"],
        }}
      >
        <span className="title-text">Gallery</span>
      </Typography>
      <Box>
        <ImageList variant="masonry" cols={3} gap={8}>
          {dataImage.map((item) => (
            <StyledImageListItem key={item.imagePath}>
              <StyledImage
                srcSet={`${item.imagePath}?w=248&fit=crop&auto=format&dpr=1 1x, ${item.imagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.imagePath}?w=248&fit=crop&auto=format`}
                alt={item.imagePath}
                loading="lazy"
              />
            </StyledImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
});

export default Gallery;
