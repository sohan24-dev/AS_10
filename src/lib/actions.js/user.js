export const deleteuser = async (id) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${id}`,
            {
                method: "DELETE",
            }
        );

        return await res.json();
    } catch (error) {
        // console.error("Delete Lawyer Error:", error);
        throw error;
    }
};







export const updateUser = async (id, updatedData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        }
    );

    if (!res.ok) {
        throw new Error("Update failed");
    }

    return await res.json();
};