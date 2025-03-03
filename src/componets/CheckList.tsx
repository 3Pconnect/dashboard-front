import { Box, Checkbox, Text, VStack, Heading } from "@chakra-ui/react";

const Checklist = ({
  boschCarService,
  moduloDiagnosticoBosch,
  possuiEquipamentoBosch,
  atendimentoCarrosPremium,
  emDiaComObrigacoes,
  categoriaEmpresa,
  afiliadoEntidade,
}: {
  boschCarService: boolean;
  moduloDiagnosticoBosch: boolean;
  possuiEquipamentoBosch: boolean;
  atendimentoCarrosPremium: string;
  emDiaComObrigacoes: boolean;
  categoriaEmpresa: string;
  afiliadoEntidade: boolean;
}) => {
  return (
    <Box mt={5} p={5} bg="gray.50" borderRadius="md" boxShadow="md">
      <Heading fontSize="lg" mb={4} color="teal.500">
        Checklist
      </Heading>
      <VStack align="start" spacing={4}>
        <Checkbox isChecked={boschCarService} isDisabled>
          <Text as="span" fontWeight="semibold">É Bosch Car Service:</Text> {boschCarService ? 'Sim' : 'Não'}
        </Checkbox>
        <Checkbox isChecked={moduloDiagnosticoBosch} isDisabled>
          <Text as="span" fontWeight="semibold">Módulo Diagnóstico Bosch:</Text> {moduloDiagnosticoBosch ? 'Sim' : 'Não'}
        </Checkbox>
        <Checkbox isChecked={possuiEquipamentoBosch} isDisabled>
          <Text as="span" fontWeight="semibold">Possui Equipamento Bosch:</Text> {possuiEquipamentoBosch ? 'Sim' : 'Não'}
        </Checkbox>
        <Checkbox isChecked={!!atendimentoCarrosPremium} isDisabled>
          <Text as="span" fontWeight="semibold">Atendimento Carros Premium:</Text> {atendimentoCarrosPremium || 'Não informado'}
        </Checkbox>
        <Checkbox isChecked={emDiaComObrigacoes} isDisabled>
          <Text as="span" fontWeight="semibold">Em Dia com Obrigações Federais, Estaduais e Municipais:</Text> {emDiaComObrigacoes ? 'Sim' : 'Não'}
        </Checkbox>
        <Checkbox isChecked={!!categoriaEmpresa} isDisabled>
          <Text as="span" fontWeight="semibold">Categoria da Empresa:</Text> {categoriaEmpresa || 'Não informado'}
        </Checkbox>
        <Checkbox isChecked={afiliadoEntidade} isDisabled>
          <Text as="span" fontWeight="semibold">Afiliado a Entidades, Sindicato ou Associação:</Text> {afiliadoEntidade ? 'Sim' : 'Não'}
        </Checkbox>
      </VStack>
    </Box>
  );
};

export default Checklist;
