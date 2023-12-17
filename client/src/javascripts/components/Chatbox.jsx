import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.jsx";
import { MessageLeft, MessageRight } from "./Message";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "90vw",
      height: "70vh",
      maxWidth: "2000px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      marginTop: "-6%",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "-15%",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
      padding: 10,
    },
  })
);

export default function ChatBox(props) {
  const classes = useStyles();
  const { messagesList = [] } = props;
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {messagesList.map((message, index) => {
            if (message.role === "user") {
              return (
                <MessageRight
                  key={index}
                  message={message.content}
                />
              );
            } else {
              return (
                <MessageLeft
                  key={index}
                  message={message.content}
                />
              );
            }
          })}
        </Paper>
        <TextInput onReply={props.onReply}/>
      </Paper>
    </div>
  );
}
