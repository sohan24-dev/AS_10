
export const getAllLawyers = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/alllaywer`);
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
export const getAllComment = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment`);
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