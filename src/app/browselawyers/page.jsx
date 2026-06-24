import FilterLawyer from "@/components/FilterLawyer";
import { getAllLawyers } from "@/lib/api/data";
import Image from "next/image";
import Link from "next/link";

const Lawyers = async ({ searchParams }) => {
    // 1. Fetch data from your API helper
    const rawData = await getAllLawyers();
    // console.log(rawData);

    // 2. Comprehensive check for backend array wrappers
    let lawyerdata = [];
    if (Array.isArray(rawData)) {
        lawyerdata = rawData;
    } else if (rawData && typeof rawData === 'object') {
        lawyerdata = rawData.data || rawData.lawyers || rawData.result || [];
    }

    const params = await searchParams;

    const search = params?.search?.toLowerCase() || "";
    const specialization = params?.specialization || "";
    const sort = params?.sort || "";

    // 3. PAGINATION CONFIGURATION
    const currentPage = Number(params?.page) || 1;
    const itemsPerPage = 6; // Adjust this number to change how many items show per page

    let filteredLawyers = [...lawyerdata];

    // Search
    if (search) {
        filteredLawyers = filteredLawyers.filter(
            (lawyer) =>
                lawyer.name?.toLowerCase().includes(search) ||
                lawyer.specialization?.toLowerCase().includes(search)
        );
    }

    // Filter by specialization
    if (specialization && specialization !== "all") {
        filteredLawyers = filteredLawyers.filter(
            (lawyer) => lawyer.specialization === specialization
        );
    }

    // Sort by fee
    if (sort === "low") {
        filteredLawyers.sort((a, b) => Number(a.fee || 0) - Number(b.fee || 0));
    }
    if (sort === "high") {
        filteredLawyers.sort((a, b) => Number(b.fee || 0) - Number(a.fee || 0));
    }

    // 4. PAGINATION CALCULATIONS
    const totalItems = filteredLawyers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get the start and end indexes for slicing the array
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the final array down to just the current page items
    const paginatedLawyers = filteredLawyers.slice(startIndex, endIndex);

    // Helper function to create pagination URL query strings while preserving search/filters
    const createPageURL = (pageNumber) => {
        const query = new URLSearchParams();
        if (search) query.set("search", search);
        if (specialization) query.set("specialization", specialization);
        if (sort) query.set("sort", sort);
        query.set("page", pageNumber);
        return `/browselawyers?${query.toString()}`;
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                            ⚖ Legal Experts Network
                        </p>

                        <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
                            Find Trusted Lawyers
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-300">
                            Browse verified lawyers by specialization, experience, and consultation fee.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
                        {totalItems} Experts Available
                    </div>
                </div>

                <div> <FilterLawyer /></div>

                {paginatedLawyers.length ? (
                    <>
                        {/* Grid displaying the PAGINATED array subset */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {paginatedLawyers.map((lawyer, index) => (
                                <article
                                    key={lawyer._id || index}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                                >
                                    <div className="relative h-60 w-full overflow-hidden">
                                        {lawyer.image && (
                                            <Image
                                                src={lawyer.image}
                                                alt={lawyer.name || "Lawyer Profile"}
                                                fill
                                                className="object-cover transition duration-500 group-hover:scale-110"
                                            />
                                        )}

                                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                                            {lawyer.specialization}
                                        </div>
                                    </div>

                                    <div className="space-y-4 p-5">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 dark:text-white">
                                                {lawyer.name}
                                            </h2>

                                            <p className="mt-2 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">
                                                {lawyer.bio}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                                            <div>
                                                <p className="text-xs font-medium uppercase text-slate-500">
                                                    Fee
                                                </p>
                                                <p className="text-lg font-extrabold">
                                                    ${lawyer.fee}
                                                </p>
                                            </div>

                                            <Link
                                                href={`/browselawyers/${lawyer._id}`}
                                                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white"
                                            >
                                                View Profile →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* 5. PAGINATION NAVIGATION CONTROLS */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                {/* Previous Page Button */}
                                <Link
                                    href={createPageURL(currentPage - 1)}
                                    className={`flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold shadow-sm transition dark:border-slate-700 dark:bg-slate-900 ${currentPage <= 1
                                        ? "pointer-events-none opacity-40"
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    ← Prev
                                </Link>

                                {/* Page Number Buttons */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                    <Link
                                        key={pageNumber}
                                        href={createPageURL(pageNumber)}
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold shadow-sm transition ${currentPage === pageNumber
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                            : "border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                                            }`}
                                    >
                                        {pageNumber}
                                    </Link>
                                ))}

                                {/* Next Page Button */}
                                <Link
                                    href={createPageURL(currentPage + 1)}
                                    className={`flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold shadow-sm transition dark:border-slate-700 dark:bg-slate-900 ${currentPage >= totalPages
                                        ? "pointer-events-none opacity-40"
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    Next →
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            No lawyers found
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            {search ? `No lawyer matches "${search}".` : "No lawyers available at the moment."}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Lawyers;