import { triggerDownload } from '@/utils/download';
import { FC } from 'react';
import { formatBytes } from '@/utils/file';
import { Step } from '@/components/PowerpointToPDFConverter';
import { CompressPresentationResponse } from '@/components/PowerpointToPDFConverter/CompressFileStep';

type DownloadFileStepProps = {
  result: CompressPresentationResponse | null;
  setStep: (step: Step) => void;
};

export const DownloadFileStep: FC<DownloadFileStepProps> = ({ result, setStep }) => {
  if (!result) {
    setStep(Step.ChooseFile);
    return null;
  }

  const compressedPercentage = Math.round(
    (1 - result.compressedFileSize / result.originalFileSize) * 100,
  );

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">File compressed successfully!</p>
        <p className="text-sm text-gray-600">
          Your file size has been compressed by{' '}
          <span className="font-semibold text-success-500">{compressedPercentage}%</span> (
          {formatBytes(result.originalFileSize)} to {formatBytes(result.compressedFileSize)})
        </p>
      </div>
      <div className="flex w-full gap-3">
        <button
          type="button"
          title="Compress another presentation."
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          onClick={() => setStep(Step.ChooseFile)}
        >
          Compress another
        </button>
        <button
          type="button"
          title="Compress this PowerPoint document."
          className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          onClick={() => triggerDownload(result.compressedFileUrl)}
          id="download-button"
        >
          Download file
        </button>
      </div>
    </div>
  );
};
