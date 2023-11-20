// Import React library and the CSS file for styling
import React from "react";
import "./DeleteButton.css";

// Define the functional DeleteButton component that takes props
const DeleteButton = ({ placeholderText, handleDeleteUsers }) => {
  // Return the JSX structure for the DeleteButton component
  return (
    <div>
      {/* Render a div element with a custom CSS class and an onClick event handler */}
      <div className="btn" onClick={handleDeleteUsers}>
        {placeholderText}{" "}
        {/* Display the text provided in the placeholderText prop */}
      </div>
    </div>
  );
};

// Export the DeleteButton component for use in other parts of the application
export default DeleteButton;
