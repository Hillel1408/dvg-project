"use client";

import { useQuery } from "@tanstack/react-query";
import { garageService } from "@/app/services";
import { SimpleGrid, Text, Heading, Container, Stack, Button, Spinner, useDisclosure, Box, Center } from "@chakra-ui/react";
import { MyModal } from "@/app/components";
import { useState } from "react";

export default function GarageList() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeGarage, setActiveGarage] = useState(0);

    const page = 1;

    const { data, isLoading } = useQuery({
        queryKey: ["garage", page],
        queryFn: () => garageService.getAll(page),
        select: ({ data }) => data,
    });

    return (
        <>
            <Container maxW="1920px" mx="auto">
                {isLoading ? (
                    <Center className="spinner">
                        <Spinner />
                    </Center>
                ) : data?.data.length ? (
                    <>
                        <Heading as="h1">Гаражи</Heading>
                        <SimpleGrid gap={10} columns={[1, null, 2, 3]} spacing={[4, null, 6]} py={4}>
                            {data.data.map((item: { id: number; name: string; description: string }) => (
                                <Stack key={item.id} spacing={2} _hover={{ shadow: "md" }} p={2} border="1px" borderColor="gray.200">
                                    <Heading as="h2" m={0}>
                                        {item.name}
                                    </Heading>
                                    <Text m={0}>{item.description}</Text>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            onOpen();
                                            setActiveGarage(item.id);
                                        }}
                                    >
                                        Добавить авто
                                    </Button>
                                </Stack>
                            ))}
                        </SimpleGrid>
                    </>
                ) : (
                    <Heading as="h2">Data not found!</Heading>
                )}
            </Container>

            {isOpen && <MyModal onClose={onClose} isOpen={isOpen} activeGarage={activeGarage} />}
        </>
    );
}
