// ConvertToPDFStep/index.tsx
import { FC, useState } from 'react';
import { formatBytes } from '@/utils/file';
import { Step } from '@/components/PowerpointToPDFConverter';
import _ from 'lodash';

export type FileUploadResponse = {
  file_ids: Array<{ file_id: string; filename: string }>;
};

export type ConversionStatusResponse = {
  conversion_statuses: Array<{ file_id: string; status: string }>;
};

type ConvertFileStepProps = {
  file: File | null;
  setStep: (step: Step) => void;
  setConvertedFileId: (fileId: string) => void;
};

export const SelectedFileStep: FC<ConvertFileStepProps> = ({ file, setStep}) => {
  const startConversionProcess = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }

    setStep(Step.UploadingFileStep);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{file?.name || 'No file selected'}</p>
        <p className="text-sm text-gray-600">{file ? formatBytes(file.size) : ''}</p>
      </div>
      <div>
        Convert to PDF <br/>
        Best quality, retains images and other assets.
      </div>  
      <div>
        <button
          type="button"
          className="mt-4 rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-700"
          onClick={() => setStep(Step.ChooseFile)}
          disabled={isConverting}
        >
          Cancel
        </button>
        
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          onClick={startConversionProcess}
        >
          Convert
        </button>
      </div>
      
    </div>
  );
};