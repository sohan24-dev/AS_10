"use client";

import toast from "react-hot-toast";
import { handleCommentPost } from "@/lib/actions.js/comments";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Star } from "@gravity-ui/icons";
import { MessageCircle } from "lucide-react";

export default function CommentClient({ id, lawyer }) {
    const {
        data: session,
        isPending,
    } = authClient.useSession();

    const router = useRouter();

    const handlecomment = async (e) => {
        e.preventDefault();
        // console.log(lawyer);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const result = await handleCommentPost({
                lawyerId: id,
                lawyername: lawyer.name,
                lawyerimage: lawyer.image,
                lawyerspecilization: lawyer.specialization,
                date: new Date(),
                comment: data.comment,
                email: session?.user?.email,
            });

            toast.success(result?.message || "Comment posted successfully");
            e.target.reset();
            router.refresh();
        } catch (error) {
            toast.error(error?.message || "Failed to post comment");
        }
    };
    if (session?.user?.role === "lawyer") return null;

    return (
        <div>
            <div className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-700 pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                        <MessageCircle size={16} />
                        Client feedback
                    </div>

                    <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-100">Reviews & Comments</h2>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-3">
                    <Star size={20} className="fill-amber-400 text-amber-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-950 dark:text-slate-100">4.9 out of 5</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Based on 120 reviews</p>
                    </div>
                </div>

            </div>
            <form
                onSubmit={handlecomment}
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm"
            >
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Leave a Comment
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Share your thoughts or ask a question.
                    </p>
                </div>

                <div className="space-y-4">
                    <textarea
                        name="comment"
                        rows={4}
                        placeholder="Write your comment here..."
                        required
                        className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                    />

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-sm"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}