import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Pagination = ({ path, currentPage, totalPages }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const getPageLink = (pageNumber) => `${path}?page=${pageNumber}`;

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <Link
            key={pageNumber}
            to={getPageLink(pageNumber)}
            className={`${
              pageNumber === currentPage 
                ? 'bg-neon text-white neon-glow' 
                : `bg-${selectedTheme}/20 text-gray-300 hover:bg-${selectedTheme} hover:text-white`
            } px-3 py-2 text-sm mr-2 md:text-base md:mr-4 rounded-lg transition-all duration-300 hover:scale-105`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
