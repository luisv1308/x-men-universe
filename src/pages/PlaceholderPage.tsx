import { Link } from "react-router";
import React from "react";

interface PlaceholderProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4">Esta sección está en construcción...</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-yellow-500 rounded-lg">
        Volver
      </Link>
    </div>
  );
};

export default PlaceholderPage;
