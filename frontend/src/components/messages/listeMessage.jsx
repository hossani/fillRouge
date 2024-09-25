import React from 'react'
import Cardmessage from './cards'

const ListeMessages = ({ onChat,conversations  }) => {

  return (
    <div className="flex flex-col gap-3">
   {conversations.map(conversation => (
        <Cardmessage
          key={conversation.id} // Unique key based on user ID
          content={conversation.content}
          fullName={conversation.fullName}
          picture={conversation.picture}
          onClick={() => onChat(conversation)} // Gérer le clic pour ouvrir le chat
        />
      ))}

</div>

  )
}

export default ListeMessages