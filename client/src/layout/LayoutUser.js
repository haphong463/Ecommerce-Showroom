import React from "react";
import { Main } from "../components/user/Main";
import { Footer } from "../components/user/Footer";

export const LayoutUser = ({
  title,
  description,
  labelImg,
  img,
  children,
  colorHeader,
}) => {
  return (
    <>
      <Main
        title={title}
        description={description}
        labelImg={labelImg}
        img={img}
        colorHeader={colorHeader}
      />
      {children}
      <Footer />
    </>
  );
};
