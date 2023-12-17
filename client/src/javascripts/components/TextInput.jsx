import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";
import { IoMdSend } from "react-icons/io";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
      borderBottom: "none",
    },
    wrapText: {
      width: "100%",
      marginBottom: "30px",
      borderRadius: "20px",
      marginRight: "1%",
      marginLeft: "-1%",
      marginTop: "1%",
      height: "70%",
      border: "none",
    },
    button: {
      //margin: theme.spacing(1),
      width: "5%",
      height: "70%",
      marginLeft: "1%",
      marginTop: "1%",
      backgroundColor: "white",
      boxShadow: "none",
    },
  })
);

export const TextInput = (props) => {
  const [text, setText] = useState("");
  const classes = useStyles();

  const handleChange = async (event) => {
    const text = event.target.value;
    setText(text);
  };

  const handleReply = async () => {
    console.log(text);
    props.onReply(text);
    setText("");
  }

  return (
    <form className={classes.wrapForm} noValidate autoComplete="off">
      <TextField
        inputProps={{ style: { padding: 20, borderRadius: 10 } }}
        fullWidth
        placeholder="Your Input"
        label=""
        id="fullWidth"
        className={classes.wrapText}
        onChange={handleChange}
        value={text}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleReply}
      >
        <IoMdSend color="F05C42" size={27} />
      </Button>
    </form>
  );
};
