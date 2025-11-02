import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../types.ts";
// --- User Detail ---
const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        console.log(res);

        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchUser();

    // fetch(`/api/users/${id}`)
    //   .then((res) => res.json())
    //   .then(setUser);
  }, [id]);

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mt-4">
      <h3 className="text-xl font-semibold mb-4">User Detail</h3>
      <p className="mb-2">
        <b className="font-bold text-gray-700">ID:</b> {user.id}
      </p>
      <p className="mb-2">
        <b className="font-bold text-gray-700">Name:</b> {user.name}
      </p>
      <p className="mb-2">
        <b className="font-bold text-gray-700">Age:</b> {user.age}
      </p>
      <button
        onClick={() => navigate("/users")}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none"
      >
        Back
      </button>
    </div>
  );
};

export default UserDetail;
