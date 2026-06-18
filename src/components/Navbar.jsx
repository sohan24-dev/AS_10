"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import UserAvatar from "./UserAvatar";
import SearchBar from "./SearchBar";

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
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="rounded-xl p-2 text-white lg:hidden"
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

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-2">
                    {NAV_LINKS.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div className="hidden lg:block flex-1 max-w-md">
                    <SearchBar />
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">
                    <UserAvatar />
                </div>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="border-t border-white/10 bg-zinc-950 lg:hidden">
                    {/* Mobile Search */}
                    <div className="p-4 border-b border-white/10">
                        <SearchBar />
                    </div>

                    {/* Mobile Links */}
                    <div className="flex flex-col p-4">
                        {NAV_LINKS.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                                        ? "bg-violet-600 text-white"
                                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}