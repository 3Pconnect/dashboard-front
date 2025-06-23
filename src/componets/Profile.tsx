import { Avatar, HStack, Stack, Text, VStack } from "@chakra-ui/react"
type ProfileType = {
    username?: string
}
export const Profile = ({ username }: ProfileType) => {
    return (<>
        <HStack mr={5}>
            <VStack spacing={0}>
                <Text fontWeight={"semibold"} fontSize={"small"}>Lucas Silva</Text>
            </VStack>
            <Avatar
                name={"Lucas Dias"}
                size={'sm'}
              
            />
        </HStack>
    </>)
}