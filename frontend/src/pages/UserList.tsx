import React from "react";
import { Link } from "react-router-dom";
import type { User } from "../types.ts";

// --- User List ---
const UserList: React.FC<{ users: User[] }> = ({ users }) => (
  <table className="w-full text-left border-collapse mt-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="py-2 px-4 border-b">ID</th>
        <th className="py-2 px-4 border-b">Name</th>
        <th className="py-2 px-4 border-b">Age</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u.id} className="hover:bg-gray-50">
          <td className="py-2 px-4 border-b">{u.id}</td>
          <td className="py-2 px-4 border-b">
            <Link
              to={`/users/${u.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {u.name}
            </Link>
          </td>
          <td className="py-2 px-4 border-b">{u.age}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserList;
