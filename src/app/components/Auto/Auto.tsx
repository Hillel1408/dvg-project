import { Text, Heading, Stack, Button } from "@chakra-ui/react";
import type { AutoProps } from "@/app/components/Auto/Auto.props";

export default function Auto({ item, activeGarage, deleteAuto, addAuto }: AutoProps) {
    return (
        <Stack key={item.id} spacing={2} _hover={{ shadow: "md" }} p={2} border="1px" borderColor="gray.200" justifyContent={"space-between"}>
            <Text m={0}>{item.id}</Text>
            {item.name && (
                <Heading as="h2" m={0}>
                    {item.name}
                </Heading>
            )}
            {item.description && <Text m={0}>{item.description}</Text>}
            <Text m={0}>{item.model}</Text>

            {item.garage === activeGarage ? (
                <Button backgroundColor="red" color="white" _hover={{ backgroundColor: "" }} onClick={deleteAuto}>
                    Удалить из гаража
                </Button>
            ) : (
                <Button backgroundColor="Green" color="white" _hover={{ backgroundColor: "" }} onClick={addAuto}>
                    Добавить в гараж
                </Button>
            )}
        </Stack>
    );
}
