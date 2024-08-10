import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  Image,
  Button,
  List,
  ListItem,
  Flex,
  IconButton,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const MediaDropzone = ({
  files,
  thumbnail,
  onFileChange,
  onThumbnailChange,
  filesError,
  thumbnailError,
}) => {
  const [rejected, setRejected] = useState([]);

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.500");
  const bgColor = useColorModeValue("white", "gray.800");

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        onFileChange([...files, ...newFiles]);
      }
      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    [files, onFileChange]
  );

  const removeImage = (name) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    onFileChange(updatedFiles);
    
    if (updatedFiles.length === 0 || files.findIndex(file => file.name === name) === thumbnail) {
      onThumbnailChange(null);
    }
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxSize: 60000000, // 60MB for approximately 1 minute video
  });

  return (
    <VStack spacing={6} align="stretch" width="100%" maxWidth="1200px" margin="0 auto">
      <Heading as="h4" size="md">
        Upload Product Media Here
      </Heading>
      <Box
        {...getRootProps()}
        borderWidth={2}
        borderStyle="dashed"
        borderColor={isDragActive ? hoverBorderColor : borderColor}
        borderRadius="md"
        p={8}
        textAlign="center"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{ borderColor: hoverBorderColor }}
        position="relative"
        bg={bgColor}
      >
        <input {...getInputProps()} />
        <Text fontSize="sm" color="gray.500">
          {isDragActive
            ? "Drop files here"
            : "Drag and drop files here, or click to select"}
        </Text>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={-1}
          _before={{
            content: '""',
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            borderTop: "2px dashed",
            borderColor: "inherit",
            transform: "rotate(-5deg)",
          }}
        />
      </Box>
      {filesError && (
        <Text color="rgb(192, 74, 74)" fontSize="xs" mt="-20px">
          {filesError}
        </Text>
      )}
      {files.length > 0 && (
        <Box>
          <Flex align="center" mb={2}>
            <Text fontSize="sm" fontWeight="medium">
              Attached Media
            </Text>
            <Box flex={1} height="1px" bg="gray.300" mx={2} />
          </Flex>
          {thumbnailError && !filesError && (
            <Text color="rgb(192, 74, 74)" fontSize="xs" mb={2}>
              {thumbnailError}
            </Text>
          )}
          <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
            {files.map((file, index) => (
              <Box key={file.name} position="relative">
                <Box position="relative" paddingBottom="100%">
                  <IconButton
                    icon={<CloseIcon />}
                    size="xs"
                    position="absolute"
                    top={-1}
                    right={-1}
                    zIndex={2}
                    colorScheme="red"
                    onClick={() => removeImage(file.name)}
                    aria-label="Remove image"
                  />
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={file.preview}
                      alt="Product Media"
                      objectFit="cover"
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                      borderRadius="md"
                      border="1px solid black"
                      onClick={() => onThumbnailChange(index)}
                      cursor="pointer"
                      onLoad={() => URL.revokeObjectURL(file.preview)}
                    />
                  ) : (
                    <Box
                      as="video"
                      src={file.preview}
                      controls
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  )}
                  {thumbnail === index && (
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      bg="blackAlpha.600"
                      color="white"
                      py={1}
                      textAlign="center"
                      fontSize="xs"
                    >
                      Thumbnail
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
      {rejected.length > 0 && (
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Rejected Files
          </Text>
          <List spacing={2}>
            {rejected.map(({ file, errors }) => (
              <ListItem
                key={file.name}
                bg="red.50"
                borderColor="red.200"
                borderWidth={1}
                borderRadius="md"
                p={2}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text fontSize="xs" fontWeight="medium">
                      {file.name}
                    </Text>
                    <List styleType="none">
                      {errors.map((error) => (
                        <ListItem key={error.code} color="red.500" fontSize="xs">
                          {error.message}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Button
                    size="xs"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => removeRejected(file.name)}
                  >
                    Remove
                  </Button>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </VStack>
  );
};

export default MediaDropzone;