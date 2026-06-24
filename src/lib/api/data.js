export const getAllLawyers = async (search = "") => {
    // console.log(search);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/alllaywer?search=${search}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};
export const getAllComment = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment`,
            {
                cache: "no-store",
            });
        // console.log(res);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        // console.log(data);
        return data
    } catch (error) {
        // console.error(error);
    }
};

export const getAllUser = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
            {
                cache: "no-store",
            }
        );
        // console.log(res);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        // console.log(data);
        return data
    } catch (error) {
        // console.error(error);
    }
};
export const getAllhireList = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hirelawyer`);
        // console.log(res);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        // console.log(data);
        return data
    } catch (error) {
        // console.error(error);
    }
};






