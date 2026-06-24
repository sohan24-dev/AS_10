"use client";

import { addhirelawyer } from "@/lib/actions.js/Lawyer";
import { authClient } from "@/lib/auth-client";
import { CircleCheckFill } from "@gravity-ui/icons";
import toast from "react-hot-toast";

const Hirelawyer = ({ hirelawyer }) => {

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    // console.log(session);
    // console.log(hirelawyer._id);

    const handleHireLawyer = async () => {
        try {
            const formData = {
                status: "pending",
                _id: hirelawyer._id,
                specialization: hirelawyer.specialization,
                lawyerName: hirelawyer.name,
                fee: hirelawyer.fee,
                date: new Date().toISOString(),
                clientName: session?.user?.name,
                clientEmail: session?.user?.email,
                lawyerEmail: hirelawyer.email,
                pay: "Pay unable"
            };

            const res = await addhirelawyer(formData);

            if (res) {
                toast.success("Lawyer hired successfully");
            }
        } catch (error) {
            toast.error("You already Hired");
            // console.error(error);
        }
    };

    return (
        <button
            onClick={handleHireLawyer}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
        >
            <CircleCheckFill size={18} />
            Hire Lawyer
        </button>
    );
};

export default Hirelawyer;