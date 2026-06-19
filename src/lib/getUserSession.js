import "server-only";

import { auth } from "./auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })
    // console.log("User session:", session?.session.token, session?.user);

    return session?.user || null;
}



export const requireRole = async (role) => {
    const user = await getUserSession()
    console.log(user);
    if (!user) {
        redirect('/auth/signin')
    }
    if (user?.role !== role) {
        redirect('/unauthorized')
    }
    return user;
}