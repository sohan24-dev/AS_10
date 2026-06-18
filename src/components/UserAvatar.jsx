"use client";

import { useState } from "react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { getUserSession } from "@/lib/getUserSession";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function UserAvatar() {
    const { session } = getUserSession();
    const user = session?.user;
    // console.log(session?.user);
    // console.log(session);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleSignOut = async () => {
        await authClient.signOut();
    };


    const initials =
        user?.name
            ?.split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";



    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/auth/signin"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                    Sign In
                </Link>

                <Link
                    href="/auth/signup"
                    className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10 text-white"
            >
                {user?.avatar ? (
                    <Image
                        src={user?.avatar}
                        alt={user?.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-xl border border-white/10 bg-zinc-950 shadow-xl">
                    <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-sm font-semibold text-white truncate">
                            {user?.name}
                        </p>
                        <p className="text-xs text-zinc-400 truncate">
                            {user?.email}
                        </p>
                    </div>

                    <div className="p-2">
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
                        >
                            <User size={16} />
                            Dashboard
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}