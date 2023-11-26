import { useState } from "react";

export const BrandForm = () => {
  const [brand, setBrand] = useState({
    name: "",
    description: "",
  });
  return <div>BrandForm</div>;
};
