import { FC } from 'react';
import { Step } from '@/components/PowerpointToPDFConverter';
import { PDFIcon } from '@/components/icons/PDFIcon';

type FileId = {
  file_id: string; 
  status: string;
};

type DownloadFileStepProps = {
  filesIds: FileId[];
  setStep: (step: Step) => void;
};

export const DownloadFileStep: FC<DownloadFileStepProps> = ({ filesIds, setStep }) => {
  if (!filesIds || filesIds.length === 0) {
    setStep(Step.ChooseFile);
    return null;
  }

  // Assuming the file is directly accessible using a URL
  const fileId = filesIds[0].file_id;
  const DOWNLOAD_API_URL = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/get_converted_file/${fileId}`;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col rounded-lg border border-gray-300 p-4 text-center place-items-center">
        <PDFIcon />
        <p className="text-lg font-semibold text-gray-800">File converted successfully!</p>
      </div>
      <div className="flex w-full gap-3">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm"
          onClick={() => setStep(Step.ChooseFile)}
        >
          Convert another
        </button>
        <a
          href={DOWNLOAD_API_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm"
          download={`converted-${fileId}.pdf`} 
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};