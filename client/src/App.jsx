import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [text, setText] = useState("");
  const handleEdititng = (e) => {
    const newText = e.target.value;

    socket.emit("edit", { text: newText });
  };

  useEffect(() => {
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

export default App;
