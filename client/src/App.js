import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('localhost:5000/');
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', (data) => {
      setIsConnected(true);
      console.log(data);
    });

    socket.on('disconnect', (data) => {
      setIsConnected(false);

      console.log(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('message');
  };

  useEffect(() => {
    socket.on('message', (data) => {
      setMessage(data);
    });
    return () => {
      socket.off('message', () => {
        console.log('data event was removed');
      });
    };
  }, [socket, message]);

  return (
    <div className="content">
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {message || '-'}</p>
      <button onClick={sendPing}>MESSAGE SEND</button>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
