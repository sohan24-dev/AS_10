"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterLawyer = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (e) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value) {
            params.set("search", e.target.value);
        } else {
            params.delete("search");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSpecialization = (e) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value !== "all") {
            params.set("specialization", e.target.value);
        } else {
            params.delete("specialization");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSort = (e) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value) {
            params.set("sort", e.target.value);
        } else {
            params.delete("sort");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search lawyer..."
                    defaultValue={searchParams.get("search") || ""}
                    onChange={handleSearch}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 dark:border-slate-700 dark:bg-slate-900"
                />
            </div>

            {/* Filter */}
            <select
                defaultValue={searchParams.get("specialization") || "all"}
                onChange={handleSpecialization}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
            >
                <option value="all">All Specializations</option>
                <option value="Family Law">Family Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Immigration Law">Immigration Law</option>
                <option value="Civil Litigation">Civil Litigation</option>
            </select>

            {/* Sort */}
            <select
                defaultValue={searchParams.get("sort") || ""}
                onChange={handleSort}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
            >
                <option value="">Sort By Fee</option>
                <option value="low">Fee: Low → High</option>
                <option value="high">Fee: High → Low</option>
            </select>
        </div>
    );
};

export default FilterLawyer;