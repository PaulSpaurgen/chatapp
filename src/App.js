import {chakra} from "@chakra-ui/react"
import { Suspense } from "react";
import { ChatDataProvider } from "./Contexts/ChatDataProvider";
import Main from "./Components/Main";

function App() {
  return (
   <chakra.div>
      <Suspense>
        <ChatDataProvider>
          <Main/>
          
        </ChatDataProvider>

      </Suspense>
   </chakra.div>
  );
}

export default App;
