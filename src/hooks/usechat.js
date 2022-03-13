import { useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { ConferenceContext } from "src/context/ConferenceContext";


export const useChat = () => {

    const { name,roomName,setMessages,chatMessage } = useContext(ConferenceContext);
    const socket = useRef();
    useEffect(()=> {
        const ENDPOINT = 'https://chat-backend-virtual-meet.herokuapp.com/';
        if(roomName){
            socket.current = io(ENDPOINT);
            console.log(name)
            console.log("Check Chat",roomName)
            
              console.log("Check Chat",roomName)
              socket.current.emit('join', { name, room: roomName },(error)=>{
                if(error){
                    alert(error);
                }
            });
            
            socket.current.on('message', message => {
              console.log(message)
              setMessages(messages => [ ...messages, message ]);
            });
            
        }
       
    },[name,roomName,setMessages]);
    useEffect(()=> {
        if (chatMessage) {
            socket.current.emit('sendMessage', chatMessage);
          }
    },[chatMessage]);
}