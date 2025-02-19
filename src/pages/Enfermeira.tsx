import { Box, Button, Container, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="container.xl" p={4} bg="#fef6e4">
      {/* Hero Section */}
      <Stack direction={{ base: "column", md: "row" }} align="center" spacing={8} py={10}>
        <VStack align="start" spacing={4}>
          <Heading as="h1" size="xl" color="#ff8ba7">
            Consultoria em Amamentação
          </Heading>
          <Text fontSize="lg" color="#6246ea">
            Atendimento especializado para mães e recém-nascidos, com suporte profissional para uma amamentação saudável e tranquila.
          </Text>
          <Button colorScheme="pink" size="lg">Agende uma Consulta</Button>
        </VStack>
        <Image src="https://source.unsplash.com/600x400/?mother,baby" alt="Mãe amamentando" borderRadius="lg" />
      </Stack>
      
      {/* Sobre Mim */}
      <Box py={10} textAlign="center">
        <Heading as="h2" size="lg" color="#ff8ba7">Sobre Mim</Heading>
        <Text maxW="600px" mx="auto" mt={4} color="#6246ea">
          Sou enfermeira especializada no cuidado com recém-nascidos e assessoria de amamentação. Meu objetivo é proporcionar suporte acolhedor e profissional para mães que desejam amamentar com segurança e conforto.
        </Text>
        <Image src="https://media.istockphoto.com/id/1421926727/pt/foto/family-mother-and-little-baby-beautiful-and-happy-together-portrait-on-white-background.jpg?s=612x612&w=0&k=20&c=NrmRuO0iW4Hsshq-vEi3cl5DT6gVwkhWpwQeXK08Ev0=" alt="Enfermeira com bebê" borderRadius="lg" mt={4} />
      </Box>
      
      {/* Serviços */}
      <Box py={10}>
        <Heading as="h2" size="lg" textAlign="center" color="#ff8ba7">Serviços</Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={8} justify="center" mt={6}>
          <VStack p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="#fef6e4">
            <Image src="https://media.istockphoto.com/id/1421926727/pt/foto/family-mother-and-little-baby-beautiful-and-happy-together-portrait-on-white-background.jpg?s=612x612&w=0&k=20&c=NrmRuO0iW4Hsshq-vEi3cl5DT6gVwkhWpwQeXK08Ev0=" alt="Consultoria de Amamentação" borderRadius="md" />
            <Heading size="md" color="#ff8ba7">Consultoria de Amamentação</Heading>
            <Text color="#6246ea">Ajudo mães com dificuldades na amamentação, garantindo um processo saudável para o bebê.</Text>
          </VStack>
          <VStack p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="#fef6e4">
            <Image src="https://media.istockphoto.com/id/1421926727/pt/foto/family-mother-and-little-baby-beautiful-and-happy-together-portrait-on-white-background.jpg?s=612x612&w=0&k=20&c=NrmRuO0iW4Hsshq-vEi3cl5DT6gVwkhWpwQeXK08Ev0=" alt="Cuidados com o Recém-Nascido" borderRadius="md" />
            <Heading size="md" color="#ff8ba7">Cuidados com o Recém-Nascido</Heading>
            <Text color="#6246ea">Oriento sobre os primeiros cuidados com o bebê, incluindo banho, sono e alimentação.</Text>
          </VStack>
        </Stack>
      </Box>
      
      {/* Contato */}
      <Box py={10} textAlign="center" bg="#ff8ba7" p={6} borderRadius="lg">
        <Heading as="h2" size="lg" color="#fef6e4">Entre em Contato</Heading>
        <Text mt={4} color="#fef6e4">Tire suas dúvidas ou agende uma consulta pelo WhatsApp.</Text>
        <Button mt={4} colorScheme="pink" size="lg">Fale Comigo</Button>
      </Box>
    </Container>
  );
}
