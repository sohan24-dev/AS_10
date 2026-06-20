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
    MessageCircle,
    ShieldCheck,
    Scale,
    GraduationCap,
    ChevronRight,
} from "lucide-react";

const fallbackBio = "This professional has not provided a summary yet.";

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-slate-500">
                <Icon size={16} className="text-slate-400" />
                {label}
            </span>
            <span className="text-right text-sm font-semibold text-slate-950">
                {value}
            </span>
        </div>
    );
}

function StatCard({ value, label }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-2xl font-bold text-slate-950">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
        </div>
    );
}

export default async function LawyerDetailsPage({ params }) {
    const { id } = await params;
    const lawyer = await getLawyerById(id);

    if (!lawyer) {
        return (
            <main className="flex min-h-[55vh] items-center justify-center bg-slate-50 px-5">
                <div className="rounded-lg border border-red-100 bg-white px-6 py-5 text-center shadow-sm">
                    <h2 className="text-lg font-semibold text-red-600">
                        Lawyer not found
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
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
        <main className="min-h-screen bg-slate-50">
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:grid-cols-[280px_1fr] md:py-10">
                    <aside className="space-y-4">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-100 shadow-sm">
                            <Image
                                src={lawyer.image || "/default-avatar.png"}
                                alt={lawyer.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 280px"
                                priority
                            />
                        </div>

                        <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                            <MessageCircle size={18} />
                            Message Lawyer
                        </button>
                    </aside>

                    <div className="flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${isAvailable
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-rose-50 text-rose-700"
                                    }`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${isAvailable
                                            ? "bg-emerald-500"
                                            : "bg-rose-500"
                                        }`}
                                />
                                {isAvailable ? "Available now" : "Currently busy"}
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                <ShieldCheck size={14} />
                                Verified profile
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <h1 className="text-3xl font-bold text-slate-950 md:text-5xl">
                                {lawyer.name}
                            </h1>
                            <BadgeCheck size={24} className="text-blue-600" />
                        </div>

                        <p className="mt-3 text-lg font-medium text-slate-600">
                            {lawyer.specialization}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                            <div className="flex items-center gap-2">
                                <Star
                                    size={18}
                                    className="fill-amber-400 text-amber-400"
                                />
                                <span className="font-bold text-slate-950">4.9</span>
                                <span className="text-slate-500">120 reviews</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500">
                                <Scale size={17} />
                                300+ cases handled
                            </div>

                            <div className="flex items-center gap-2 text-slate-500">
                                <BriefcaseBusiness size={17} />
                                10+ years experience
                            </div>
                        </div>

                        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
                            {bio}
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            <StatCard value={`$${lawyer.fee}`} label="Per session" />
                            <StatCard value="10+" label="Years experience" />
                            <StatCard value="300+" label="Cases handled" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1fr_340px]">
                <div className="space-y-8">
                    <nav className="flex gap-6 overflow-x-auto border-b border-slate-200 text-sm font-semibold text-slate-500">
                        <a
                            href="#about"
                            className="border-b-2 border-slate-950 pb-4 text-slate-950"
                        >
                            About
                        </a>
                        <a href="#services" className="pb-4 hover:text-slate-950">
                            Services
                        </a>
                        <a href="#reviews" className="pb-4 hover:text-slate-950">
                            Reviews
                        </a>
                        <a href="#education" className="pb-4 hover:text-slate-950">
                            Education
                        </a>
                    </nav>

                    <section id="about">
                        <h2 className="text-xl font-bold text-slate-950">
                            About {lawyer.name}
                        </h2>
                        <p className="mt-4 leading-8 text-slate-600">{bio}</p>
                    </section>

                    <section id="services">
                        <h2 className="text-xl font-bold text-slate-950">
                            Practice Focus
                        </h2>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {[
                                lawyer.specialization,
                                "Contract review",
                                "Legal consultation",
                                "Case strategy",
                            ].map((service) => (
                                <div
                                    key={service}
                                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
                                >
                                    <span className="font-medium text-slate-700">
                                        {service}
                                    </span>
                                    <ChevronRight size={16} className="text-slate-400" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="education">
                        <h2 className="text-xl font-bold text-slate-950">
                            Education
                        </h2>

                        <div className="mt-4 space-y-3">
                            <div className="rounded-lg border border-slate-200 bg-white p-5">
                                <div className="flex items-start gap-3">
                                    <GraduationCap
                                        size={20}
                                        className="mt-1 text-slate-500"
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-950">
                                            Harvard Law School
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            LL.M in Corporate Law
                                        </p>
                                        <p className="mt-2 text-xs font-semibold uppercase text-slate-400">
                                            2012
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-white p-5">
                                <div className="flex items-start gap-3">
                                    <GraduationCap
                                        size={20}
                                        className="mt-1 text-slate-500"
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-950">
                                            Yale University
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            LL.B
                                        </p>
                                        <p className="mt-2 text-xs font-semibold uppercase text-slate-400">
                                            2010
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
                    <h2 className="text-lg font-bold text-slate-950">
                        Profile Details
                    </h2>

                    <div className="mt-4 space-y-3">
                        <DetailItem
                            icon={Clock3}
                            label="Consultation Fee"
                            value={`$${lawyer.fee} / session`}
                        />
                        <DetailItem
                            icon={BriefcaseBusiness}
                            label="Experience"
                            value="10+ Years"
                        />
                        <DetailItem
                            icon={Globe}
                            label="Languages"
                            value="English, Spanish"
                        />
                        <DetailItem
                            icon={CalendarDays}
                            label="Joined"
                            value={joinDate}
                        />
                    </div>

                    <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                        <CalendarDays size={18} />
                        Book Consultation
                    </button>
                </aside>
            </section>
        </main>
    );
}