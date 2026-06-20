import { getAllComment } from "@/lib/api/data";
import CommentTable from "./CommentTable";

const CommentPage = async () => {
    const comments = await getAllComment();

    console.log(comments, "comments");

    return (
        <div className="p-4">
            <CommentTable comments={comments} />
        </div>
    );
};

export default CommentPage;