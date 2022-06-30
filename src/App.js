import "./App.css";
import { BsPause, BsPlay } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { TextToSpeech } from "./textToSpeech";

const tts = new TextToSpeech();

function App() {
  // ux
  const textRef = useRef(null);

  // logic
  const [play, setPlay] = useState(false);
  const [text, setText] = useState("");
  const [lastUsed, setLastUsed] = useState([]);

  useEffect(() => {
    setLastUsed(JSON.parse(localStorage.getItem("lastUsed")) || []);
  }, []);

  const handlePlay = () => {
    tts.end(setPlay);
    // pause
    if (speechSynthesis.speaking) {
      tts.pause();
      setPlay(false);
    }
    if (speechSynthesis.paused) {
      tts.continue();
      setPlay(true);
    }

    // play
    if (text) {
      setPlay(true);

      tts.speak(text);
      setLastUsed([...lastUsed, text]);
      localStorage.setItem("lastUsed", JSON.stringify([...lastUsed, text]));
      textRef.current.focus();
      setText("");
    }
  };

  return (
    <div className="App">
      <h1>TEXT TO SPEECH</h1>

      <textarea
        style={{ resize: "none" }}
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
      {lastUsed.length !== 0 && <h3>RECENTLY</h3>}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {lastUsed.map((value, index) => {
          return (
            <li
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => setText(value)}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
