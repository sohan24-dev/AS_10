import { Table } from "@heroui/react";

const HireTable = ({ hireHistory }) => {
    // Status badge styles with dark mode support
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 px-3 py-1 rounded-full text-xs font-medium border";

            case "rejected":
                return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 px-3 py-1 rounded-full text-xs font-medium border";

            case "pending":
            default:
                return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700 px-3 py-1 rounded-full text-xs font-medium border";
        }
    };

    // Pay badge styles with dark mode support
    const getPayStyle = (pay) => {
        switch (pay?.toLowerCase()) {
            case "able":
                return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 px-3 py-1 rounded-full text-xs font-medium border cursor-pointer";

            default:
                return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 px-3 py-1 rounded-full text-xs font-medium border";
        }
    };

    return (
        <Table variant="secondary">
            <Table.ScrollContainer>
                <Table.Content
                    aria-label="Lawyer hiring history"
                    className="min-w-[600px] bg-white dark:bg-slate-900"
                >
                    <Table.Header>
                        <Table.Column isRowHeader className="dark:text-slate-200">
                            Lawyer Name
                        </Table.Column>
                        <Table.Column className="dark:text-slate-200">
                            Specialisation
                        </Table.Column>
                        <Table.Column className="dark:text-slate-200">
                            Fee
                        </Table.Column>
                        <Table.Column className="dark:text-slate-200">
                            Hiring Date
                        </Table.Column>
                        <Table.Column className="dark:text-slate-200">
                            Status
                        </Table.Column>
                        <Table.Column className="dark:text-slate-200">
                            Action
                        </Table.Column>
                    </Table.Header>

                    <Table.Body>
                        {hireHistory?.map((item, index) => (
                            <Table.Row key={item._id || index}>
                                <Table.Cell className="font-medium text-slate-700 dark:text-slate-200">
                                    {item.lawyerName}
                                </Table.Cell>

                                <Table.Cell className="text-slate-600 dark:text-slate-300">
                                    {item.specialization || item.specialty}
                                </Table.Cell>

                                <Table.Cell className="text-slate-700 dark:text-slate-200 font-medium">
                                    ${item.fee}
                                </Table.Cell>

                                <Table.Cell className="text-slate-500 dark:text-slate-400">
                                    {item.date
                                        ? new Date(item.date).toLocaleDateString()
                                        : "N/A"}
                                </Table.Cell>

                                <Table.Cell>
                                    <span className={getStatusStyle(item.status)}>
                                        {item.status}
                                    </span>
                                </Table.Cell>

                                <Table.Cell>
                                    <span className={getPayStyle(item.pay)}>
                                        {item.pay}
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default HireTable;