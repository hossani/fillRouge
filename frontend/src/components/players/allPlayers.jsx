import React, { useEffect, useState } from 'react'
import Card from './cards'
import Skeleton from '../events/sekeletton';
import api from '@/util/api';
import Pagination from '../general/pagination/pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPlayers = ({ locationId, sportId, date }) => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  // pagination system 
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [playersPerPage] = useState(4); // Nombre de joueurs par page

  useEffect(() => {
    
    const fetchPlayers = async () => {
      setIsLoading(true);  
      setError(null);  

      try {
        const response = await api.get(`/api/profile/filteredPlayers?locationId=${locationId}&sportId=${sportId}&date=${date}`);
        setPlayers(response.data.listePlayers);
        // Mémoriser la page actuelle si nous revenons aux filtres initiaux
        if (locationId === "allCities" && sportId === "allSports" && ( date === "recent"||'old') ) {
            setCurrentPage(Number(localStorage.getItem('currentPageDefault_players')) ||1);        
        } else {
          if(localStorage.getItem('dataOfFilter_players')){
          const filterData=JSON.parse(localStorage.getItem('dataOfFilter_players'));
          if(filterData.locationId==locationId && filterData.sportId==sportId &&
            (filterData.date=='recent' || 'old')
          ){
            setCurrentPage(Number(filterData.pageNumber)); 
          }else{
            setCurrentPage(1); // Réinitialiser à la première page si ce n'est pas le cas
          }
        } else{
          setCurrentPage(1); // Réinitialiser à la première page si ce n'est pas le cas
        }
      }
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong.');
      } finally {
        setIsLoading(false);  // Désactivation du loading après la requête
        localStorage.setItem('locationId_players',locationId)
        localStorage.setItem('sportId_players',sportId)
        localStorage.setItem('date_players',date)
      }
    };

    fetchPlayers();
  }, [locationId, sportId, date]);


  const handleChat = (playerId) => {
    if (activeChat == playerId) {
      setActiveChat(null); // Si le chat est déjà ouvert, on le ferme
    } else {
      setActiveChat(playerId); // Ouvre le chat pour le joueur sélectionné
    }
  };

    // Calculer les joueurs à afficher
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const totalPlayers = players.length;
  
    // Changer de page
    const paginate = (pageNumber) =>{ 
      if(locationId=="allCities" && sportId=="allSports" && date=="recent"){
        localStorage.setItem('currentPageDefault_players',pageNumber)
      }
      setCurrentPage(pageNumber);
      const filterData = {
        locationId,
        sportId,
        date,
        pageNumber
      };
      localStorage.setItem('dataOfFilter_players',JSON.stringify(filterData));
    };

    
  return (
    <>
                  <ToastContainer  />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {isLoading ? (
        // Affiche plusieurs skeletons pendant le chargement
        [1, 2, 3, 4].map((item) => <Skeleton key={item} />)
      ) : error ? (
        // Affiche un message d'erreur en cas de problème
        <div className='text-red-500'>{error}</div>
      ) : (
        // Affiche les joueurs si les données ont bien été chargées
        currentPlayers.map((player) => (
          <Card 
            key={player.id} 
            player={player} 
            isChatOpen={activeChat == player.id}
            handleChat={() => handleChat(player.id)}  
            toastError={()=> toast.error('Error while sending the friend request.') }
            toastSuccess={()=> toast.success('Friend request sent successfully.') }

          />
        ))
      )}
    </div>
    <Pagination 
        itemsPerPage={playersPerPage}
        totalItems={totalPlayers}
        paginate={paginate}
        currentPage={currentPage}
      />
      </>
  );
}

export default AllPlayers;
