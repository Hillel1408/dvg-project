import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    SimpleGrid,
    Container,
    Stack,
    Heading,
    Box,
    Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { autoService } from "@/app/services";
import useScrollHandler from "@/app/hooks/useScrollHandler";
import { useEffect, useRef, useState } from "react";

export default function MyModal({ onClose, isOpen, activeGarage }: { onClose: any; isOpen: boolean; activeGarage: number }) {
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["auto", page],
        queryFn: () => autoService.getAll(page),
        select: ({ data }) => data,
    });

    const mutation = useMutation({
        mutationFn: (arg: { garage: number | null }) => {
            return autoService.changeGarage(arg);
        },
        onSuccess: async (data) => {
            refetch();
        },
    });

    const observerTarget = useRef(null);

    useScrollHandler(observerTarget, () => setPage((prev) => prev + 1));

    return (
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent maxW="1000px">
                <ModalHeader>Автомобили</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container maxW="1920px" mx="auto">
                        {isLoading ? (
                            <Box className="spinner">
                                <Spinner />
                            </Box>
                        ) : data?.data.length ? (
                            <SimpleGrid gap={10} columns={[1, 2, 3, 4]} spacing={[4, null, 6]} py={4}>
                                {data.data.map((item: { id: number; name: string; description: string; garage: number }) => (
                                    <Stack key={item.id} spacing={2} _hover={{ shadow: "md" }} p={2} border="1px" borderColor="gray.200">
                                        <Heading as="h2" m={0}>
                                            {item.name}
                                        </Heading>
                                        <Text m={0}>{item.description}</Text>
                                        {item.garage === activeGarage ? (
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    mutation.mutate({
                                                        ...item,
                                                        garage: null,
                                                    });
                                                }}
                                            >
                                                Удалить из гаража
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    mutation.mutate({
                                                        ...item,
                                                        garage: activeGarage,
                                                    });
                                                }}
                                            >
                                                Добавить в гараж
                                            </Button>
                                        )}
                                    </Stack>
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Heading as="h2">Data not found!</Heading>
                        )}
                        <Box ref={observerTarget}></Box>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Назад
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
