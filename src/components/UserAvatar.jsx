"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { Dropdown, Avatar, Label } from "@heroui/react";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";

import { getUserSession } from "@/lib/getUserSession";
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
                    className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                    Sign In
                </Link>

                <Link
                    href="/auth/signup"
                    className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
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
                        <Link href="/dashboard" className="flex w-full items-center gap-2">
                            <User size={16} />
                            <Label>Dashboard</Label>
                        </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                        <Label>Profile</Label>
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