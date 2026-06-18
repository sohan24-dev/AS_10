

import { authClient } from "@/lib/auth-client";

export function getUserSession() {
    const {
        data: session,
    } = authClient.useSession()

    return {
        session,
    };
}