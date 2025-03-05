import { Link } from "react-router";
import { motion } from "framer-motion";
import React from "react";


const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">X-Men Universe</h1>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Catálogo", path: "/catalog" },
          { name: "Battle Simulator", path: "/battle" },
          { name: "Quiz", path: "/quiz" },
          { name: "Línea de Tiempo", path: "/timeline" },
        ].map((item) => (
          <motion.div whileHover={{ scale: 1.1 }} key={item.name}>
            <Link
              to={item.path}
              className="block p-6 bg-blue-600 rounded-xl text-center text-lg font-semibold shadow-lg hover:bg-blue-700"
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
