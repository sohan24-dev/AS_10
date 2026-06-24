"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Scale, Award } from "lucide-react";


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
        </div>
    );
}