import { FC, useState } from 'react';
import { formatBytes } from '@/utils/file';
import { Step } from '@/components/PowerpointToPDFConverter';
import { LoadingIndicatorIcon } from '@/components/icons/LoadingIndicatorIcon';
import axios from 'axios';
import { cn } from '@/utils/cn';

export type CompressPresentationResponse = {
  originalFileSize: number;
  compressedFileSize: number;
  compressedFileUrl: string;
};

type ReviewFileStepProps = {
  file: File | null;
  setStep: (step: Step) => void;
  setCompressResult: (result: CompressPresentationResponse) => void;
};

export const CompressFileStep: FC<ReviewFileStepProps> = ({ file, setStep, setCompressResult }) => {
  const [isCompressing, setIsCompressing] = useState(false);

  if (!file) {
    setStep(Step.ChooseFile);
    return null;
  }

  const startCompression = async () => {
    setIsCompressing(true);

    try {
      const response = await compress(file);

      setCompressResult(response);
      setStep(Step.DownloadFile);
    } finally {
      setIsCompressing(false);
    }
  };

  const compress = async (file: File) => {
    const form = new FormData();
    form.append('file', file);

    const CONVERTER_API_URL = process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL= as string;

    const response = await axios.post<CompressPresentationResponse>(
      `${CONVERTER_API_URL}/optimize`,
      form,
    );

    return response.data;
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{file.name}</p>
        <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
      </div>
      {isCompressing ? (
        <Loader />
      ) : (
        <CompressionSelectBox
          value="High Compression"
          description="Smallest file size, standard quality."
        />
      )}

      <div className="flex w-full gap-3">
        <button
          type="button"
          disabled={isCompressing}
          title="Cancel"
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          onClick={() => setStep(Step.ChooseFile)}
        >
          Cancel
        </button>
        <button
          type="button"
          id="compress-button"
          disabled={isCompressing}
          title="Compress this PowerPoint document."
          className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          onClick={startCompression}
        >
          {isCompressing ? (
            <div className="animate-spin">
              <LoadingIndicatorIcon />
            </div>
          ) : (
            'Compress'
          )}
        </button>
      </div>
    </div>
  );
};

type CompressionSelectBoxProps = {
  checked?: boolean;
  value: string;
  description: string;
};

const CompressionSelectBox: FC<CompressionSelectBoxProps> = ({
  checked = true,
  value,
  description,
}) => (
  <label className="group flex cursor-pointer gap-2 rounded-xl border-2 border-blue-200 bg-blue-25 p-4">
    <input type="radio" name="compression" className="hidden" defaultChecked={checked} />
    <div>
      <div className="grid size-4 place-items-center rounded-full border border-blue-600">
        <div
          className={cn('h-2 w-2 rounded-full bg-blue-600 transition-opacity', {
            'opacity-0 group-hover:opacity-80': !checked,
          })}
        />
      </div>
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-sm leading-4 text-blue-800">{value}</span>
      <span className="text-sm text-blue-700">{description}</span>
    </div>
  </label>
);

const Loader = () => (
  <div className="flex w-full items-center gap-2 rounded-xl border border-gray-300 p-4">
    <div className="size-7 animate-spin-pretty rounded-full border-4 border-solid border-t-blue-500" />
    <p className="text-sm text-gray-700">Compressing your file...</p>
  </div>
);
