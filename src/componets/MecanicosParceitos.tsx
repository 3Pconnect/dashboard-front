import React from "react";
import { Box, Text, HStack, Image } from "@chakra-ui/react";
const MecanicosParceiros: React.FC = () => {
  return (
    <Box fontFamily={"Roboto, sans-serif"}textAlign="center" p={2}>
      {/* Texto com número 40 em cor diferente */}
      <Text fontWeight={"normal"} fontSize="md" color="white">
        Mais de{" "}
        <Text as="span" color={"rgb(129, 175, 221)"} fontWeight="bold">
          40
        </Text>{" "}
        mecânicos e oficinas parceiras
      </Text>

      {/* Imagens dos países */}
      <HStack spacing={4} justify="center" mt={6}>
        <Box>
          <Image 
            src="https://mecanicospremium.com.br/build/assets/brasil-1f7ac662.png" 
            alt="Pais 1" 
            boxSize="28px" 
            objectFit="cover" 
            borderRadius="full" 
            boxShadow="md"
          />
        </Box>
        <Box>
          <Image 
            src="https://mecanicospremium.com.br/build/assets/estados-unidos-da-america-049ca448.png" 
            alt="Pais 2" 
            boxSize="28px" 
            objectFit="cover" 
            borderRadius="full" 
            boxShadow="md"
          />
        </Box>
        <Box>
          <Image 
            src="https://mecanicospremium.com.br/build/assets/reino-unido-16d2af8d.png" 
            alt="Pais 3" 
            boxSize="28px" 
            objectFit="cover" 
            borderRadius="full" 
            boxShadow="md"
          />
        </Box>
        <Box>
          <Image 
            src="https://mecanicospremium.com.br/build/assets/bandeira-d1655072.png" 
            alt="Pais 4" 
            boxSize="28px" 
            objectFit="cover" 
            borderRadius="full" 
            boxShadow="md"
          />
        </Box>
        <Box>
          <Image 
            src="https://mecanicospremium.com.br/build/assets/paraguai-74b0ca34.png" 
            alt="Pais 5" 
            boxSize="28px" 
            objectFit="cover" 
            borderRadius="full" 
            boxShadow="md"
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default MecanicosParceiros;
