'use client'
import AuthContext from '@/contextAPI/authContext';
import api from '@/util/api';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { initSocket } from '@/util/socket';
import ChatMessage from '../messages/chatMessage/chatMessage';
import { toast } from 'react-toastify';

const Card = ({player, isChatOpen, handleChat,toastError,toastSuccess}) => {

const {userId}=useContext(AuthContext)
  const router = useRouter();
  const [socket,setSocket]=useState('');
  const [friendStatus, setFriendStatus] = useState(false);
  useEffect(()=>{
    const socketInstance=initSocket();
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
   };
  },[]);

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const response = await api.get(`/api/players/checkFriendStatus/${player.id}`);
        if (response.data.status=='ACCEPTED') {
          setFriendStatus('friend');
        } else if (response.data.status=='PENDING') {
          setFriendStatus('sent');
        } else{
          setFriendStatus(false)
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du statut d\'amitié:', error);
      }
    };

    checkFriendStatus();
  }, [player.id]);

  const handleSeeMore = () => {
    router.push(`/players/${player.id}`); 
  };

  const sendFriendRequest = (userId,friendId,senderUser) => {
    socket.emit('send_friend_request', {
      fromUserId: userId,
      toUserId: friendId,
      dataUser: senderUser  // Données de l'utilisateur qui a envoyé la demande
    });
};

  const handleAddFriend = async () => {
    try {
    const response=  await api.post('/api/players/addFriend', {
        user2Id: player.id,
      });
      if(response.data){
        toastSuccess();
        sendFriendRequest(userId,String(player.id),response.data.senderUser);
        setFriendStatus('sent');
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande d\'ami:', error);
      if(error.response.data.status==429){
        toast.error(`${error.response.data.problem}`)
      }else{
        toastError();
      }
        }
  };



  return (
    <>

    <div  onClick={handleSeeMore}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer ">

  <div  className="flex flex-col items-center pt-8 pb-8">
    <img
   
      className="w-24 h-24 mb-3 rounded-full shadow-lg border"
      src={player.picture}
      alt="Bonnie image"
    />
    <h5 className="mb-1 text-xl font-medium text-black dark:text-white">
      {player.fullName}
    </h5>
    <span className="text-sm text-gray-800 dark:text-gray-400">
      {player.sport.title}
    </span>
    <div className="flex mt-4 md:mt-6">
      <button
        onClick={(e)=>{
          e.stopPropagation();
          handleAddFriend();
        }}
        disabled={friendStatus?true:false}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
      >
        {!friendStatus?'Add friend':friendStatus=='sent'?'Request sent':'friend'}
      </button>
      <button
        onClick={(e)=>{
          e.stopPropagation();
          handleChat();
        }
       }
        className="py-2 px-4 ms-2 text-sm font-medium bg-gray-300 hover:bg-gray-400 text-black focus:outline-none  rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Message
      </button>
    </div>
  </div>
  
</div>
      {isChatOpen && <ChatMessage player={player} handleChat={handleChat} />}
</>
  )
}

export default Card