import { getAllLawyers } from "@/lib/api/data";
import LawyerTableClient from "./LawyerTableClient";
import { authClient } from "@/lib/auth-client";

export default async function LawyerTable() {
    const data = await getAllLawyers();
    const { data: session, error } = await authClient.getSession()
    console.log(session);

    return <LawyerTableClient data={data} />;
}