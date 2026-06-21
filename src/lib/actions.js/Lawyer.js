export const addhirelawyer = async (formData) => {
    // console.log(formData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hirelawyer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error("Failed to add data");
    }

    const resdata = await res.json();
    // console.log(resdata);
    return resdata;
};