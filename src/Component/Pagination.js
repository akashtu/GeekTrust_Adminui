// Import the necessary dependencies and components
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Pagination.css";

// Define the functional Pagination component that takes props
const Pagination = ({
  currentUsersPerPage,
  totalNoOfUsers,
  paginating,
  previousPage,
  nextPage,
  selectedPage
}) => {
  // Create an array to store page numbers
  const selectedPageNumbers = [];

  let i = 1;
  // Calculate and push page numbers into the array
  while (i <= Math.ceil(totalNoOfUsers / currentUsersPerPage)) {
    selectedPageNumbers.push(i);
    i++;
  }

  // Return the JSX structure for the Pagination component
  return (
    <nav className="navDesign">
      <ul className="paginationDesign">
        <li>
          {/* Render a double arrow left icon and add an onClick event handler */}
          <div className="iconsDesign" onClick={() => paginating(1)}>
            <KeyboardDoubleArrowLeftIcon />
          </div>
        </li>

        <li>
          {/* Render a single arrow left icon and add an onClick event handler */}
          <div className="iconsDesign" onClick={() => previousPage()}>
            <KeyboardArrowLeftIcon />
          </div>
        </li>

        {/* Map through the page numbers and render them */}
        {selectedPageNumbers.map((number) => (
          <li key={number} className="page">
            <div
              onClick={() => paginating(number)}
              // Add different CSS classes based on whether the page is selected or hovered
              className={
                selectedPage === number ? "selectedNumber" : "hoverNumber"
              }
            >
              {number}
            </div>
          </li>
        ))}

        <li>
          {/* Render a single arrow right icon and add an onClick event handler */}
          <div
            className="iconsDesign"
            onClick={() => nextPage(selectedPageNumbers.length)}
          >
            <KeyboardArrowRightIcon />
          </div>
        </li>
        <li>
          {/* Render a double arrow right icon and add an onClick event handler */}
          <div
            className="iconsDesign"
            onClick={() => paginating(selectedPageNumbers.length)}
          >
            <KeyboardDoubleArrowRightIcon />
          </div>
        </li>
      </ul>
    </nav>
  );
};

// Export the Pagination component for use in other parts of the application
export default Pagination;
