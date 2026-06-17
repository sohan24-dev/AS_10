"use client";

import { useState } from "react";
import { LogoFacebook, LogoLinkedin, LogoGithub } from '@gravity-ui/icons';
export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Newsletter email:", email);
        setEmail("");
    };

    return (
        <footer className="bg-zinc-950 text-zinc-300 border-t border-white/10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-3">

                {/* Column 1 - Brand / Copyright */}
                <div>
                    <h2 className="text-xl font-semibold text-white">MyWebsite</h2>
                    <p className="mt-3 text-sm text-zinc-400">
                        © {new Date().getFullYear()} MyWebsite. All rights reserved.
                    </p>
                </div>

                {/* Column 2 - Quick Links */}
                <div>
                    <h3 className="text-lg font-medium text-white">Quick Links</h3>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-white transition">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">Contact</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3 - Newsletter */}
                <div>
                    <h3 className="text-lg font-medium text-white">Newsletter</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                        Subscribe to get updates.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-4 flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-l-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                        />
                        <button
                            type="submit"
                            className="rounded-r-lg bg-white px-4 text-sm font-medium text-black hover:bg-zinc-200"
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 px-6 py-4">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition">
                            <LogoFacebook size={18} />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <LogoLinkedin size={18} />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <LogoGithub size={18} />
                        </a>
                    </div>

                    {/* Copyright small */}
                    <p className="text-xs text-zinc-500">
                        Built with React & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}