import { requireRole } from "@/lib/getUserSession";

const ClientPage = async ({ children }) => {
    // await requireRole('client');
    return children;
};
export default ClientPage