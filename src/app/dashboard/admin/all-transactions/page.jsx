import { Table } from "@heroui/react";
import { getAllPay } from "@/lib/api/data";
import React from "react";

const AllTransactions = async () => {
    const allPayData = await getAllPay();
    console.log(allPayData);

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return "$0";

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Transactions</h1>

            <Table aria-label="Transactions Table">
                <Table.ScrollContainer>
                    <Table.Content className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>
                                Transaction ID
                            </Table.Column>
                            <Table.Column>User/Lawyer Email</Table.Column>
                            <Table.Column>Amount</Table.Column>
                            <Table.Column>Date</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {allPayData?.map((tx, index) => (
                                <Table.Row key={tx._id || index}>
                                    <Table.Cell className="font-medium text-gray-500">
                                        {`TXN${String(index + 1).padStart(3, "0")}`}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {tx.clientEmail || tx.lawyerEmail}
                                    </Table.Cell>

                                    <Table.Cell className="font-semibold">
                                        {formatCurrency(tx.amount)}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {formatDate(tx.paidAt || tx.createdAt)}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default AllTransactions;