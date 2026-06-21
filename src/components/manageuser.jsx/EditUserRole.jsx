"use client";

import { useState } from "react";
import { updateUser } from "@/lib/actions.js/user";
import { Select, Label, ListBox } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const EditUserRole = ({ user }) => {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    console.log(session.user.role);
    const [role, setRole] = useState(user?.role || "");
    const router = useRouter();

    const handleUpdateRole = async (newRole) => {
        // Convert the key to a string if HeroUI returns a Set or object
        const selectedRole = typeof newRole === "object" && newRole.currentKey
            ? newRole.currentKey
            : String(newRole);

        if (!selectedRole) return;

        // Optimistically update the local state so the UI feels fast
        setRole(selectedRole);

        try {
            await updateUser(user._id, { role: selectedRole });
            toast.success("Updated role successfully");
            router.refresh();
            if (session.user.role !== 'admin') {
                window.location.reload();
            }

            // console.log("Role updated successfully to:", selectedRole);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error(error?.message || "Failed to update role");
            // Revert state back to original value if the API fails
            setRole(user?.role || "");
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* ROLE SELECT */}
            <Select
                className="w-[200px]"
                placeholder="Select role"
                selectedKey={role}
                onSelectionChange={handleUpdateRole} // Fires immediately on change
            >
                <Label>Role Change</Label>

                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="admin" textValue="Admin">
                            Admin
                            <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="client" textValue="User">
                            User
                            <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="lawyer" textValue="Lawyer">
                            Lawyer
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
};

export default EditUserRole;