
export const getAllLawyers = async () => {
    try {
        const res = await fetch("http://localhost:5000/alllaywer");
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