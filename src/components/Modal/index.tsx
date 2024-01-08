import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type ModalProps = {
  title: string;
  content: ReactNode;
  onOk: () => void;
  okTitle: string;
  onClose: () => void;
  isOpen: boolean;
};

const ReusableModal = ({
  title,
  content,
  onOk,
  okTitle,
  onClose,
  isOpen,
}: ModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onOk}>
              {okTitle}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReusableModal;
