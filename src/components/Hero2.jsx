"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Scale, Award } from "lucide-react";

const lawyers = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Managing Partner / Corporate Law",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 2,
        name: "Michael Chang",
        role: "Senior Counsel / Intellectual Property",
        image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 3,
        name: "Elena Rostova",
        role: "Head of International Arbitration",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    },
];

const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero2() {
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 overflow-x-hidden">

            {/* HERO */}
            <section className="min-h-[80vh] flex items-center justify-center px-4 text-center border-b border-slate-200 dark:border-slate-800">
                <motion.div variants={heroVariants} initial="hidden" animate="visible" className="space-y-6">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-500 text-sm">
                        <Scale size={16} /> Trusted Legal Excellence
                    </div>

                    <h1 className="font-serif font-bold leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Defending Your Rights, <br />
                        <span className="text-amber-500">Securing Your Future.</span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        A boutique full-service law firm dedicated to providing world-class legal counsel with integrity and precision.
                    </p>
                </motion.div>
            </section>

            {/* CARDS */}
            <section className="py-16 sm:py-20 md:py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4">
                        Meet Our Elite Legal Team
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
                        Our attorneys deliver breakthrough victories across global sectors.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {lawyers.map((lawyer) => (
                        <motion.div
                            key={lawyer.id}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-md"
                        >
                            <div className="relative aspect-[4/5]">
                                <img
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition"
                                />

                                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 text-amber-400">
                                    <Shield size={18} />
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 space-y-2">
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {lawyer.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-amber-500 font-medium">
                                    {lawyer.role}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-200 dark:border-slate-700">
                                    <Award size={14} className="text-amber-500" />
                                    Top-Tier Certified
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}