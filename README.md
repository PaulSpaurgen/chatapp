# Click on the link below to see a preview.

    https://melodious-malabi-4e36b8.netlify.app
             
or Clone this repo and navigate to folder conataining pacakage.JSON   and run

### `npm i`

After all the dependencies are installed run the following command to start the project 

### `npm start`

You can find three branches in this repository.
I have created two solutions for the problem statement. 

On master branch "solution 2" is merged.

Solutions:

1. https://github.com/PaulSpaurgen/chatapp/tree/solution/using-routing-and-state
2. https://github.com/PaulSpaurgen/chatapp/tree/solution/using-state-management

Solution descriptions:

1. In the first solution, I have used react-router to navigate in the websites from chats listing to the selected chat body. you can see this happening by watching the change in the URL while selecting chats from the listing.  
2. In the second solution, I have used parent-child relation between three components. One parent and two children. A common state for the selected chatId is shared across these 3 components to show  the selected chat body and other UI conditional rendors.

In common to the both the solutions I have used contextApi (works similar to redux) to manage entire state of the application.

Note:

1. In the chat type "hi" to get a response of "Hello" and vise versa.
2. anything you write other than "hi" / "hello" an error message would come in the response.
3. Intially I have added two chats in the application. You can "DELETE", "UPDATE" , "ADD" a chat to the list.
4. Open index.js to understad the flow of the application.
   




