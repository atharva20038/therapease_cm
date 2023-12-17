import React, { useState } from "react";
import Test from "./components/Test.jsx";
import "../css/index.css";
import Typography from "@mui/material/Typography";
import ChatBox from "./components/Chatbox.jsx";
import "../css/font.css";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DoctorList } from "./components/DoctorList.jsx";
// import FloatingObjects from './FloatingObjects';

const App = () => {
  const [isList, setisList] = useState(false);
  const [reply, setReply] = useState("");
  const [doc, setDoc] = useState([]);
  const [messageList, setMessageList] = useState([{ role: "system", content: "You are a mental health assistant. Your job is to provide comfort to all the people who interact with you and give possible quick solutions for easing down the problem they are facing." }]);

  const getDoctors = async () => {
    console.log(messageList);

    try {
      const response = await fetch("/getDoctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageList })
      });

      if (response.ok) {
        const data = await response.json();
        setDoc(data.doc);
        setisList(true);
        console.log(data);
      } else {
        console.error("Error uploading text to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const handleSubmit = async (messageList) => {
    console.log(messageList);

    try {
      const response = await fetch("/chatResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageList }),
      });

      if (response.ok) {
        const data = await response.json();
        setReply(data.reply);
        setMessageList(messageList => [...messageList, { role: "assistant", content: data.reply }]);

        console.log(data);
      } else {
        console.error("Error uploading text to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleMessageSubmission = (text) => {
    const updatedList = [...messageList, { role: "user", content: text }]
    setMessageList(updatedList);
    handleSubmit(updatedList);
  }

  return (
    <div>
      <div className="img">
        {/* <About /> */}
        <Test />
        <div style={{ marginTop: "-10%", marginLeft: "6%" }}>
          <Typography
            fontWeight={800}
            sx={{
              fontSize: "400%",
              fontFamily: "OurFont-bold",
              marginTop: "20%",
              color: "#909090",
            }}
          >
            Feeling
          </Typography>
          <Typography
            fontWeight={800}
            marginTop={-8}
            sx={{
              fontSize: "700%",
              fontFamily: "OurFont-bold",
              color: "#F05C42",
            }}
          >
            stressed?
          </Typography>
          <Typography
            fontWeight={200}
            marginTop={-3}
            sx={{
              fontSize: "200%",
              fontFamily: "OurFont-medium",
              color: "#909090",
            }}
          >
            Dont worry, we are here for you
          </Typography>
        </div>
        <ChatBox messagesList={messageList.slice(1)} onReply={handleMessageSubmission} />
        <div className="get-started-button">
          <Button
            style={{
              backgroundColor: "#F05C42",
              borderRadius: 15,
              marginBottom: 100,
            }}
            onClick={getDoctors}
          >
            <Typography
              variant="h6"
              sx={{ textTransform: "none" }}
              color={"white"}
              paddingTop={0.6}
              paddingLeft={2}
              paddingRight={1}
              fontFamily={"OurFont-medium"}
              fontSize={20}
            >
              Get suggestions
            </Typography>
            <ArrowForwardIcon sx={{ color: "white", marginRight: 1 }} />
          </Button>
        </div>

        {isList ? (
          <div>
            <div class="therapist_list">
              <Typography fontWeight={600} fontFamily={"OurFont-medium"}>
                Therapists for you
              </Typography>
            </div>
            <div className="therapist_list">
              <DoctorList doctors={doc} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
