import React, { useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { Box, VStack, List, ListItem, Button, Image, Grid, Text, Link, Icon } from "@chakra-ui/react"; // Chakra UI
import { FiPhone, FiLink, FiInstagram } from "react-icons/fi"; // Ícones do react-icons

// Tipagem das coordenadas e empresas
interface Empresa {
  nome: string;
  coordenadas: [number, number];
  imagem: string;  // Adicionando uma propriedade de imagem para a empresa
  endereco: string;
  telefone: string;
  site: string;
  instagram: string;
}

// Array com as empresas e suas coordenadas e imagens
const empresas: Empresa[] = [
  { 
    nome: "Empresa 1", 
    coordenadas: [50.879, 4.6997], 
    imagem: "https://www.mecanicospremium.com.br/img/logo-associados/scopino.png", 
    endereco: "Rua ABC, 123, São Paulo, SP", 
    telefone: "(11) 1234-5678", 
    site: "https://www.empresa1.com.br", 
    instagram: "https://www.instagram.com/empresa1" 
  },
  { 
    nome: "Empresa 2", 
    coordenadas: [51.505, -0.09], 
    imagem: "https://www.mecanicospremium.com.br/img/logo-associados/scopino.png", 
    endereco: "Avenida XYZ, 456, Rio de Janeiro, RJ", 
    telefone: "(21) 9876-5432", 
    site: "https://www.empresa2.com.br", 
    instagram: "https://www.instagram.com/empresa2" 
  },
  // Adicione mais empresas conforme necessário
];

const Mapa: React.FC = () => {
  // Tipagem do estado de viewport
  const [viewport, setViewport] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
  }>({
    latitude: 50.879,
    longitude: 4.6997,
    zoom: 8, // Começa com zoom mais afastado
  });

  // Função para centralizar o mapa e ajustar o zoom ao clicar na empresa
  const handleClickEmpresa = (coordenadas: [number, number]) => {
    setViewport({
      latitude: coordenadas[0],
      longitude: coordenadas[1],
      zoom: 14, // Ajuste o zoom como preferir
    });
  };

  return (
    <Grid 
      px={10}
      mt={20}
      mb={40}
      templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Responsividade (mobile: 1 coluna, desktop: 2 colunas)
      gap={4}
      width="100%"
      minH="300" // Definição de altura geral do Grid
    >
      {/* Mapa */}
      <Box 
        width="100%" 
        minH="353px" 
         overflow="hidden"
        borderRadius="lg" // Arredondando os cantos do mapa
        boxShadow="md" // Adicionando uma sombra para o mapa
      >
        <Map
          height={350}
          center={[viewport.latitude, viewport.longitude]}
          zoom={viewport.zoom}
        >
          {/* Marcadores */}
          {empresas.map((empresa, index) => (
            <Marker
              key={index}
              width={50}
              anchor={empresa.coordenadas}
            />
          ))}
        </Map>
      </Box>

      {/* Lista de empresas */}
      <VStack 
      overflowY={'auto'}
        width="100%" 
        p={4} 
        align="start" 
        height={345}
        spacing={6} 
        borderRadius="lg" 
        boxShadow="md" 
        bg="#052d56" // Adicionando o gradiente
      >
        <List spacing={3} width="100%">
          {empresas.map((empresa, index) => (
            <ListItem 
              key={index} 
              display="flex" 
              alignItems="flex-start" 
              width="100%" 
              p={4} 
              borderRadius="lg" 
              _hover={{ bg: "#042443" }}
              onClick={() => handleClickEmpresa(empresa.coordenadas)} // Adicionando o evento de clique
            >
              <Image
                src={empresa.imagem}
                alt={empresa.nome}
                boxSize="50px"
                objectFit="contain"
                mr={4}  // Espaçamento à esquerda da imagem
              />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" color="white">{empresa.nome}</Text>
                <Text fontSize="sm" color="whiteAlpha.800">{empresa.endereco}</Text>

                {/* Telefone, Site e Instagram */}
                <Button variant="link" colorScheme="blue" size="sm" leftIcon={<Icon as={FiPhone} />}>
                  {empresa.telefone}
                </Button>
                <Link href={empresa.site} isExternal>
                  <Button variant="link" colorScheme="teal" size="sm" leftIcon={<Icon as={FiLink} />}>
                    Visite o site
                  </Button>
                </Link>
                <Link href={empresa.instagram} isExternal>
                  <Button variant="link" colorScheme="purple" size="sm" leftIcon={<Icon as={FiInstagram} />}>
                    Instagram
                  </Button>
                </Link>
              </VStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Grid>
  );
};

export default Mapa;
