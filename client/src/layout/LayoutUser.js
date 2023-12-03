import React from "react";
import { Main } from "../components/user/Main";
import { Footer } from "../components/user/Footer";

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
      {children}
      <Footer />
    </>
  );
};
