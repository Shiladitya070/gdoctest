import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function DocumentEdit() {
  const params = useParams();
  const roomId = params.roomId;

  const [text, setText] = useState("");
  const handleEdititng = (e) => {
    const newText = e.target.value;

    socket.emit("edit", { text: newText, roomId });
  };

  useEffect(() => {
    socket.emit("join", roomId);

    socket.on("editcomes", (data) => {
      console.log("💃💃", data.text);
      setText(data.text);
    });
  }, []);

  return (
    <>
      <h1>Colaborate edit</h1>
      <textarea
        name="text"
        id=""
        onChange={handleEdititng}
        cols="30"
        rows="10"
        value={text}
      />
    </>
  );
}

export default DocumentEdit;
