export const ConvertBytesToKbs = (bytes: number) => {
    return (bytes / 1024).toFixed(2);
};

export const getMimeType = (fileType: string) => {
    switch (fileType) {
        case "pdf":
            return "application/pdf";
        case "docx":
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case "jpg":
            return "image/jpeg";
        case "png":
            return "image/png";
        default:
            return "application/octet-stream";
    }
};
