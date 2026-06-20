import { getAllLawyers } from "@/lib/api/data";
import LawyerTableClient from "./LawyerTableClient";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function LawyerTable() {
    const data = await getAllLawyers();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userEmail = session?.user?.email;

    const filteredData = userEmail
        ? data.filter((lawyer) => lawyer.email === userEmail)
        : [];

    return (
        <LawyerTableClient data={filteredData} />
    );
}