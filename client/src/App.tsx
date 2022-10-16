import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import io from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';
import { checkHasNotGabarit } from './utils/check-has-not-gabarit';
import React from 'react';

const socket = io('localhost:5000/');

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [isHasNotGabarit, setIsHasNotGabarit] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);



  useEffect(() => {
    socket.on('message', (data: any) => {
      setMessage(data);

      setIsHasNotGabarit(checkHasNotGabarit(data));
    });
    return () => {
      socket.off('message', () => {
        console.log('data event was removed');
      });
    };
  }, [socket, message]);

  const sendPing = useCallback(() => {
    socket.emit('message');
  }, []);

  return (
    <div className="content">
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {message || '-'}</p>
      <button onClick={sendPing}>MESSAGE SEND</button>
      {isHasNotGabarit && (
        <div className="alert alert-danger" role="alert">
          Есть не габарит!
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
