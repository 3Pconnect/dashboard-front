import { SimpleGrid, Text, VStack } from "@chakra-ui/react"

type CardsIndicadoresNumericosType = {
    totalMembros?: number,
    renovacoes?: number,
    inadimplentes?:number,
    totalTreinamentos?:number,
    totalTreinamentosFuturos?:number,
    totalUser?:number,
}
export const CardsIndicadoresNumericos = ({totalUser, totalMembros, renovacoes, inadimplentes, totalTreinamentos, totalTreinamentosFuturos}:CardsIndicadoresNumericosType) => {
    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} p={4}>
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#0B244D"}>
                <Text fontWeight={"bold"} className="heading-title"
                fontSize={"48px"} my={3}>{totalMembros}</Text>
                <Text className="indicator-title">Total de Associados Premium</Text>
            </VStack>
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#0B244D"}>
                <Text fontSize={"48px"} my={3} className="heading-title">{totalTreinamentos}</Text>
                <Text className="indicator-title">Total de Treinamentos Realizados</Text>
            </VStack>
            <VStack  borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#0B244D"}>
                <Text fontSize={"48px"} my={3} className="heading-title" >{totalTreinamentosFuturos}</Text>
                <Text className="indicator-title">Total de Treinamentos Futuros</Text>
            </VStack>
            <VStack  borderRadius={5}
            justifyContent={"center"} w={"full"} h={"100px"} bg={"#0B244D"}>
                <Text className="heading-title" fontSize={"48px"} my={3}>{renovacoes}</Text>
                <Text className="indicator-title">Associados Renovados</Text>
            </VStack>
            <VStack  borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#0B244D"}>
                <Text className="heading-title" fontSize={"48px"} my={3}>{inadimplentes}</Text>
                <Text className="indicator-title">Total de Inadiplêntes</Text>
            </VStack>
            <VStack  borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#0B244D"}>
                <Text className="heading-title" fontSize={"48px"} my={3}>{totalUser}</Text>
                <Text className="indicator-title">Total Logins</Text>
            </VStack>
        </SimpleGrid>
    )
}