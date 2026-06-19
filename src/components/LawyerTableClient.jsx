"use client";

import Image from "next/image";
import { useState } from "react";

export default function ServiceTable({ data = [] }) {
    const services = data;



    return (
        <div className="w-full">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground">
                        Services
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your available services and fees
                    </p>
                </div>

                <span className="w-fit rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
                    {services.length} services
                </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left">
                        <thead className="border-b border-border bg-muted">
                            <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Service
                                </th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Specialization
                                </th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Fee
                                </th>
                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {services.length > 0 ? (
                                services.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="transition hover:bg-muted/50"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-4">

                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={56}
                                                    height={56}
                                                    className="h-14 w-14 rounded-lg border border-border object-cover"
                                                />

                                                <div>
                                                    <p className="font-semibold text-foreground">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
                                                {item.specialization}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="font-semibold text-foreground">
                                                ${item.fee}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    className="rounded-lg cursor-pointer border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="rounded-lg cursor-pointer bg-red-500/10 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/20"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-5 py-12 text-center"
                                    >
                                        <p className="font-medium text-foreground">
                                            No services found
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Add a service to display it here.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}