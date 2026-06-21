import { Table } from "@heroui/react";

const HireTable = ({ hireHistory }) => {
    // console.log(hireHistory);
    // Helper to dynamically style the badges based on status
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return "bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full text-xs font-medium border";
            case "rejected":
                return "bg-red-50 text-red-700 border-red-200 px-3 py-1 rounded-full text-xs font-medium border";
            case "pending":
            default:
                return "bg-amber-50 text-amber-700 border-amber-200 px-3 py-1 rounded-full text-xs font-medium border";
        }
    };

    return (
        <Table variant="secondary">
            <Table.ScrollContainer>
                <Table.Content aria-label="Lawyer hiring history" className="min-w-[600px]">
                    <Table.Header>
                        <Table.Column isRowHeader>Lawyer Name</Table.Column>
                        <Table.Column>Specialisation</Table.Column>
                        <Table.Column>Fee</Table.Column>
                        <Table.Column>Hiring Date</Table.Column>
                        <Table.Column>Status</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {hireHistory.map((item, index) => (
                            <Table.Row key={item._id || index}>
                                {/* Adjust item properties based on your exact database fields */}
                                <Table.Cell className="font-medium text-slate-700">
                                    {item.lawyerName}
                                </Table.Cell>
                                <Table.Cell className="text-slate-600">
                                    {item.specialization || item.specialty}
                                </Table.Cell>
                                <Table.Cell className="text-slate-700 font-medium">
                                    ${item.fee}
                                </Table.Cell>
                                <Table.Cell className="text-slate-500">
                                    {new Date(item.date).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <span className={getStatusStyle(item.status)}>
                                        {item.status}
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