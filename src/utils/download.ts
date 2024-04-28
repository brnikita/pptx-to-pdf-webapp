export const triggerDownload = (url: string, fileName?: string) => {
    const sanitizedFileName = fileName || getFileNameFromUrl(url) || 'file';
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', sanitizedFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const getFileNameFromUrl = (url: string) => new URL(url).pathname.split('/').pop();
