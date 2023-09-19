import { chakra } from "@chakra-ui/react";
import { Suspense } from "react";
import { ChatDataProvider } from "./Contexts/ChatDataProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatList from "./Components/ChatList";
import ChatBody from "./Components/ChatBody";

// I have declared all the routes here


function App() {
  return (
    <chakra.div>
      <Suspense>
        <BrowserRouter>
          <ChatDataProvider>
            <Routes>
              <Route path="/" element={<ChatList />}>
                <Route index element={<ChatBody />} />
                <Route path=":chatId" element={<ChatBody />} />
              </Route>
            </Routes>
          </ChatDataProvider>
        </BrowserRouter>
      </Suspense>
    </chakra.div>
  );
}

export default App;
