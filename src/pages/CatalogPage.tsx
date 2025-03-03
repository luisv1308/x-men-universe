import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { motion } from "framer-motion";
import React from "react";

const CatalogPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold">Catálogo de Personajes</h1>
      <p className="mt-4">Aquí mostraremos los personajes de Marvel API</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-yellow-500 rounded-lg">
        Volver
      </Link>
    </div>
  );
};

export default CatalogPage;