import React from "react";
import { createStyles, makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: "flex",
      marginBottom: "17px", 
      marginLeft: "10px",
      marginTop: "10px"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "17px",
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "20px",
      backgroundColor: "#FFE2C0",
      width: "90%",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #FFE2C0",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #FFE2C0",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #FFE2C0",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px"
      }
    },
    messageOrange: {
      position: "relative",
      marginRight: "10px",
      marginBottom: "10px",
      padding: "20px",
      backgroundColor: "#FFE2C0",
      width: "60%",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #FFE2C0",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #FFE2C0",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #FFE2C0",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px"
      }
    },

    messageContent: {
      padding: 0,
      marginRight: 20,
      fontFamily: "OurFont-medium",
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "10px",
      bottom: "-3px",
      right: "5px"
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: "20px",
      fontFamily: "OurFont-medium",
      fontWeight: 600,
      color: "#2892D7",
      fontSize: "0.9em",
      marginBottom: "10px"
    }
  })
);

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
//   const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "";
  const displayName = props.displayName ? props.displayName : "Bot";
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message}</p>
      </div>
    </div>
  );
};
