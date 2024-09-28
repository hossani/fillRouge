export function removeLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('currentPageDefault_players'); // For page player
    localStorage.removeItem('dataOfFilter_players');
    localStorage.removeItem('locationId_players')
    localStorage.removeItem('sportId_players')
    localStorage.removeItem('date_players');
    localStorage.removeItem('currentPageDefault_events'); // For page events
    localStorage.removeItem('dataOfFilter_events');
    localStorage.removeItem('locationId_events')
    localStorage.removeItem('sportId_events')
    localStorage.removeItem('date_events');
    localStorage.removeItem('filterTimestamp_events')
}