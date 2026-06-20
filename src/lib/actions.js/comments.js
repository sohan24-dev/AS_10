export const handleCommentPost = async (comment) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to post comment");
    }

    const data = await res.json();
    return data;
};