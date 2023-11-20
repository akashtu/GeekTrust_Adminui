// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import "./Table.css";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import ViewOnlyRow from "./ViewOnlyRow";

// Define the functional Table component that takes props
const Table = ({
  users,
  setUsers,
  deleteUser,
  totalUsers,
  setUserToBeDeleted
}) => {
  // Initialize state variables
  const [changeRowId, setChangeRowId] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectingAll, setSelectingAll] = useState(false);
  const [edittingUserData, setEdittingUserData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const index = selectedRowIds.findIndex((id) => id === users.id);
  const Checked = index === -1 ? false : true;

  // Use useEffect to update the selectedRowIds in the parent component
  useEffect(() => {
    setUserToBeDeleted([...selectedRowIds]);
  }, [selectedRowIds, setUserToBeDeleted]);

  // Use useEffect to reset selectedRowIds when users change
  useEffect(() => {
    setSelectedRowIds([]);
    setSelectingAll(false);
  }, [users]);

  // Use useEffect to select or deselect all rows based on selectingAll state
  useEffect(() => {
    const userIDs = users.map((user) => user.id);
    if (selectingAll) {
      setSelectedRowIds(userIDs);
    } else {
      setSelectedRowIds([]);
    }
  }, [selectingAll, users]);

  // Function to enable editing a user
  const clickEditUser = (user) => {
    setChangeRowId(user.id);
    setEdittingUserData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  // Function to close the editing form
  const closeEditUser = () => {
    setChangeRowId(null);
  };

  // Function to select or deselect a user
  const selectUser = (value) => {
    let selectedIndexes = [...selectedRowIds];
    const index = selectedIndexes.findIndex((id) => id === value.id);

    if (index === -1) {
      setSelectedRowIds([...selectedIndexes, value.id]);
    } else {
      selectedIndexes.splice(index, 1);
      setSelectedRowIds(selectedIndexes);
    }
  };

  // Function to handle the select/deselect all checkbox
  const handleSelectAll = () => {
    setSelectingAll(!selectingAll);
  };

  // Function to handle changes in the edit form input fields
  const handleEditUserChange = (event) => {
    event.preventDefault();

    setEdittingUserData({
      ...edittingUserData,
      [event.target.name]: event.target.value
    });
  };

  // Function to submit the edited user data
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedUserData = {
      id: changeRowId,
      name: edittingUserData.name,
      email: edittingUserData.email,
      role: edittingUserData.role
    };

    const newUsersData = totalUsers.map((user) => {
      if (user.id === changeRowId) {
        return { ...user, ...editedUserData };
      }
      return user;
    });

    setUsers(newUsersData);
    setChangeRowId(null);
  };

  // Return the JSX structure for the Table component
  return (
    <div>
      <table className="tableStyle">
        <thead>
          <tr>
            <th>
              <input
                className="checkboxColumn"
                type="checkbox"
                checked={selectingAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((value) => (
            <tr
              key={value.id}
              className={
                selectedRowIds.includes(value.id) ? "selectRowDesign" : null
              }
            >
              {value.id === changeRowId ? (
                <>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => selectUser(value)}
                      checked={Checked}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Edit Your Name"
                      name="name"
                      value={edittingUserData.name}
                      onChange={handleEditUserChange}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="email"
                      placeholder="Edit Your Email"
                      name="email"
                      value={edittingUserData.email}
                      onChange={handleEditUserChange}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Edit Your Role"
                      name="role"
                      value={edittingUserData.role}
                      onChange={handleEditUserChange}
                    />
                  </td>
                  <td>
                    <DoneIcon
                      className="doneButton"
                      onClick={handleEditFormSubmit}
                    />{" "}
                    <CancelIcon
                      className="cancelButton"
                      onClick={closeEditUser}
                    />
                  </td>
                </>
              ) : (
                <>
                  {/* Render the ViewRow component for non-editable rows */}
                  <ViewOnlyRow
                    key={value.id}
                    user={value}
                    clickTodeleteUser={deleteUser}
                    clickToEditUser={clickEditUser}
                    selectUser={selectUser}
                    selectedRowIds={selectedRowIds}
                  />
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the Table component for use in other parts of the application
export default Table;
