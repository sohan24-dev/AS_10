"use client";

import { motion } from "framer-motion";

const practiceAreas = [
    "Family Law",
    "Criminal Law",
    "Property Law",
    "Corporate Law",
    "Immigration Law",
    "Civil Litigation",
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export default function Hero() {
    return (
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-12 text-gray-900 dark:text-white"
                >
                    Practice Areas
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {practiceAreas.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -8,
                            }}
                            transition={{ type: "spring", stiffness: 250 }}
                            className="
                                bg-white dark:bg-gray-800 
                                rounded-xl shadow-md p-8 cursor-pointer 
                                border border-gray-200 dark:border-gray-700
                                hover:border-blue-500
                                transition-colors duration-300
                            "
                        >
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {item}
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                                Get expert legal support in {item.toLowerCase()}.
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}