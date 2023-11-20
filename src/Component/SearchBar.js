// Import React library and the CSS file for styling
import React from "react";
import "./SearchBar.css";

// Define the functional SearchBar component that takes props
const SearchBar = ({ search, handlelingSearchUser }) => {
  // Return the JSX structure for the SearchBar component
  return (
    <div>
      {/* Render an input field with specific attributes and event handlers */}
      <input
        type="text"
        className="search-input" // Apply a CSS class for styling
        placeholder="Search by name, email or role" // Set the input's placeholder text
        value={search} // Bind the input's value to the 'search' prop
        onChange={handlelingSearchUser} // Attach an onChange event handler
      />
    </div>
  );
};

// Export the SearchBar component for use in other parts of the application
export default SearchBar;
