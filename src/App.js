import "./App.css";
import { BsPause, BsPlay } from "react-icons/bs";
import { useRef, useState } from "react";
import { TextToSpeech } from "./textToSpeech";

const tts = new TextToSpeech();

function App() {
  // ux
  const textRef = useRef(null);

  // logic
  const [play, setPlay] = useState(false);
  const [text, setText] = useState("");
  const [lastUsed, setLastUsed] = useState([]);

  const handlePlay = () => {
    tts.end(setPlay);
    if (text) {
      setPlay(true);

      tts.speak(text);
      setLastUsed([...lastUsed, text]);
      setText("");
      textRef.current.focus();
    }
  };

  return (
    <div className="App">
      <h1>TEXT TO SPEECH</h1>

      <textarea
        id=""
        cols="30"
        rows="10"
        name="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setPlay(false);
        }}
        ref={textRef}
      ></textarea>
      <div>
        <div
          onClick={() => handlePlay()}
          style={{ fontSize: "3rem", cursor: "pointer" }}
        >
          {play ? <BsPause /> : <BsPlay />}
        </div>
      </div>
      <ul>
        {lastUsed.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
