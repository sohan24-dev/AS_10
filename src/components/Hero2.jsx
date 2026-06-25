import Image from "next/image";
import Link from "next/link";
import { getAllLawyers } from "@/lib/api/data";

const Hero2 = async () => {
    const alldata = await getAllLawyers();
    const lawyers = alldata?.lawyers?.slice(0, 3) || [];

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-10 text-center">
                    <p className="text-blue-600 font-semibold uppercase tracking-wider">
                        ⚖ Featured Lawyers
                    </p>
                    <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                        Top Legal Experts
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">
                        Connect with experienced and verified lawyers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lawyers.map((lawyer) => (
                        <article
                            key={lawyer._id}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                                    {lawyer.specialization}
                                </div>
                            </div>

                            <div className="p-5 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                                        {lawyer.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                                        {lawyer.bio}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
                                    <div>
                                        <p className="text-xs uppercase text-slate-500">
                                            Consultation Fee
                                        </p>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white">
                                            ${lawyer.fee}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/browselawyers/${lawyer._id}`}
                                        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90"
                                    >
                                        View Profile →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/browselawyers"
                        className="inline-flex items-center rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                        View All Lawyers →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero2;