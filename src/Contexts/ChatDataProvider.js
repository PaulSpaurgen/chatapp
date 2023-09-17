import React, { createContext, useContext, useState } from 'react';
import data from '../Data';

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatDataProvider({ children }) {
  const [chatData, setChatData] = useState(data);

  return (
    <ChatContext.Provider value={{ chatData, setChatData }}>
      {children}
    </ChatContext.Provider>
  );
}
