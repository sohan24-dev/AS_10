"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

const NAV_LINKS = [
    { name: "Home", href: "#" },
    { name: "Explore", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="rounded-xl p-2 text-white md:hidden"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-500">
                            ⚡
                        </div>
                        <span className="text-lg font-bold text-white">
                            Lumiq
                        </span>
                    </Link>
                </div>

                {/* CENTER NAV (Desktop only) */}
                <div className="hidden md:flex items-center gap-2">
                    {NAV_LINKS.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">
                    <UserAvatar />
                </div>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="border-t border-white/10 bg-zinc-950 md:hidden">
                    <div className="flex flex-col p-4">
                        {NAV_LINKS.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-white"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}