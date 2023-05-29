import React from 'react';
import Messages from './Messages';
import Input from './Input';

const Chat = ({ userName }) => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{userName}</span>
      </div>
    </div>
  );
};

export default Chat;
