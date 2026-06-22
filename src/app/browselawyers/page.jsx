import { getAllLawyers } from "@/lib/api/data";
import Image from "next/image";
import Link from "next/link";

const Lawyers = async ({ searchParams }) => {
    const lawyerdata = await getAllLawyers();

    const searchText = await searchParams;
    const search = searchText?.search?.toLowerCase();
    // console.log(searchParams);
    // console.log(search);

    const filteredLawyers = lawyerdata.filter((lawyer) =>
        lawyer.name?.toLowerCase().includes(search) ||
        lawyer.specialization?.toLowerCase().includes(search)
    );

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
                        {filteredLawyers.length} Experts Available
                    </div>
                </div>

                {filteredLawyers.length ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredLawyers.map((lawyer, index) => (
                            <article
                                key={lawyer._id || index}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                            >
                                <div className="relative h-60 w-full overflow-hidden">
                                    <Image
                                        src={lawyer.image}
                                        alt={lawyer.name}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                    />

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
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            No lawyers found
                        </h2>

                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            No lawyer matches {search}.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Lawyers;