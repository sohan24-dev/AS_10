"use client"

import { authClient } from '@/lib/auth-client';
import React from 'react';

const ClientPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Welcome, {user?.name}
            </h1>

            <p className="text-gray-500 mt-2">
                This is your dashboard overview page.
            </p>
        </div>
    );
};

export default ClientPage;