import { Link } from "react-router"; // Corrige el import
import { motion } from "framer-motion";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  text-white px-4">
      <h1 className="text-4xl font-bold mb-6">X-Men Universe</h1>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {[
          { name: "Catálogo", path: "/catalog" },
          { name: "Battle Simulator", path: "/battle" },
          { name: "Quiz", path: "/quiz" },
          { name: "Línea de Tiempo", path: "/timeline" },
        ].map((item) => (
          <motion.div whileHover={{ scale: 1.1 }} key={item.name} className="w-full">
            <Link
              to={item.path}
              className="block p-6 sm:p-8 lg:p-10 w-full text-lg lg:text-xl font-semibold text-center bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition-all"
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
