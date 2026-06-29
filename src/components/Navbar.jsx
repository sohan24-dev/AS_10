"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";

import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";
import ThemeSwitch from "./ThemeSwitch";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Browse Lawyers", href: "/browselawyers" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-xl transition-colors">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((p) => !p)}
                        aria-label="Toggle menu"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 transition lg:hidden"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-violet-500/20 transition group-hover:scale-105">
                            <Zap size={20} />
                        </div>

                        <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                            LegalEase
                        </span>
                    </Link>
                </div>

                {/* DESKTOP LINKS */}
                <div className="hidden lg:flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/[0.03] p-1">
                    {NAV_LINKS.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                                    ? "bg-white dark:bg-white text-zinc-900 dark:text-zinc-900 shadow-sm"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-white/70 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    <ThemeSwitch />
                    <UserAvatar />
                </div>
            </nav>

            {/* MOBILE MENU */}
            <div
                className={`lg:hidden overflow-hidden border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 transition-all duration-300 ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-4 p-4">

                    <div className="flex flex-col gap-1">
                        {NAV_LINKS.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                        ? "bg-violet-600 text-white"
                                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"
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