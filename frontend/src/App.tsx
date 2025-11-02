import "./App.css";

import React, { createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./pages/Header.tsx";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import Todos from "./pages/Todos.tsx";

// Create a context to share the theme
export const ThemeContext = createContext("light");

const App: React.FC = () => {
  return (
    <>
      {/* Use flexbox to center content vertically and horizontally, with some
      padding and a background. */}
      <div className="min-h-screen p-8 bg-gray-100 font-sans">
        <div className="container mx-auto max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <Header />

          {/* Use flexbox for navigation links with spacing */}
          <nav className="flex justify-center mb-8 space-x-4">
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/users"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Users
            </Link>
            <Link
              to="/todos"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Todo
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/todos/*" element={<Todos />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
