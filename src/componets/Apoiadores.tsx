import { VStack, HStack, Image, useBreakpointValue, Text } from "@chakra-ui/react";

export const Apoiadores = () => {

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack w="full" bg="white" mt={5} minH={350} p={5}>
      {isMobile ? <>

        <Text fontSize={"2xl"} color={"black"}>Apoiadores Master</Text>
        <VStack
          spacing={8}
          align="center"
          justify="center"
          w="full"

        >
          {/* Apoiador 1 */}
          <Image
            src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
            alt="Apoiador 1"
            boxSize="150px" // Ajuste o tamanho das imagens conforme necessário
            objectFit="contain"
          />
          {/* Apoiador 2 */}
          <Image
            src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
            alt="Apoiador 2"
            boxSize="150px"
            objectFit="contain"
          />
          {/* Apoiador 3 */}
          <Image
            src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
            alt="Apoiador 3"
            boxSize="150px"
            objectFit="contain"
          />
          {/* Apoiador 4 */}
          <Image
            src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
            alt="Apoiador 4"
            boxSize="150px"
            objectFit="contain"
          />
          {/* Apoiador 5 */}
          <Image
            src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
            alt="Apoiador 5"
            boxSize="150px"
            objectFit="contain"
          />
        </VStack>
      </> :
        <>
          <Text fontWeight={"bold"} fontFamily={"Roboto, sans-serif"} fontSize={"24px"} color={"gray.600"}>Apoiadores Master</Text>
          <HStack
            spacing={8}
            align="center"
            justify="center"
            w="full"

          >
            {/* Apoiador 1 */}
            <Image
              src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
              alt="Apoiador 1"
              boxSize="150px" // Ajuste o tamanho das imagens conforme necessário
              objectFit="contain"
            />
            {/* Apoiador 2 */}
            <Image
              src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
              alt="Apoiador 2"
              boxSize="150px"
              objectFit="contain"
            />
            {/* Apoiador 3 */}
            <Image
              src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
              alt="Apoiador 3"
              boxSize="150px"
              objectFit="contain"
            />
            {/* Apoiador 4 */}
            <Image
              src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
              alt="Apoiador 4"
              boxSize="150px"
              objectFit="contain"
            />
            {/* Apoiador 5 */}
            <Image
              src="https://mecanicospremium.com.br/build/assets/05-7fea454b.png"
              alt="Apoiador 5"
              boxSize="150px"
              objectFit="contain"
            />
          </HStack>
        </>}

    </VStack>
  );
};
