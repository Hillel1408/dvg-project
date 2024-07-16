import { Text, Heading, Stack, Button } from "@chakra-ui/react";
import type { GarageProps } from "@/app/components/Garage/Garage.props";

export default function Garage({ item, addCar }: GarageProps) {
    return (
        <Stack key={item.id} spacing={2} _hover={{ shadow: "md" }} p={2} border="1px" borderColor="gray.200">
            <Heading as="h2" m={0}>
                {item.name}
            </Heading>
            <Text m={0}>{item.description}</Text>
            <Button variant="outline" onClick={addCar}>
                Добавить авто
            </Button>
        </Stack>
    );
}
