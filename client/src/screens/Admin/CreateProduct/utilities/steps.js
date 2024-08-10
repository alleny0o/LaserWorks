import MediaDropzone from "../Components/MediaDropzone";
import ProductInfo from "../Components/ProductInfo";
import ProductCustomization from "../Components/ProductCustomization";
import { step1ValidationSchema, step2ValidationSchema, step3ValidationSchema } from "./validationSchema";

export const steps = [
  {
    name: "Product Media",
    component: MediaDropzone,
    validationSchema: step1ValidationSchema, 
  },
  {
    name: "Product Info",
    component: ProductInfo,
    validationSchema: step2ValidationSchema, 
  },
  {
    name: "Product Customization",
    component: ProductCustomization,
    validationSchema: step3ValidationSchema, 
  },
];
