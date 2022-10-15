import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io("localhost:5000/", {
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:3000/",
  },
});
function App() {
  const [socketInstance, setSocketInstance] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState("");
  //socket.emit("data", message);

  useEffect(() => {
    setSocketInstance(socket);

    socket.on("connect", (data) => {
      console.log(data);
    });

    socket.on("disconnect", (data) => {
      console.log(data);
    });

    return function cleanup() {
      socket.disconnect();
    };

    // socket.on('connect', () => {
    //   setIsConnected(true);
    // });

    // socket.on('disconnect', () => {
    //   setIsConnected(false);
    // });

    // socket.on('message', (data) => {
    //   setLastPong(data);
    // });

    // return () => {
    //   socket.off('connect');
    //   socket.off('disconnect');
    //   socket.off('pong');
    // };
  }, []);
  
  useEffect(() => {
    socket.on("data", (data) => {
      setMessage(data.data);
    });
    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, [socket, message]);


  return (
    <div className="content">
      {/* <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p> */}
      {/* <button onClick={sendPing}>Send ping</button> */}
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {message || '-'}</p>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
