import './App.css';
import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid'

const socket = io.connect("http://localhost:5000")
const userName = nanoid(4);  

function App() {

const [message, setMessage] = useState("");
const [chat, setChat] = useState([]);

const sendChat = (e) => {
  e.preventDefault()
  socket.emit("chatting", {message, userName})
  setMessage('')
} 

useEffect(()=>{
  socket.on("chatting", (payload)=>{
    setChat([...chat, payload])
  })
})


  return (
    <div className="App">
      <header className="App-header">
      <h1>Chatting App</h1>
    {chat.map((payload, index) => {
      return <p key={index}>{payload.message} id : <span>{payload.userName}</span></p>
    })}  
      <form onSubmit={sendChat}>
        <input type="text" name="chat" 
        placeholder = "send messages"
        value = {message}
        onChange={(e)=>{
          setMessage(e.target.value)
        }}
        />
        <button type="submit">Send</button>
      </form>
      </header>
    </div>
  );
}

export default App;
