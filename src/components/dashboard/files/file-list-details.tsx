import { BytesFormatter } from "@/utils";
import { Box } from "@mui/material";

const FileListDetails = ({
    lastModified,
    size,
}: {
    lastModified: string;
    size: number;
}) => {
    const lastModifiedDate = new Date(lastModified);

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>
                Last Modified: {lastModifiedDate.getDate()}/
                {lastModifiedDate.getMonth() + 1}/
                {lastModifiedDate.getFullYear()}
            </span>
            <span>Size: {BytesFormatter(size)} KB</span>
        </Box>
    );
};

export default FileListDetails;