"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";

import { Button, Drawer, Separator } from "@heroui/react";
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

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-[#0B1220] dark:text-white">
                <div className="h-8 w-8 animate-spin border-2 border-black dark:border-white border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error || !session?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-[#0B1220] dark:text-white">
                Session unavailable
            </div>
        );
    }

    const user = session.user;
    const role = user.role || "Client";
    const links = dashboardLinks[role] || [];

    return (
        <div className="min-h-screen flex bg-white text-black dark:bg-[#0B1220] dark:text-white">

            {/* ✅ DESKTOP SIDEBAR */}
            <aside className="hidden md:flex w-72 flex-col bg-gray-100 text-black dark:bg-[#0F1629] dark:text-white border-r border-gray-200 dark:border-white/10">

                {/* USER INFO */}
                <div className="p-6 border-b border-gray-200 dark:border-white/10">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-white/50">
                        {user.email}
                    </p>
                </div>

                {/* LINKS */}
                <nav className="flex-1 p-3">
                    {links.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block mb-1 rounded-lg px-3 py-2 text-sm transition
                ${pathname === item.path
                                    ? "bg-gray-300 text-black dark:bg-white/10 dark:text-white"
                                    : "text-gray-600 hover:text-black hover:bg-gray-200 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* SIGN OUT */}
                <div className="p-4">
                    <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 text-sm text-red-500 px-3 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10"
                    >
                        <LogOut size={16} />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* ✅ MAIN AREA */}
            <div className="flex-1 flex flex-col">

                {/* ✅ MOBILE TOP BAR */}
                <div className="md:hidden flex items-center justify-between px-4 h-14 bg-gray-100 text-black dark:bg-[#0F1629] dark:text-white border-b border-gray-200 dark:border-white/10">

                    <p className="font-semibold">Dashboard</p>

                    {/* MOBILE MENU */}
                    <Drawer>
                        <Button isIconOnly variant="flat">
                            <Menu size={20} />
                        </Button>

                        <Drawer.Backdrop>
                            <Drawer.Content placement="left">
                                <Drawer.Dialog>

                                    <Drawer.CloseTrigger />

                                    {/* USER INFO */}
                                    <Drawer.Header>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-white/50">
                                            {user.email}
                                        </p>
                                    </Drawer.Header>

                                    <Drawer.Body>
                                        <Separator />

                                        {/* LINKS */}
                                        <div className="flex flex-col gap-1 mt-3">
                                            {links.map((item) => (
                                                <button
                                                    key={item.path}
                                                    onClick={() => router.push(item.path)}
                                                    className={`text-left px-3 py-2 rounded-lg text-sm transition
                            ${pathname === item.path
                                                            ? "bg-gray-300 text-black dark:bg-white/10 dark:text-white"
                                                            : "text-gray-600 hover:bg-gray-200 dark:text-white/60 dark:hover:bg-white/5"
                                                        }`}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>

                                        <Separator className="my-3" />

                                        {/* SIGN OUT */}
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 text-sm text-red-500 px-3 py-2"
                                        >
                                            <LogOut size={16} />
                                            Sign out
                                        </button>
                                    </Drawer.Body>

                                </Drawer.Dialog>
                            </Drawer.Content>
                        </Drawer.Backdrop>
                    </Drawer>
                </div>

                {/* ✅ CONTENT */}
                <main className="p-4 md:p-8 bg-white text-black dark:bg-[#0B1220] dark:text-white">
                    <h1 className="text-xl font-bold">
                        Welcome, {user.name}
                    </h1>
                </main>

            </div>
        </div>
    );
}