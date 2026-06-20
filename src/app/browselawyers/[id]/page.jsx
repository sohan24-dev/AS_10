import React from "react";
import Image from "next/image";
import { getLawyerById } from "@/lib/actions.js/action";

import {
    BadgeCheck,
    Star,
    Clock3,
    Globe,
    BriefcaseBusiness,
    CalendarDays,
    ShieldCheck,
    Scale,
    GraduationCap,
    ChevronRight,
    MessageCircle,
} from "lucide-react";

import { CircleCheckFill } from "@gravity-ui/icons";
import AllComment from "@/components/AllComment";
import CommentClient from "@/components/CommentClient";

const fallbackBio = "This professional has not provided a summary yet.";

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 transition hover:border-slate-300 hover:shadow-sm">
            <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Icon size={16} className="text-slate-400 dark:text-slate-500" />
                {label}
            </span>

            <span className="text-right text-sm font-semibold text-slate-950 dark:text-slate-100">
                {value}
            </span>
        </div>
    );
}

function StatCard({ value, label }) {
    return (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
            <p className="text-2xl font-bold text-slate-950 dark:text-slate-100">{value}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
        </div>
    );
}

export default async function LawyerDetailsPage({ params }) {
    const { id } = await params;
    const lawyer = await getLawyerById(id);
    if (!lawyer) {
        return (
            <main className="flex min-h-[55vh] items-center justify-center bg-slate-50 dark:bg-slate-900 px-5">
                <div className="rounded-lg border border-red-100 dark:border-red-900 bg-white dark:bg-slate-800 px-6 py-5 text-center shadow-sm">
                    <h2 className="text-lg font-semibold text-red-600">
                        Lawyer not found
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Please check the profile link and try again.
                    </p>
                </div>
            </main>
        );
    }

    const joinDate = lawyer.createdAt
        ? new Date(lawyer.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "N/A";

    const isAvailable = lawyer.status === "Available";
    const bio = lawyer.bio || fallbackBio;

    return (
        <main className="min-h-screen overflow-x-hidden border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">

            {/* TOP SECTION */}
            <section className="border-b max-w-6xl mx-auto px-4 border-slate-200 dark:border-slate-700">
                <div className="w-full grid gap-8 px-4 sm:px-6 py-6 sm:py-10 md:grid-cols-[280px_1fr]">

                    {/* LEFT */}
                    <aside className="space-y-4">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-sm">
                            <Image
                                src={lawyer.image || "/default-avatar.png"}
                                alt={lawyer.name}
                                fill
                                className="object-cover"
                                sizes="280px"
                                priority
                            />
                        </div>

                        <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                            <CircleCheckFill size={18} />
                            Hire Lawyer
                        </button>
                    </aside>

                    {/* RIGHT */}
                    <div className="flex flex-col justify-center">

                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Available now
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                <ShieldCheck size={14} />
                                Verified profile
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-950 dark:text-slate-100">
                                {lawyer.name}
                            </h1>
                            <BadgeCheck size={24} className="text-blue-600" />
                        </div>

                        <p className="mt-3 text-lg font-medium text-slate-600 dark:text-slate-300">
                            {lawyer.specialization}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-700 dark:text-slate-300">
                            <div className="flex items-center gap-2">
                                <Star size={18} className="fill-amber-400 text-amber-400" />
                                <span className="font-bold text-slate-950 dark:text-slate-100">4.9</span>
                                <span>120 reviews</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Scale size={17} />
                                300+ cases handled
                            </div>

                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness size={17} />
                                10+ years experience
                            </div>
                        </div>

                        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                            {bio}
                        </p>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <StatCard value={`$${lawyer.fee}`} label="Per session" />
                            <StatCard value="10+" label="Years experience" />
                            <StatCard value="300+" label="Cases handled" />
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN */}
            <section className="max-w-6xl mx-auto px-4">

                <div className="space-y-8">

                    <section id="about">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-slate-100">
                            About {lawyer.name}
                        </h2>
                        <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{bio}</p>
                    </section>

                    <div className="h-fit rounded-lg border border-slate-200 dark:border-slate-700 sm:p-5 shadow-sm bg-white dark:bg-slate-800">
                        <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100">
                            Profile Details
                        </h2>

                        <div className="mt-4 space-y-3">
                            <DetailItem icon={Clock3} label="Consultation Fee" value={`$${lawyer.fee} / session`} />
                            <DetailItem icon={BriefcaseBusiness} label="Experience" value="10+ Years" />
                            <DetailItem icon={Globe} label="Languages" value="English, Spanish" />
                            <DetailItem icon={CalendarDays} label="Joined" value={joinDate} />
                        </div>
                    </div>

                    <section id="services">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-slate-100">
                            Practice Focus
                        </h2>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {[lawyer.specialization, "Contract review", "Legal consultation", "Case strategy"].map((service) => (
                                <div
                                    key={service}
                                    className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 hover:shadow-sm bg-white dark:bg-slate-800"
                                >
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{service}</span>
                                    <ChevronRight size={16} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="education">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-slate-100">Education</h2>

                        <div className="mt-4 space-y-3">
                            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
                                <div className="flex items-start gap-3">
                                    <GraduationCap size={20} className="mt-1 text-slate-500 dark:text-slate-400" />
                                    <div>
                                        <h3 className="font-bold">Harvard Law School</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">LL.M in Corporate Law</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">2012</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
                                <div className="flex items-start gap-3">
                                    <GraduationCap size={20} className="mt-1 text-slate-500 dark:text-slate-400" />
                                    <div>
                                        <h3 className="font-bold">Yale University</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">LL.B</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">2010</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* REVIEWS */}
                    <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-5 shadow-sm">




                        <CommentClient lawyer={lawyer} id={id} />


                        <div className="mt-6 space-y-4">
                            <h3 className="font-bold text-slate-950 dark:text-slate-100">Recent comments</h3>
                            <AllComment id={id} />
                        </div>

                    </section>

                </div>

            </section>
        </main>
    );
}