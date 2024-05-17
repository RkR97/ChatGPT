
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


function App() {

  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/chat", { prompt: prompt, level: level }).then((res) => {
      console.log(res.data.data.content)
      setResponse(res.data.data.content)
    }).catch((err) => {
      console.log(err)
      setResponse(err.response.data.error)
    })
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <label>Ask the AI:</label><br />
        <input onChange={(e) => setPrompt(e.target.value)} value={prompt}></input>
        <br />
        <select value={level} onChange={(e) => { setLevel(e.target.value) }}>
          <option value="">-select-</option>
          <option value="Simple">Simple</option>
          <option value="Medium">Medium</option>
          <option value="Complex">Complex</option>
        </select>
        <br />
        <button>Generate Test Plan</button>
      </form>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className='response' style={{ width: "50%", textAlign: "left" }}>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>

    </div>
  );
}

export default App;
