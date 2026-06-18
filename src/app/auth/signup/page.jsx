
"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const { name, email, password } = Object.fromEntries(formData.entries());

        // console.log(name, email, password);

        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/dashboard",
            });

            if (error) {
                console.log("SIGNUP ERROR:", error);
                toast.error(error?.message || "Failed to create account");
                return;
            }

            toast.success("Account created successfully!");
            console.log("User:", data);

        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);

            toast.loading("Redirecting to Google...", {
                id: "google-login",
            });

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            toast.dismiss("google-login");
        } catch (error) {
            console.error(error);

            toast.dismiss("google-login");
            toast.error(error?.message || "Google login failed");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>
                    <p className="mt-2 text-zinc-400">
                        Join our platform and get started today.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">
                                Full Name
                            </label>

                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                                />

                                <input
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">
                                Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                                />

                                <input
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                                />

                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3 pl-11 pr-12 text-white outline-none transition focus:border-blue-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-zinc-500">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-zinc-900 py-3 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                            />
                        </svg>

                        {googleLoading
                            ? "Redirecting..."
                            : "Continue with Google"}
                    </button>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="font-medium text-white hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

