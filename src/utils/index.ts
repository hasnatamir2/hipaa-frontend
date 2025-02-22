export const BytesFormatter = (sizeInBytes: number) => {
    if (sizeInBytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const k = 1024;
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    const size = (sizeInBytes / Math.pow(k, i)).toFixed(2);

    return `${size} ${units[i]}`;
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


export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}