import {
  Flex,
  Text,
  VStack,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Input, Button } from "antd";

const Landing = () => {
  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      height="100vh"
      width="100vw"
      backgroundImage="url('https://i.ibb.co/p6P4RYJc/capa-1.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      px={6}
      py={10}
    >
      <VStack
        bg="rgba(0, 0, 0, 0.25)"
        p={{ base: 8, md: 14 }}
        borderRadius="2xl"
        spacing={8}
        maxW="850px"
        w="full"
        ml={{ base: 0, md: 130 }}
        align="stretch"
      >
        <Image
          src="https://lucrativo.eleventecnologias.com/wp-content/uploads/2025/05/LOGO-OFICIAL.png"
          alt="Logo"
          maxW="240px"
          mx="auto"
        />

        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color="white"
          textAlign="center"
          lineHeight="1.4"
          className="indicator-font"
          whiteSpace="pre-line"  // para respeitar as quebras de linha no texto
        >
          R$50.000 DE FATURAMENTO POR MÊS{'\n'}
          SEM DEPENDER DE INDICAÇÕES{'\n'}
          USANDO O MÉTODO{' '}
          <Text as="span" color="orange.400">
            PIT STOP X 5
          </Text>
        </Text>


        <Text
          className="indicator-font"
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.200"
          textAlign="center"
          lineHeight="1.8"
        >
          O mercado MUDOU para{" "}
          <Text className="indicator-font" as="span" color="orange.300" fontWeight="bold">
            99% das oficinas...
          </Text>{" "}
          Em 6 meses o setor estará dividido entre os{" "}
          <Text className="indicator-font" as="span" fontWeight="bold">
            DONOS de oficinas lucrativas
          </Text>{" "}
          e os que{" "}
          <Text className="indicator-font" as="span" fontWeight="bold">
            FECHARAM as portas.
          </Text>
        </Text>

        <HStack spacing={4} flexDir={{ base: "column", md: "row" }}>
          <Input
            className="indicator-font"
            placeholder="Nome"
            size="large"
            style={{
              height: 52,
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: 8,
            }}
          />
          <Input
            className="indicator-font"
            placeholder="Telefone"
            size="large"
            style={{
              height: 52,
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: 8,
            }}
          />
        </HStack>

        <Input
          className="indicator-font"
          placeholder="Email"
          size="large"
          style={{
            height: 52,
            backgroundColor: "#1a1a1a",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: 8,
          }}
        />

        <Button
          className="button-premium"
          type="primary"
          size="large"
          style={{
            height: 56,
            fontSize: "1.2rem",
            backgroundColor: "#ff8403",
            borderColor: "#ff8403",
            color: "#fff",
            fontWeight: "bolder",
            borderRadius: 10,
            boxShadow: "0 0 15px #ff8403",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={e =>
            (e.currentTarget.style.boxShadow = "0 0 25px #ff8403, 0 0 40px #ff8403")
          }
          onMouseLeave={e =>
            (e.currentTarget.style.boxShadow = "0 0 15px #ff8403")
          }
        >
          QUERO ME CADASTRAR
        </Button>
      </VStack>
    </Flex>
  );
};

export default Landing;
