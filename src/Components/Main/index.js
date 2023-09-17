import { chakra, Flex, Box } from "@chakra-ui/react";
import ChatList from "./ChatList";
import ChatBody from "./ChatBody";
import { useChatContext } from "../../Contexts/ChatDataProvider";
import { useState } from "react";

export default function Main() {
  const { chatData, setChatData } = useChatContext();
  const [selectedChatId, setSelectedChatId] = useState("");

  return (
    <chakra.div w="100%">
      <Flex w="100%">
        <Box w="20%">
          <ChatList
            chatData={chatData}
            setSelectedChatId={setSelectedChatId}
            setChatData={setChatData}
            selectedChatId={selectedChatId}
          />
        </Box>
        <Box w="80%">
          <ChatBody
            selectedChatId={selectedChatId}
            chatData={chatData}
            setChatData={setChatData}
          />
        </Box>
      </Flex>
    </chakra.div>
  );
}
