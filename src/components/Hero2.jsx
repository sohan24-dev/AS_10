"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, Award, ArrowRight } from 'lucide-react';

// Mock Data for Lawyers
const lawyers = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        role: 'Managing Partner / Corporate Law',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 2,
        name: 'Michael Chang',
        role: 'Senior Counsel / Intellectual Property',
        image: 'https://ibb.co.com/Kc507JBJ',
    },
    {
        id: 3,
        name: 'Elena Rostova',
        role: 'Head of International Arbitration',
        image: 'https://ibb.co.com/mrk97FhF',
    },
];

// Framer Motion Animation Variants
const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Time delay between each card's entry
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function Hero2() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans overflow-x-hidden">

            {/* 1. HERO SECTION (Fade-in on Load) */}
            <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 max-w-5xl mx-auto text-center border-b border-slate-800">
                <motion.div
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium tracking-wide">
                        <Scale size={16} /> Trusted Legal Excellence
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-none">
                        Defending Your Rights, <br />
                        <span className="text-amber-400">Securing Your Future.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        A boutique full-service law firm dedicated to providing world-class legal counsel with uncompromised integrity and precision.
                    </p>
                    {/* 
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2 group">
                            Schedule Consultation
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-transparent hover:bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 transition-colors">
                            Explore Practices
                        </button>
                    </div> */}
                </motion.div>
            </section>

            {/* 2. LAWYER CARDS SECTION (Staggered Reveal on Scroll & Hover Scaling) */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Meet Our Elite Legal Team
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Our attorneys hold records of breakthrough victories across corporate, defense, and international sectors.
                    </p>
                </div>

                {/* Framer Motion Parent Container for Staggering */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }} // Triggers animation once when 100px into viewport
                >
                    {lawyers.map((lawyer) => (
                        <motion.div
                            key={lawyer.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                                transition: { duration: 0.3, ease: "easeInOut" }
                            }}
                            className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 group cursor-pointer shadow-xl hover:border-amber-500/40 hover:shadow-amber-500/5 transition-colors duration-300"
                        >
                            {/* Image Box */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                                <img
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                                {/* Badge Icon */}
                                <div className="absolute top-4 right-4 p-2.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-amber-400">
                                    <Shield size={18} />
                                </div>
                            </div>

                            {/* Text Body */}
                            <div className="p-6 space-y-2">
                                <h3 className="text-xl font-serif font-semibold text-white group-hover:text-amber-400 transition-colors">
                                    {lawyer.name}
                                </h3>
                                <p className="text-sm text-amber-500 font-medium tracking-wide">
                                    {lawyer.role}
                                </p>
                                <div className="pt-4 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-700/50 mt-4">
                                    <Award size={14} className="text-amber-500/70" /> Top-Tier Practice Certified
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

        </div>
    );
}