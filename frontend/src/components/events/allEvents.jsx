'use client'
import React, { useEffect, useState } from 'react'
import Card from './card'
import api from '@/util/api';
import Skeleton from './sekeletton';
import Pagination from '../general/pagination/pagination';

const AllEvent = ({ locationId,sportId,date }) => {
  const [events, setEvents] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(false);  

    // pagination system 
    const [currentPage, setCurrentPage] = useState(1); // Page actuelle
    const [eventsPerPage] = useState(2); // Nombre des events par page

    
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await api.get(`/api/announcements/filteredEvents?locationId=${locationId}&sportId=${sportId}&date=${date}`);      
        setEvents(response.data.announces); 
        if (locationId === "allCities" && sportId === "allSports" && ( date === "recent"||'old') ) {
          setCurrentPage(Number(localStorage.getItem('currentPageDefault_events')) ||1);        

        }else {
          if(localStorage.getItem('dataOfFilter_events')){
            const filterData=JSON.parse(localStorage.getItem('dataOfFilter_events'));
            if(filterData.locationId==locationId && filterData.sportId==sportId &&
              (filterData.date=='recent' || 'old')){
              setCurrentPage(Number(filterData.pageNumber)); 
            }else{
              setCurrentPage(1);
            }
          }else{
            setCurrentPage(1); 
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
        setError(error.response?.data?.message||'Something went wrong.');
      }finally{
        setLoading(false);
        localStorage.setItem('locationId_events',locationId)
        localStorage.setItem('sportId_events',sportId)
        localStorage.setItem('date_events',date)
      }
    };

    fetchEvents();
  }, [locationId,sportId,date]);


    // Calculer les joueurs à afficher
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalEvents = events.length;
  
    // Changer de page
    const paginate = (pageNumber) =>{ 
      if(locationId=="allCities" && sportId=="allSports" && date=="recent"){
        localStorage.setItem('currentPageDefault_events',pageNumber)
      }
      setCurrentPage(pageNumber);
      const filterData = {
        locationId,
        sportId,
        date,
        pageNumber
      };
      localStorage.setItem('dataOfFilter_events',JSON.stringify(filterData));
    };


  return (
    <>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {loading ? (
          [1, 2, 3, 4].map((item) => <Skeleton key={item} />)  
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : (
          currentEvents.map((event) => <Card key={event.id} event={event} />)
        )}
      </div>

      <Pagination
        itemsPerPage={eventsPerPage}
        totalItems={totalEvents}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
  

}

export default AllEvent;