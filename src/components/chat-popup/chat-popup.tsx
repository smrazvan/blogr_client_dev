import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../features/hooks";
import { closeChat, openChat } from "../../slices/chat-slice";
import CancelIcon from "@mui/icons-material/Cancel";
import { store } from "../../store";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useRef, useEffect } from "react";
export const ChatPopup = () => {
  const chatData = useAppSelector((state) => state.chat);
  const userName = chatData.sendTo;

  const userData = useAppSelector((store) => store.user);
  const token = userData.token;
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chat, setChat] = useState<string[]>([]);
  const latestChat = useRef<string[] | null>(null);

  const [inputValue, setInputValue] = useState("");
  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5080/hub", {
        accessTokenFactory: () => token!,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("messageReceived", (username, message) => {
            console.log(`${username} says ${message}`);
            if (!chatData.isOpened) {
              store.dispatch(openChat(username));
            }
            addMessage(username, message);
            //add to messages so it can render
          });
        })
        .catch((err) => console.log("Err " + err));
    }
  }, [connection]);

  const addMessage = (username: string, message: string) => {
    if (latestChat.current != null) {
      const newChat = [...latestChat.current];
      newChat.push(`${username} says ${message}`);
      setChat(newChat);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const sendMessage = async () => {
    if (connection) {
      // console.log("preparing to send");
      const message = inputValue;
      connection
        .invoke("SendMessageToUser", userName, message)
        .then(() => addMessage(userData.user?.userName!, message));
      // .then(() => console.log("sent successfully"));
    }
  };
  const handleClose = () => {
    store.dispatch(closeChat());
  };
  if (!chatData) return <></>;
  return (
    <Box
      sx={{
        zIndex: 2000,
        position: "fixed",
        display: chatData.isOpened ? "block" : "none",
        padding: "4px 16px",
        bottom: 0,
        right: 0,
        backgroundColor: "white",
        width: "300px",
        height: "350px",
        boxShadow: "-1px 1px 12px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography>{userName}</Typography>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClose}
              color="inherit"
            >
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, overflowX: "scroll" }}>
          {chat.map((message) => {
            return <p>{message}</p>;
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignSelf: "flex-end",
          }}
        >
          <TextField
            label="Message"
            id="standard-size-normal"
            variant="standard"
            onChange={handleInputChange}
            value={inputValue}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
