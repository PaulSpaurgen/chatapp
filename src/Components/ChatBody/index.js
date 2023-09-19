import { chakra, Box, Flex, Text, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { returnRandomString } from "../../Utils/common";
import { useChatContext } from "../../Contexts/ChatDataProvider";
import { useParams , useNavigate } from "react-router-dom";

export default function ChatBody() {
  const navigate = useNavigate()
  const { chatData, setChatData } = useChatContext();
  const [convoData, setConvoData] = useState({});
  const [inputString, setInputString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let { chatId } = useParams();
  const [selectedChatId, setChatId] = useState("");

  useEffect(() => {
    if (!!chatId) {
      console.log({ chatId });
      setChatId(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (!!selectedChatId.length) {
      const chats = chatData?.chats[`${selectedChatId}`] || null;

      if (chats === null) {
        setChatId("");
        navigate("/")
        return;
      }
      const dataToSet = {
        chatName: chats?.chatName,
        convoArr: returnConvoArr(chats?.conversation),
      };
      setConvoData(dataToSet);
    } else {
      setConvoData({});
    }
  }, [selectedChatId, chatData.chats , navigate]);

 

  //  Below function is used to clean up the data and sort it w.r.t timestamps

  const returnConvoArr = (convoObj) => {
    let convoData = {};
    Object.keys(convoObj)
      .sort(
        (convoId, nextId) =>
          convoObj[`${convoId}`].timeStamp - convoObj[`${nextId}`].timeStamp
      )
      .forEach((val) => {
        convoData = {
          ...convoData,
          [`${val}`]: convoObj[`${val}`],
        };
      });
    return convoData;
  };

  //   Below function mimcs hitting an API & adds a reply to the chat
  const addChat = (val) => {
    setIsLoading(true);
    const tempData = JSON.parse(JSON.stringify(convoData));
    const id = returnRandomString();
    const datatoSet = {
      ...tempData,
      convoArr: {
        ...tempData.convoArr,
        [`${id}`]: {
          timeStamp: moment().unix(),
          responseId: null,
          message: val,
          isResp: false,
          isError: false,
        },
      },
    };
    const msgData = datatoSet;
    setConvoData(datatoSet);

    setTimeout(() => {
      setIsLoading(false);
      const innerId = returnRandomString();
      let reply = "";
      let isError = false;

      if (val.toLowerCase() === "hi") {
        reply = "hello";
      } else if (val.toLowerCase() === "hello") {
        reply = "hi";
      } else {
        isError = true;
        reply = "Sorry couldn't find response";
      }
      const datatoSetInner = {
        ...msgData,
        convoArr: {
          ...msgData.convoArr,
          [`${innerId}`]: {
            timeStamp: moment().unix(),
            responseId: null,
            message: reply,
            isResp: true,
            isError: isError,
          },
        },
      };
      setConvoData(datatoSetInner);
      const copyOfChatData = JSON.parse(JSON.stringify(chatData));

      const overallStateManagement = {
        ...copyOfChatData,
        chats: {
          ...copyOfChatData?.chats,
          [`${selectedChatId}`]: {
            chatName: datatoSetInner.chatName,
            conversation: datatoSetInner.convoArr,
          },
        },
      };
      console.log(datatoSetInner.convoArr, {
        copyOfChatData,
        overallStateManagement,
      });
      setChatData(overallStateManagement);
    }, 2000);
  };

  return (
    <chakra.div w="100%" h="100vh" bg="white">
      {!selectedChatId.length ? (
        <Flex w="100%" h="80%" alignItems="center" justifyContent="center">
          {" "}
          <Box color="gray.500" fontSize="sm">
            Please select a chat to continue.
          </Box>
        </Flex>
      ) : (
        <Box position="relative" h="100%">
          <Box
            p="5"
            borderBottom="1px"
            fontSize="lg"
            fontWeight="bold"
            borderBottomColor="gray.300"
            boxShadow="sm"
          >
            {convoData?.chatName}
          </Box>
          <Flex w="100%" justifyContent="center">
            <Box
              maxWidth="1200px"
              minWidth="1000px"
              pr="10"
              maxH="85vh"
              overflowY="auto"
            >
              {Object.keys(convoData?.convoArr || {}).map((convoId) => (
                <Flex
                  key={convoId}
                  w="100%"
                  mt="2"
                  justifyContent={
                    convoData?.convoArr[`${convoId}`]?.isResp
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  <Text
                    padding="2"
                    borderRadius="5"
                    m="4"
                    fontWeight="medium"
                    bg={
                      convoData?.convoArr[`${convoId}`]?.isResp
                        ? convoData?.convoArr[`${convoId}`]?.isError
                          ? "red.300"
                          : "gray.900"
                        : convoData?.convoArr[`${convoId}`]?.isError
                        ? "red.300"
                        : "gray.600"
                    }
                    color="white"
                    boxShadow="sm"
                    border="1px"
                    borderColor={
                      convoData?.convoArr[`${convoId}`]?.isError
                        ? "red.400"
                        : ""
                    }
                  >
                    {convoData?.convoArr[`${convoId}`]?.message}
                    <chakra.span
                      fontSize="xs"
                      ml="4"
                      mt="2"
                      color="gray.100"
                      fontWeight="hairline"
                    >
                      {moment
                        .unix(convoData?.convoArr[`${convoId}`]?.timeStamp)
                        .format("LLLL")}
                    </chakra.span>
                  </Text>
                </Flex>
              ))}
              {isLoading && (
                <Flex w="100%" mt="2" justifyContent="flex-end">
                  <Text
                    padding="2"
                    borderRadius="5"
                    m="4"
                    fontWeight="medium"
                    bg="gray.600"
                    color="white"
                    boxShadow="sm"
                    border="1px"
                  >
                    Loading....
                  </Text>
                </Flex>
              )}
            </Box>
          </Flex>

          <Box position="absolute" bottom="0" w="100%">
            <Box m="4" mb="2" boxShadow="sm">
              <Input
                placeholder={isLoading ? "loading..." : "Send message"}
                w="100%"
                bg="gray.100"
                p="6"
                boxShadow="sm"
                value={inputString}
                onChange={(e) => {
                  setInputString(e.target.value);
                }}
                onKeyUpCapture={(e) => {
                  if (e.key === "Enter") {
                    addChat(inputString);
                    setInputString("");
                  }
                }}
                isDisabled={isLoading}
              />
            </Box>
          </Box>
        </Box>
      )}
    </chakra.div>
  );
}
