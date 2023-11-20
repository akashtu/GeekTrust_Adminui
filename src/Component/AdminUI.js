// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Pagination from "./Pagination";
import DeleteButton from "./DeleteButton";
import SearchBar from "./SearchBar";
import "./AdminUI.css";
import { Grid } from "@mui/material";

// Define the functional component AdminUI
const AdminUI = () => {
  // Define and initialize state variables using the useState hook
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [currentPageView, setCurrentPageView] = useState(1);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [usersToBeDeleted, setUsersToBeDeleted] = useState([]);
  const [search, setSearch] = useState("");
  const currentUsersPerPage = 10;

  // Function to fetch data from an external source
  const fetchData = async () => {
    try {
      // Make an HTTP GET request using axios
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      console.log(response.data); // Log the fetched data
      setUsers(response.data); // Update the users state
      setTotalUsers(response.data); // Update the totalUsers state
    } catch (err) {
      console.log(err); // Log any errors that occur during the fetch
    }
  };

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Use the useEffect hook to update the currentUsers state based on pagination
  useEffect(() => {
    const lastUserIndexNumber = currentPageView * currentUsersPerPage;
    const firstUserIndexNumber = lastUserIndexNumber - currentUsersPerPage;
    const slicedUsers = users.slice(firstUserIndexNumber, lastUserIndexNumber);
    if (slicedUsers.length === 0) {
      setCurrentPageView(1);
    }
    setCurrentUsers(slicedUsers);
  }, [users, currentPageView]);

  // Use the useEffect hook to filter and update the users based on search input
  useEffect(() => {
    const searchedUsers = totalUsers.filter((user) => {
      if (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
      ) {
        return user;
      }
      return "";
    });
    setUsers(searchedUsers);
  }, [search]);

  // Function to handle pagination
  const paginating = (selectedPageNumber) => {
    setCurrentPageView(selectedPageNumber);
  };

  // Function to go to the previous page
  const previousPage = () => {
    if (currentPageView > 1) {
      setCurrentPageView(currentPageView - 1);
    }
  };

  // Function to go to the next page
  const nextPage = (maxPageLength) => {
    if (currentPageView < maxPageLength) {
      setCurrentPageView(currentPageView + 1);
    }
  };

  // Function to delete users
  const deletingUsers = (userId) => {
    let usersLefted = [...users];
    usersLefted = usersLefted.filter((user) => user.id !== userId);
    setUsers(usersLefted);
    setTotalUsers(usersLefted);
  };

  // Function to handle search input
  const handlelingSearchUser = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // Function to handle the deletion of selected users
  const handleDeleteUsers = (event) => {
    event.preventDefault();
    let usersLefted = [...users];
    let deletingSelectedUsers = [...usersToBeDeleted];

    usersLefted = usersLefted.filter(
      (user) => !deletingSelectedUsers.includes(user.id)
    );
    setUsers([...usersLefted]);
    setTotalUsers([...usersLefted]);
  };

  // Return the JSX structure for the AdminUI component
  return (
    <div className="adminPage">
      {/* Render the SearchBar component */}
      <SearchBar search={search} handlelingSearchUser={handlelingSearchUser} />
      {users.length !== 0 ? (
        <div className="container">
          <Grid container>
            <Grid item sm={12} xs={12} md={12}>
              {/* Render the Table component */}
              <Table
                totalUsers={users}
                users={currentUsers}
                setUsers={setUsers}
                deleteUser={deletingUsers}
                setUserToBeDeleted={setUsersToBeDeleted}
              />
              <div className="footer">
                {/* Render the DeleteButton component */}
                <DeleteButton
                  handleDeleteUsers={handleDeleteUsers}
                  placeholderText="Delete Selected"
                />

                {/* Render the Pagination component */}
                <Pagination
                  currentUsersPerPage={currentUsersPerPage}
                  totalNoOfUsers={users.length}
                  paginating={paginating}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  selectedPage={currentPageView}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>no results found</div>
      )}
    </div>
  );
};

// Export the AdminUI component for use in other parts of the application
export default AdminUI;
