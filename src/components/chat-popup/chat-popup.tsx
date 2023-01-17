import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "../../features/hooks";
import { closeChat, openChat } from "../../slices/chat-slice";
import CancelIcon from "@mui/icons-material/Cancel";
import { store } from "../../store";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useRef, useEffect } from "react";
import { Message } from "../message/message";
import { errorHandler } from "../../helpers/error-handler";
import { useGetMessagesHistoryQuery } from "../../features/api/bloggrApiSlice";
import { TMessage } from "../../types/models/TMessage";
export const ChatPopup = () => {
  const chatData = useAppSelector((state) => state.chat);
  const userName = chatData.sendTo;

  const userData = useAppSelector((store) => store.user);
  const token = userData.token;
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chat, setChat] = useState<Message[]>([]);
  const latestChat = useRef<Message[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatDataRef = useRef<any | null>(null);

  const [inputValue, setInputValue] = useState("");
  latestChat.current = chat;
  chatDataRef.current = chatData;
  const [cursor, setCursor] = useState<number | null>(null);
  const [skip, setSkip] = useState<boolean>(true);
  const [history, setHistory] = useState<TMessage[]>([]);
  //CHAT HISTORY
  const { data, error, isLoading, isUninitialized } =
    useGetMessagesHistoryQuery(
      { username: userName!, cursor: cursor },
      { skip: skip }
    );

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
    if (chatData.isOpened) {
      setSkip(false);
    }
  }, [chatData]);

  useEffect(() => {
    if (history.length <= 10) scrollToBottom();
  }, [history]);

  useEffect(() => {
    setHistory((prevState) => {
      if (data) return [...data.result, ...prevState];
      return prevState;
    });
    //scrollToBottom();
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("messageReceived", (username, message) => {
            console.log(`${username} says ${message}`);
            if (
              chatDataRef.current.sendTo &&
              chatDataRef.current.sendTo != username
            ) {
              setChat([]);
              setHistory([]);
              //store.dispatch(closeChat());
              store.dispatch(openChat(username));
            }
            if (!chatDataRef.current.isOpened) {
              console.log("set history");
              store.dispatch(openChat(username));
              setSkip(false);
            } else addMessage(username, message);
            //add to messages so it can render
          });
        })
        .catch((err) => errorHandler(err));
    }
  }, [connection]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const addMessage = (userName: string, message: string) => {
    if (latestChat.current != null) {
      const newChat = [...latestChat.current];
      if (userName && message) newChat.push({ userName, message });
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
        .then(() => {
          setInputValue("");
          addMessage(userData.user?.userName!, message);
        })
        .catch((err) => errorHandler(err));
      // .then(() => console.log("sent successfully"));
    }
  };

  const loadMoreHistory = () => {
    setCursor(data?.nextCursor!);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleClose = () => {
    setSkip(true);
    store.dispatch(closeChat());
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  if (!chatData) return <></>;
  return (
    <Box
      sx={{
        zIndex: 2000,
        position: "fixed",
        display: chatData.isOpened ? "block" : "none",
        pb: "4px",
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
            backgroundColor: "#1976d2",
            color: "white",
            padding: "0 4px",
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
        <Box
          sx={{
            flexGrow: 1,
            overflowX: "auto",
            overflowAnchor: "none",
          }}
        >
          {history.length > 0 ? (
            <div>
              {data?.nextCursor != null ? (
                <Button onClick={loadMoreHistory} variant="outlined">
                  Load more
                </Button>
              ) : (
                <></>
              )}
              {history.map((message) => {
                return (
                  <Message
                    userName={message.sender.userName}
                    message={message.content}
                  />
                );
              })}
            </div>
          ) : (
            <></>
          )}
          {chat.map(({ userName, message }) => {
            return <Message userName={userName} message={message} />;
          })}
          <Box ref={messagesEndRef}></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            alignSelf: "flex-end",
            width: "100%",
          }}
        >
          <TextField
            label="Message"
            id="standard-size-normal"
            variant="standard"
            size="small"
            onChange={handleInputChange}
            value={inputValue}
            onKeyUp={(e) => handleKeyPress(e)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};