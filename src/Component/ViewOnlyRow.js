import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ViewOnlyRow.css";

const ViewOnlyRow = ({
  user,
  clickTodeleteUser,
  clickToEditUser,
  selectUser,
  selectedRowIds
}) => {
  const index = selectedRowIds.findIndex((id) => id === user.id);
  const Checked = index === -1 ? false : true;
  return (
    <>
      <td>
        <input
          type="checkbox"
          onChange={() => selectUser(user)}
          checked={Checked}
        />
      </td>

      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <EditIcon
          className="editButton"
          onClick={() => clickToEditUser(user)}
        />{" "}
        <DeleteIcon
          className="deleteButton"
          onClick={() => clickTodeleteUser(user.id)}
        />
      </td>
    </>
  );
};

export default ViewOnlyRow;
