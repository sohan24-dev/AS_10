"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, LogOut } from "lucide-react";

import {
    Bars
} from "@gravity-ui/icons";

import {
    Button,
    Dropdown,
    Header,
    Description,
    Label,
    Separator
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const dashboardLinks = {
    Client: [
        { label: "Hiring History", path: "/dashboard/user/hiring-history" },
        { label: "Update Profile", path: "/dashboard/user/update-profile" },
        { label: "Comments", path: "/dashboard/user/comments" },
    ],
};

export default function DashboardPage() {
    const router = useRouter();
    const pathname = usePathname();

    const { data: session, isPending, error } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin border-2 border-black border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error || !session?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Session unavailable
            </div>
        );
    }

    const user = session.user;
    const role = user.role || "Client";
    const links = dashboardLinks[role] || [];

    return (
        <div className="min-h-screen flex">

            {/* ✅ DESKTOP SIDEBAR ONLY */}
            <aside className="hidden md:flex w-72 flex-col bg-[#0F1629] text-white">
                <div className="p-6 border-b border-white/10">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-white/50">{user.email}</p>
                </div>

                <nav className="flex-1 p-3">
                    {links.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block mb-1 rounded-lg px-3 py-2 text-sm ${pathname === item.path
                                ? "bg-white/10 text-white"
                                : "text-white/60 hover:text-white"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4">
                    <button
                        onClick={async () => {
                            await authClient.signOut();
                            router.push("/");
                        }}
                        className="flex w-full items-center gap-2 text-sm text-white/60 hover:text-white"
                    >
                        <LogOut size={16} />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* ✅ MOBILE + DESKTOP MAIN AREA */}
            <div className="flex-1 flex flex-col">

                {/* ✅ MOBILE TOP NAVBAR (ALWAYS VISIBLE ON SMALL SCREEN) */}
                <div className="md:hidden flex items-center justify-between bg-[#0F1629] text-white px-4 h-14">
                    <p className="font-semibold">Dashboard</p>

                    <Dropdown>
                        <Button
                            isIconOnly
                            className="lg:hidden"
                            variant="flat"
                            aria-label="Open dashboard menu"
                        >
                            <Menu size={20} />
                        </Button>

                        <Dropdown.Popover>
                            <Dropdown.Menu
                                aria-label="Dashboard navigation"
                                onAction={(key) => {
                                    if (key === "logout") {
                                        handleSignOut();
                                        return;
                                    }

                                    router.push(String(key));
                                }}
                            >

                                <Separator />

                                <Dropdown.Section className="mt-6">
                                    {links.map((item) => (
                                        <Dropdown.Item key={item.path} id={item.path}>
                                            <Label>{item.label}</Label>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Section>

                                <Separator />

                                <Dropdown.Item id="logout" variant="danger">
                                    <Label>Sign out</Label>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>

                {/* MAIN CONTENT */}
                <main className="p-4 md:p-8">
                    <h1 className="text-xl font-bold">
                        Welcome, {user.name}
                    </h1>
                </main>
            </div>
        </div>
    );
}