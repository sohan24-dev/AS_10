"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { Dropdown, Avatar, Label } from "@heroui/react";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";


import { authClient } from "@/lib/auth-client";

export default function UserAvatar() {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    const user = session?.user;
    // console.log(user);
    const dashboardRoutes = {
        admin: "/dashboard/admin",
        client: "/dashboard/user",
        lawyer: "/dashboard/lawyer",
    };

    const dashboardPath = dashboardRoutes[user?.role] || "/dashboard";
    // console.log(dashboardPath);
    const handleSignOut = async () => {
        await authClient.signOut();
    };

    const initials =
        user?.name
            ?.split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    // ❌ Not logged in UI
    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/auth/signin"
                    className="
            rounded-lg px-3 py-2 text-sm font-medium
            text-zinc-700 dark:text-zinc-300
            hover:bg-zinc-100 dark:hover:bg-white/10
            hover:text-zinc-900 dark:hover:text-white
            transition
        "
                >
                    Sign In
                </Link>

                <Link
                    href="/auth/signup"
                    className="
            rounded-lg px-3 py-2 text-sm font-semibold
            bg-zinc-900 text-white
            dark:bg-white dark:text-zinc-950
            hover:bg-zinc-700 dark:hover:bg-zinc-200
            transition
        "
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    // ✅ Logged in UI (HeroUI Dropdown)
    return (
        <Dropdown>
            {/* Trigger */}
            <Dropdown.Trigger className="rounded-full">
                <Avatar className="h-10 w-10 cursor-pointer overflow-hidden">
                    {user?.avatar ? (
                        <Avatar.Image
                            alt={user?.name}
                            src={user.avatar}
                        />
                    ) : (
                        <Avatar.Fallback>{initials}</Avatar.Fallback>
                    )}
                </Avatar>
            </Dropdown.Trigger>

            {/* Dropdown Content */}
            <Dropdown.Popover placement="bottom right">
                {/* User Info Header */}
                <div className="px-3 pt-3 pb-2 border-b border-white/10">
                    <p className="text-sm font-semibold text-white truncate">
                        {user?.name}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">
                        {user?.email}
                    </p>
                </div>

                {/* Menu */}
                <Dropdown.Menu>
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Link href={dashboardPath} className="flex w-full items-center gap-2">
                            <User size={16} />
                            <Label>Dashboard</Label>
                        </Link>
                    </Dropdown.Item>



                    <Dropdown.Item id="settings" textValue="Settings">
                        <div className="flex w-full items-center justify-between gap-2">
                            <Label>Settings</Label>
                            <Gear className="size-3.5 text-muted" />
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item id="team" textValue="Create Team">
                        <div className="flex w-full items-center justify-between gap-2">
                            <Label>Create Team</Label>
                            <Persons className="size-3.5 text-muted" />
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                        onClick={handleSignOut}
                    >
                        <div className="flex w-full items-center justify-between gap-2 text-red-400">
                            <Label>Log Out</Label>
                            <ArrowRightFromSquare className="size-3.5 text-red-400" />
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}