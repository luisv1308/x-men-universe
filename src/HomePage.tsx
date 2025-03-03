import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

interface PlaceholderProps {
    title: string;
}

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-6">X-Men Universe</h1>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { name: "Catalog", path: "/catalog"},
                    { name: "Battle Simulator", path: "/battle"},
                    { name: "Quiz", path: "/quiz"},
                    { name: "Timeline", path: "/timeline"},
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};