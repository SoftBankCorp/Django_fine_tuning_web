import React, { useState, useEffect } from "react";
// use state는 함수형 컴포넌트에 상태를 추가하는 데 사용됨.
//usEffect는 컴포넌트에서 사이트 이펙트를 수행하는데 사용.
import Typewriter from 'react-ts-typewriter';
//To use Typing effect
import "./App.css";

  //"React Hooks allows 
  //you to use state and side effects in functional components."

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  //usestate훅을 사용ㅎ아ㅕ massage와 currentTypingId라는 두가지 상태변수 선언
  const [currentTypingId, setCurrentTypingId] = useState(null);
  //currentTypingId )현재 ai가 작성하는 메시지 추척

 //일반적으로 usestate는 두개의 인자를 받는데, 첫번째는  초기 상태를 나타내는 인자, 
 //두개의 요소를 가진 배열을 반환함.

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
      {
        text: `Your message is: "${message}"`,
        isUser: false,
        isTyping: true,
        id: Date.now(),
      },
    ]);
  };

  const handleEndTyping = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isTyping: false } : msg
      )
      // usestate 훅이 반환하는 setMessages 함수를 호출하는 부분. 
      // setMessages 함수는 message 상태를 업데이트 하는 데 사용됨
    );
    setCurrentTypingId(null);
  };

  useEffect(() => {
    if (currentTypingId === null) {
      const nextTypingMessage = messages.find(
        (msg) => !msg.isUser && msg.isTyping
      );
      if (nextTypingMessage) {
        setCurrentTypingId(nextTypingMessage.id);
      }
    }
  }, [messages, currentTypingId]);

  return (
    <div className="app">
      <div className="chat-box">
        <MessageList
          messages={messages}
          currentTypingId={currentTypingId}
          onEndTyping={handleEndTyping}
        />
        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

const MessageList = ({ messages, currentTypingId, onEndTyping }) => (
  <div className="messages-list">
    {messages.map((message, index) => (
      <Message
        key={index}
        {...message}
        onEndTyping={onEndTyping}
        currentTypingId={currentTypingId}
      />
    ))}
  </div>
);

const Message = ({
    text,
    isUser,
    isTyping,
    id,
    onEndTyping,
    currentTypingId,
  }) => {
    useEffect(() => {
      if (!isUser && !isTyping && id === currentTypingId) {
        onEndTyping(id);
      }
    }, [isUser, isTyping, id, onEndTyping, currentTypingId]);

  return (
    <div className={isUser ? "user-message" : "ai-message"}>
      {isTyping && currentTypingId === id ? (
        <Typewriter
          text={text}
          onTypingEnd={() => onEndTyping(id)}
        />
      ) : (
        <p>
          <b>{isUser ? "User" : "AI"}</b>: {text}
        </p>
      )}
    </div>
  );
};

const MessageForm = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default ChatScreen;
