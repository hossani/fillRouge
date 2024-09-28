import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Calculer l'index de la page à afficher
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 3, totalPages);

  // Si on est proche de la fin des pages, ajuster le début
  if (endPage - startPage < 3) {
    startPage = Math.max(endPage - 3, 1);
  }

  return (
    <ul className="flex space-x-4 justify-center mt-6">
      {startPage > 1 && (
        <li 
          onClick={() => paginate(startPage - 1)} 
          className="flex items-center justify-center shrink-0 bg-gray-300 w-10 h-10 rounded-full cursor-pointer"
        >
          &lt; {/* Ou une flèche SVG */}
        </li>
      )}

      {pageNumbers.slice(startPage - 1, endPage).map(number => (
        <li 
          key={number} 
          onClick={() => paginate(number)} 
          className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold w-10 h-10 rounded-full ${currentPage === number ? 'bg-yellow-500 text-black' : 'hover:bg-gray-50 border-2 cursor-pointer text-[#333]'}`}
        >
          {number}
        </li>
      ))}

      {endPage < totalPages && (
        <li 
          onClick={() => paginate(endPage + 1)} 
          className="flex items-center justify-center shrink-0 bg-gray-300 w-10 h-10 rounded-full cursor-pointer"
        >
          &gt; {/* Ou une flèche SVG */}
        </li>
      )}
    </ul>
  );
};

export default Pagination;
