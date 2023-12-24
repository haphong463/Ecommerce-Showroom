import React from "react";
import { Main } from "../components/user/Main";
import { Footer } from "../components/user/Footer";
import { Box } from "@mui/material";

export const LayoutUser = ({
  title,
  description,
  labelImg,
  img,
  children,
  imgDetail,
  home,
}) => {
  return (
    <>
      <Main
        title={title}
        description={description}
        labelImg={labelImg}
        img={img}
        imgDetail={imgDetail}
        home={home}
      />
      <Box height={80} />
      {children}
      <Footer />
    </>
  );
};
