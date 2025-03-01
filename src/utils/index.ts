import { format } from "date-fns";
import jpg from '@/public/icons/jpg.png'
import png from '@/public/icons/png.png'
import pdf from '@/public/icons/pdf.png'
import txt from '@/public/icons/txt.png'
import docx from '@/public/icons/docx.png'

export const BytesFormatter = (sizeInBytes: number) => {
    if (sizeInBytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const k = 1024;
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    const size = (sizeInBytes / Math.pow(k, i)).toFixed(2);

    return `${size} ${units[i]}`;
};

export const getFileType = (fileType: string) => {
    switch (fileType) {
        case "application/pdf":
            return "pdf";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx";
        case "image/jpg":
            return "jpg";
        case "image/png":
            return "png";
        default:
            return "txt";
    }
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const generateFileMetadata = (file: any) => {
    const lastModifiedDateTime = format(
        file.lastModified,
        "yyyy/MM/dd hh:mm a"
    );

    return `Last Modified: ${lastModifiedDateTime}, Size: ${BytesFormatter(
        file.size
    )}`;
};

export const filIcon = new Map([
    ['image/jpeg', jpg],
    ['image/jpg', jpg],
    ['image/png', png],
    ['application/pdf', pdf],
    ['text/plain', txt],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', docx]
])