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
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#424242"}>
                <Text fontSize={"x-large"}>{totalMembros}</Text>
                <Text>Total de Associados Premium</Text>
            </VStack>
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#424242"}>
                <Text fontSize={"x-large"}>{totalTreinamentos}</Text>
                <Text>Total de Treinamentos Realizados</Text>
            </VStack>
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#424242"}>
                <Text fontSize={"x-large"}>{totalTreinamentosFuturos}</Text>
                <Text>Total de Treinamentos Realizados</Text>
            </VStack>
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#424242"}>
                <Text fontSize={"x-large"}>{renovacoes}</Text>
                <Text>Taxa de Renovação de Associados</Text>
            </VStack>
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#424242"}>
                <Text fontSize={"x-large"}>{inadimplentes}</Text>
                <Text>Índice de Inadiplência</Text>
            </VStack>
            <VStack borderRadius={5} justifyContent={"center"} w={"full"} h={"100px"} bg={"#424242"}>
                <Text fontSize={"x-large"}>{totalUser}</Text>
                <Text>Total Logins</Text>
            </VStack>
        </SimpleGrid>
    )
}