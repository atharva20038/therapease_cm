import React, { useState } from "react";
import { SectionWrapper } from "../../hoc";

const About = () => {
  const [textInput, setTextInput] = useState("");
  const [reply, setReply] = useState("");
  const [doc, setDoc] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setReply(data.reply);
        setDoc(data.doc);
      } else {
        console.error("Error uploading text to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <p>Reply: {reply}</p>
        List of docs -
        <ul>
          {doc.map((item, index) => (
            <li key={index}>
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>
              <p> ________ </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
