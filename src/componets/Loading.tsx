import { Flex, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex
    className="heading-title"
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
    >
      <Spinner size="xl" color="blue.500" />
      <Text mt={4} fontSize="xl">
        Carregando...
      </Text>
    </Flex>
  );
};

export default Loading;