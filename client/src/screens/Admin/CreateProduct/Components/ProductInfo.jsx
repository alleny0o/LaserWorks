import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../../redux/actions/categoryActions';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Wrap,
  WrapItem,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { Field, ErrorMessage } from "formik";

const ProductInfo = ({ values, errors, touched, setFieldValue }) => {

  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch]);

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={touched.name && errors.name} isRequired>
          <FormLabel htmlFor="name">Product Name</FormLabel>
          <Field
            as={Input}
            id="name"
            name="name"
            placeholder="Enter product name..."
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
          <FormControl isInvalid={touched.price && errors.price} isRequired>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Field
              as={Input}
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
            />
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={touched.discountPrice && errors.discountPrice}
          >
            <FormLabel htmlFor="discountPrice">Discount Price</FormLabel>
            <Field
              as={Input}
              id="discountPrice"
              name="discountPrice"
              type="number"
              placeholder="Enter discount price"
            />
            <FormErrorMessage>{errors.discountPrice}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
          <FormControl isInvalid={touched.stock && errors.stock} isRequired>
            <FormLabel htmlFor="stock">Stock</FormLabel>
            <Field
              as={Input}
              id="stock"
              name="stock"
              type="number"
              placeholder="Enter stock"
            />
            <FormErrorMessage>{errors.stock}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.quantity && errors.quantity} isRequired>
            <FormLabel htmlFor="quantity">Max-Quantity</FormLabel>
            <Field
              as={Input}
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter quantity"
            />
            <FormErrorMessage>{errors.quantity}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={touched.categories && errors.categories}>
          <FormLabel>Categories Product Embodies:</FormLabel>
          <Wrap spacing={8}>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <WrapItem key={category._id}>
                  <Checkbox
                    id={`category-${category._id}`}
                    isChecked={values.categories.includes(category._id)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const categoryId = category._id;
                      setFieldValue(
                        "categories",
                        isChecked
                          ? [...values.categories, categoryId]
                          : values.categories.filter((id) => id !== categoryId)
                      );
                    }}
                  >
                    {category.name}
                  </Checkbox>
                </WrapItem>
              ))
            ) : (
              <Text>No categories created/avaliable</Text>
            )}
          </Wrap>
          <FormErrorMessage>
            <ErrorMessage name="categories" />
          </FormErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ProductInfo;
