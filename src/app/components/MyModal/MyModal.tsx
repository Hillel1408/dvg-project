import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import type { MyModalProps } from "@/app/components/MyModal/MyModal.props";

export default function MyModal({ onClose, isOpen, children }: MyModalProps) {
    return (
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent maxW="1000px">
                <ModalHeader>Автомобили</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Назад
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
