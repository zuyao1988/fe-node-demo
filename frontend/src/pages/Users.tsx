import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store.ts";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../store/counterSlice.ts";

import type { User } from "../types.ts";
import UserList from "./UserList.tsx";
import UserDetail from "./UserDetail.tsx";
import UserForm from "./UserForm.tsx";

// --- Users Page ---
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();

  function updateUsers(users: [User]) {
    setUsers(users);
    dispatch(setValue(users.length));
  }

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(updateUsers);
  }, []);

  const addUser = (u: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, u];
      console.log(`users length: ${updatedUsers.length}`);
      dispatch(setValue(updatedUsers.length));
      return updatedUsers;
    });

    // const newUsers = [...users, u];
    // setUsers(newUsers);
    // console.log(`users length: ${newUsers.length}`);
    // dispatch(setValue(newUsers.length));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <UserForm onAdd={addUser} />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Users ({count})
            </h2>
            <UserList users={users} />
          </div>
        }
      />
      <Route path=":id" element={<UserDetail />} />
    </Routes>
  );
};

export default Users;
