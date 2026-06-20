import { getAllComment } from "@/lib/api/data";

const AllComment = async ({ id }) => {
    const allComment = await getAllComment();

    const filteredComments = allComment.filter(
        (comment) => comment.lawyerId === id
    );

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Comments
            </h2>

            {filteredComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-2xl bg-gray-50 dark:bg-slate-900 dark:border-slate-700">
                    <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                    </svg>

                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        No comments yet
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Be the first one to share feedback.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredComments.map((comment) => (
                        <div
                            key={comment._id}
                            className="p-4 rounded-xl border bg-white dark:bg-slate-800 dark:border-slate-700 shadow-sm"
                        >
                            <p className="text-gray-700 dark:text-gray-200">
                                {comment.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllComment;