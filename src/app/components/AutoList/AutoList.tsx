import { useState } from "react";
import { SimpleGrid, Container, Heading, Box, Spinner } from "@chakra-ui/react";
import { Pagination, Auto } from "@/app/components";
import { useQuery, useMutation } from "@tanstack/react-query";
import { autoService } from "@/app/services";
import type { IAuto } from "@/app/types/global";
import type { AutoListProps } from "@/app/components/AutoList/AutoList.props";

export default function AutoList({ activeGarage }: AutoListProps) {
    const [page, setPage] = useState(0);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["auto", page],
        queryFn: () => autoService.getAll(page + 1),
        select: ({ data }) => data,
    });

    const mutation = useMutation({
        mutationFn: (arg: { garage: number | null; id: number }) => {
            return autoService.changeGarage(arg);
        },
        onSuccess: async () => {
            await refetch();
        },
        onError: (data) => {
            alert(data.message);
        },
    });

    return (
        <Container maxW="1920px" mx="auto">
            {isLoading ? (
                <Box className="spinner">
                    <Spinner />
                </Box>
            ) : data?.data.length ? (
                <SimpleGrid gap={10} columns={[1, 2, 3, 4]} spacing={[4, null, 6]} pt={4} pb={10}>
                    {data.data.map((item: IAuto) => (
                        <Auto
                            key={item.id}
                            item={item}
                            activeGarage={activeGarage}
                            deleteAuto={() => {
                                mutation.mutate({
                                    garage: null,
                                    id: item.id,
                                });
                            }}
                            addAuto={() => {
                                mutation.mutate({
                                    garage: activeGarage,
                                    id: item.id,
                                });
                            }}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Heading as="h2">Data not found!</Heading>
            )}
            <Pagination page={page} setPage={setPage} pageQty={data?.page_count} />
        </Container>
    );
}
