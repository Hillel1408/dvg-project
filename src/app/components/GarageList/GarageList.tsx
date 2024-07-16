"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid, Heading, Container, Spinner, useDisclosure, Box } from "@chakra-ui/react";
import { MyModal, Garage, AutoList } from "@/app/components";
import { garageService } from "@/app/services";
import type { IGarage } from "@/app/types/global";

export default function GarageList() {
    const [activeGarage, setActiveGarage] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const page = 1;

    const { data, isLoading } = useQuery({
        queryKey: ["garage", page],
        queryFn: () => garageService.getAll(page),
        select: ({ data }) => data,
    });

    return (
        <>
            <Container maxW="1920px" mx="auto" minH="100vh">
                {isLoading ? (
                    <Box className="spinner">
                        <Spinner />
                    </Box>
                ) : data?.data.length ? (
                    <>
                        <Heading as="h1">Гаражи</Heading>
                        <SimpleGrid gap={10} columns={[1, null, 2, 3]} spacing={[4, null, 6]} py={4}>
                            {data.data.map((item: IGarage) => (
                                <Garage
                                    key={item.id}
                                    item={item}
                                    addCar={() => {
                                        onOpen();
                                        setActiveGarage(item.id);
                                    }}
                                />
                            ))}
                        </SimpleGrid>
                    </>
                ) : (
                    <Heading as="h2">Data not found!</Heading>
                )}
            </Container>

            {isOpen && (
                <MyModal onClose={onClose} isOpen={isOpen}>
                    <AutoList activeGarage={activeGarage} />
                </MyModal>
            )}
        </>
    );
}
