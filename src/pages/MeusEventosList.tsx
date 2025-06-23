import { HStack, Text } from "@chakra-ui/react"
import TableUsers from "../componets/Table"
import PerfilsTable from "../componets/PerfilsTable"
import NovosMembrosTable from "../componets/NovosMembrosTable"
import AgendaEventosTable from "../componets/AgendaEventosTable"
import MeusEventosTable from "../componets/MeusEventosTable"

export const MeusEventosList = () => {
    return (<>
    <MeusEventosTable/>
    </>)
}