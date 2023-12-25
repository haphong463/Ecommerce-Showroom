import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import styled from "@emotion/styled";

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
  return (
    <Container>
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
          {itemData.map((item) => (
            <StyledImageListItem key={item.img}>
              <StyledImage
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
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
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1555695232-57d88cacdfa5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1592032857148-5658283bb67b?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1622046120199-32f27980473d?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1565376901308-37344a4b06ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyJTIwc2hvd3Jvb218ZW58MHx8MHx8fDA%3D",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1577547622647-7b0742f47180?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhciUyMHNob3dyb29tfGVufDB8fDB8fHww",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1601725627849-3c1de3f79eb0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1505920978745-a4263cc884a6?q=80&w=1848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1591954635986-f16d99cc4142?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1549064233-945d7063292f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Coffee",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661775632324-d4d95c0e0099?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Storage",
  },
];
