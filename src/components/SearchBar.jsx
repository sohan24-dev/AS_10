"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
                type="text"
                placeholder="Search lawyers..."
                className="h-10 md:h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-violet-500 focus:bg-white/10"
            />
        </div>
    );
}