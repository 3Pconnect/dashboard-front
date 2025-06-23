import { Image, VStack } from "@chakra-ui/react";
import EmptyImage from "../resources/empty.svg";

export const Empty = () => {
    return (
        <VStack mt={10}>
            <Image w={150} src={EmptyImage}/>
        </VStack>
    )
}