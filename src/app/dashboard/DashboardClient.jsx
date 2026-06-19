"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export const dashboardLinks = {
    Client: [
        { label: "Hiring History", path: "/dashboard/user/hiring-history" },
        { label: "Update Profile", path: "/dashboard/user/update-profile" },
        { label: "Comments", path: "/dashboard/user/comments" },
    ],
    Lawyer: [
        { label: "Hiring Requests", path: "/dashboard/lawyer/hiring-history" },
        { label: "Manage Legal Profile", path: "/dashboard/lawyer/manage-legal-profile" },
    ],
    admin: [
        { label: "Manage Users", path: "/dashboard/admin/manage-users" },
        { label: "All Transactions", path: "/dashboard/admin/all-transactions" },
        { label: "Analytics", path: "/dashboard/admin/analytics" },
    ],
};

export default function DashboardClient({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    const { data: session, isPending, error } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

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
        <div className="min-h-screen flex bg-white text-black dark:bg-[#0B1220] dark:text-white">

            {/* SIDEBAR */}
            <aside className="hidden md:flex w-72 flex-col bg-gray-100 dark:bg-[#0F1629] border-r">

                <div className="p-6 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <nav className="flex-1 p-3">
                    {links.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block px-3 py-2 rounded-lg text-sm mb-1
              ${pathname === item.path
                                    ? "bg-gray-300 dark:bg-white/10"
                                    : "hover:bg-gray-200 dark:hover:bg-white/5"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-red-500 text-sm cursor-pointer"
                    >
                        <LogOut size={16} />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col">

                {/* MOBILE BAR */}
                <div className="md:hidden flex items-center justify-between px-4 h-14 border-b">
                    <p className="font-semibold">Dashboard</p>
                </div>

                {/* CHILDREN */}
                <main className="p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}