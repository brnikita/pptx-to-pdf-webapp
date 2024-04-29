// DownloadFileStep/index.tsx
import { FC } from 'react';
import axios from 'axios';
import { Step } from '@/components/PowerpointToPDFConverter';

type DownloadFileStepProps = {
  fileId: string; // Changed from result object to fileId string
  setStep: (step: Step) => void;
};

export const DownloadFileStep: FC<DownloadFileStepProps> = ({ fileId, setStep }) => {
  // Ensuring fileId is present
  if (!fileId) {
    setStep(Step.ChooseFile);
    return null;
  }

  const downloadFile = async () => {
    try {
      const DOWNLOAD_API_URL = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/get_converted_file/${fileId}`;
      const response = await axios.get(DOWNLOAD_API_URL, {
        responseType: 'blob', // Important for large files and binary content like PDFs
      });

      // Create a URL for the blob to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `converted-${fileId}.pdf`); // Custom file name
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link); // Cleanup
    } catch (error) {
      console.error("Couldn't download the file:", error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">File converted successfully!</p>
        <p className="text-sm text-gray-600">
          Click the button below to download your PDF file.
        </p>
      </div>
      <div className="flex w-full gap-3">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm"
          onClick={() => setStep(Step.ChooseFile)}
        >
          Convert another
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm"
          onClick={downloadFile}
          id="download-button"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};