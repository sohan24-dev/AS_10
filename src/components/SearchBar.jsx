"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <form
            role="search"
            className="group relative w-full max-w-xs md:max-w-sm lg:max-w-md"
        >
            <label htmlFor="site-search" className="sr-only">
                Search lawyers
            </label>

            <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-violet-400"
            />

            <input
                id="site-search"
                name="search"
                type="search"
                autoComplete="off"
                placeholder="Search lawyers, practice areas..."
                className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.06] pl-11 pr-4 text-sm text-white shadow-sm outline-none transition placeholder:text-zinc-500 hover:border-white/20 hover:bg-white/[0.08] focus:border-violet-500 focus:bg-zinc-950/80 focus:ring-2 focus:ring-violet-500/20"
            />
        </form>
    );
}