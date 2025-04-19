import { SimpleGrid, Text, VStack } from "@chakra-ui/react"

type CardsIndicadoresNumericosType = {
  totalMembros?: number,
  renovacoes?: number,
  inadimplentes?: number,
  totalTreinamentos?: number,
  totalTreinamentosFuturos?: number,
  totalUser?: number,
}

export const CardsIndicadoresNumericos = ({
  totalUser,
  totalMembros,
  renovacoes,
  inadimplentes,
  totalTreinamentos,
  totalTreinamentosFuturos,
}: CardsIndicadoresNumericosType) => {
  const cards = [
    { label: "Total de Associados Premium", value: totalMembros },
    { label: "Total de Treinamentos Realizados", value: totalTreinamentos },
    { label: "Total de Treinamentos Futuros", value: totalTreinamentosFuturos },
    { label: "Associados Renovados", value: renovacoes },
    { label: "Total de Inadimplentes", value: inadimplentes },
    { label: "Total Logins", value: totalUser },
  ];

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} p={4}>
      {cards.map((card, index) => (
        <VStack
          key={index}
          borderRadius="xl"
          justifyContent="center"
          align="center"
          w="full"
          h="120px"
          bg="white"
          border="1px solid #E2E8F0"
          boxShadow="sm"
          px={4}
          py={2}
          textAlign="center"
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: "32px", md: "40px" }}
            color="gray.800"
            className="heading-title"
          >
            {card.value ?? 0}
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
            className="indicator-title"
          >
            {card.label}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
}
