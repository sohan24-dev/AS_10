import { getAllLawyers } from "@/lib/api/data";
import Image from "next/image";

const Lawyers = async () => {
    const lawyerdata = await getAllLawyers();

    return (
        <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

                {/* Header */}
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
                        {lawyerdata?.length || 0} Experts Available
                    </div>
                </div>

                {/* Grid */}
                {lawyerdata?.length ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {lawyerdata.map((lawyer, index) => (
                            <article
                                key={lawyer.id || index}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                            >

                                {/* Image */}
                                <div className="relative h-60 w-full overflow-hidden">
                                    <Image
                                        src={lawyer.image}
                                        alt={lawyer.name}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow backdrop-blur dark:bg-slate-800/80 dark:text-white">
                                        {lawyer.specialization}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 p-5">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition dark:text-white">
                                            {lawyer.name}
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3 dark:text-slate-300">
                                            {lawyer.bio}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">

                                        <div>
                                            <p className="text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
                                                Fee
                                            </p>
                                            <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                                                ${lawyer.fee}
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400"> / session</span>
                                            </p>
                                        </div>

                                        <button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg">
                                            View Profile →
                                        </button>
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
                            Try again later or add new legal experts.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Lawyers;