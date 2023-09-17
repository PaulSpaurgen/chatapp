import {
  chakra,
  Box,
  Text,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { returnRandomString } from "../../../Utils/common";

import {
  AiFillMessage,
  AiFillDelete,
  AiOutlinePlusSquare,
} from "react-icons/ai";

export default function ChatList({
  chatData,
  setSelectedChatId,
  setChatData,
  selectedChatId,
}) {
  const chats = chatData?.chats || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState({
    value: "",
    isError: false,
  });

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  //

  const deleteChat = () => {
    let copyofdata = JSON.parse(JSON.stringify(chatData));
    delete copyofdata.chats[`${selectedChatId}`];
    console.log({ copyofdata });
    setChatData(copyofdata);
    setSelectedChatId("");
    onClose();
  };

  const addChat = () => {
    if (!chatName.value.length) {
      setChatName({
        value: "",
        isError: true,
      });
      return;
    }
    let copyofdata = JSON.parse(JSON.stringify(chatData));
    const chatId = returnRandomString()
    let newChat = {
      ...copyofdata,
      chats:{
        ...copyofdata.chats,
        [`${chatId}`]:{
          chatName: chatName.value,
          conversation:{}
        }
      }
    }
    setChatData(newChat)
    setSelectedChatId(chatId)
    setChatName({
      value: "",
      isError: false,
    });
    onCloseAdd()
    
  };

  return (
    <chakra.div w="100%" bg="#7D7C7C" h="100vh" position="relative">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px" borderBottomColor="gray.300">
            Delete chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="10">
            <Text
              textAlign="center"
              fontSize="sm"
              color="gray.600"
              fontWeight="bold"
            >
              Are you sure you want to delete "
              {chatData?.chats[`${selectedChatId}`]?.chatName}" ?
            </Text>
            <Text mt="2" fontSize="xs" color="gray.300">
              Once you delete you will loose all the conversation took place in
              this chat.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              colorScheme="blackAlpha"
              mr={3}
              onClick={deleteChat}
              size="sm"
            >
              Confirm
            </Button>
            <Button onClick={onClose} size="sm">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenAdd} onClose={onCloseAdd} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px" borderBottomColor="gray.300">
            Add chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="5">
            <Text fontSize="sm" mb="2">Chat Name</Text>
            <Input
              value={chatName.value}
              onChange={(e) => {
                setChatName({
                  value: e.target.value,
                  isError: false,
                });
              }}
            />
            {chatName.isError && (
              <Text fontSize="xs" color="red.300" mt="2">
                {" "}
                Please enter a valid name
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              colorScheme="blackAlpha"
              mr={3}
              onClick={addChat}
              size="sm"
            >
              Confirm
            </Button>
            <Button onClick={onCloseAdd} size="sm">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        w="100%"
        textAlign="center"
        p="5"
        bg="#191717"
        borderBottom="1px"
        borderBottomColor="green.900"
        boxShadow="sm"
      >
        <Text color="white" fontWeight="bold" letterSpacing="1px" fontSize="lg">
          Welcome {chatData?.userName || "User"}
        </Text>
      </Box>

      {!Object.keys(chats).length ? (
        <Flex w="100%" h="60vh" justifyContent="center" alignItems="center">
          <Box
            p="5"
            m="2"
            borderRadius="5"
            color="white"
            boxShadow="md"
            fontSize="sm"
          >
            <Text w="80%">
              No Chats found, Please click on add new chat below to continue
            </Text>
          </Box>
        </Flex>
      ) : (
        <Box maxH="85vh" overflowY="auto">
          {Object.keys(chats).map((chatId) => (
            <Flex
              key={chatId}
              p="3"
              fontSize="md"
              color="white"
              m="2"
              borderRadius="5"
              fontWeight="bold"
              bg={selectedChatId === chatId ? "#191717" : ""}
              boxShadow="md"
              _hover={{
                backgroundColor: "#191717",
                cursor: "pointer",
              }}
              alignItems="center"
              onClick={() => {
                setSelectedChatId(chatId);
              }}
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                {" "}
                <Icon as={AiFillMessage} color="white" mr="2" />{" "}
                <chakra.span>{chats[chatId].chatName}</chakra.span>{" "}
              </Flex>
              <IconButton
                colorScheme="red"
                aria-label="delte Segun"
                icon={<AiFillDelete />}
                size="xs"
                onClick={() => {
                  onOpen();
                }}
              />
            </Flex>
          ))}
        </Box>
      )}

      <Box position="absolute" bottom="0" w="100%" zIndex={10}>
        <Flex
          p="4"
          fontSize="lg"
          color="white"
          bg="#191717"
          textAlign="center"
          _hover={{
            backgroundColor: "black",
            cursor: "pointer",
          }}
          alignItems="center"
          justifyContent="center"
          onClick={() => {
            onOpenAdd();
          }}
        >
          <Icon as={AiOutlinePlusSquare} color="white" mr="2" />
          <chakra.span>New Chat </chakra.span>
        </Flex>
      </Box>
    </chakra.div>
  );
}
