import React, { useState } from "react";
import type { User } from "../types.ts";

// --- Add User Form ---
const UserForm: React.FC<{ onAdd: (u: User) => void }> = ({ onAdd }) => {
  const [form, setForm] = useState<{ name: string; age: number | "" }>({
    name: "",
    age: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newUser: User = await res.json();
    onAdd(newUser);
    setForm({ name: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        value={form.name}
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={form.age}
        placeholder="Age"
        onChange={(e) =>
          setForm({
            ...form,
            age: e.target.value ? parseInt(e.target.value) : "",
          })
        }
        required
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add User
      </button>
    </form>
  );
};

export default UserForm;
