import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lobby from './components/Lobby';
import {HubConnectionBuilder , LogLevel} from "@microsoft/signalr"
import React from 'react'
import Chat from './components/Chat';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import { Card } from 'react-bootstrap';


const App = () =>{

  const [connection,setConnection] = React.useState();
  const [messages,setMessages] = React.useState([]);
  const [users,setUsers] = React.useState([]);


  const joinRoom = async (user,room) => {
    try{
      const connection = 
      new HubConnectionBuilder()
      .withUrl("https://localhost:7110/chat")
      .configureLogging(LogLevel.Information)
      .build();


      connection.on("UsersInRoom",(users) => {
        setUsers(users);
        
      });


      connection.on("ReceiveMessage",(user,message) => {
          setMessages(messages => [...messages,{user,message}]);
      });


      connection.onclose(e =>{
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom",{user,room});

      setConnection(connection);

    }catch(e){
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try{
      await connection.invoke("sendMessage",message);
    }catch(e){
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try{
      await connection.stop();
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div className='app'>
      <h2>MyChat</h2>
      <hr />
      {
        !connection
        ? <Lobby joinRoom={joinRoom} />
        : <Chat 
            messages={messages} 
            sendMessage={sendMessage} 
            closeConnection={closeConnection}
            users={users}
          />
      }
      
    </div>
  );
}

export default App;
