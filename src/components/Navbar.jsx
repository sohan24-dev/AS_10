"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";


import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 lg:hidden"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-violet-500/20 transition group-hover:scale-105">
                            <Zap size={20} fill="currentColor" />
                        </div>

                        <span className="text-lg font-semibold tracking-tight text-white">
                            Lumiq
                        </span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 lg:flex">
                    {NAV_LINKS.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                                    ? "bg-white text-zinc-950 shadow-sm"
                                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="hidden max-w-md flex-1 lg:block">
                    <SearchBar />
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <UserAvatar />
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden border-t border-white/10 bg-zinc-950 transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-4 p-4">
                    <SearchBar />

                    <div className="flex flex-col gap-1">
                        {NAV_LINKS.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                                        : "text-zinc-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
}