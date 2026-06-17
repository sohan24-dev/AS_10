"use client";

import { useState } from "react";
import { User, LogOut } from "lucide-react";

export default function UserAvatar({ user }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // If no user → show auth buttons
    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <a
                    href="/signin"
                    className="rounded-lg px-4 py-2 text-sm text-zinc-300 hover:bg-white/5"
                >
                    Sign In
                </a>
                <a
                    href="/signup"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                >
                    Sign Up
                </a>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Avatar Button */}
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
            >
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-zinc-900 p-2 shadow-2xl">
                    <div className="border-b border-white/10 p-3">
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-zinc-400">{user.email}</p>
                    </div>

                    <button className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5">
                        <User size={16} />
                        Profile
                    </button>

                    <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}