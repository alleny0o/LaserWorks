import * as Yup from "yup";

export const step1ValidationSchema = Yup.object({
  files: Yup.array()
    .min(1, "Please upload at least one image")
    .test("has-image", "Please upload at least one image", function (value) {
      return value && value.some((file) => file.type.startsWith("image/"));
    }),
  thumbnail: Yup.number()
    .nullable()
    .test(
      "thumbnail-required",
      "Please select a thumbnail image",
      function (value) {
        return this.parent.files.length !== 0 && value !== null;
      }
    ),
});

export const step2ValidationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  discountPrice: Yup.number()
    .positive("Discount price must be positive")
    .test(
      "is-less-than-price",
      "Discount price should be less than regular price",
      function (value) {
        return !value || value < this.parent.price;
      }
    ),
  stock: Yup.number()
    .positive("Stock must be a positive number")
    .integer("Stock must be an integer")
    .required("Stock is required"),
  quantity: Yup.number()
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .required("Quantity is required")
    .test(
      "is-less-than-stock",
      "Quantity should be less than or equal to stock",
      function (value) {
        return !value || value <= this.parent.stock;
      }
    ),
  categories: Yup.array().of(Yup.string()),
});

export const step3ValidationSchema = Yup.object({
  customizable: Yup.boolean().required("Must select Product Type"),
  customization: Yup.array().of(
    Yup.object().shape({
      fieldType: Yup.string().required("Type of input is required"),
      mainDescription: Yup.string().required("Main description is required"),
      placeholder: Yup.string(),
      isRequired: Yup.string().required("Must choose this option"),
      subDescriptions: Yup.array().of(
        Yup.object().shape({
          text: Yup.string(),
        })
      ),
      options: Yup.array().of(
        Yup.object().shape({
          text: Yup.string(),
          isDisabled: Yup.boolean(),
        })
      ),
    })
  ),
});

export const finalValidationSchema = step1ValidationSchema
  .concat(step2ValidationSchema)
  .concat(step3ValidationSchema);
