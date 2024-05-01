import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Step } from '@/components/PowerpointToPDFConverter';
import { formatBytes } from '@/utils/file'; 
import { LoadingIndicatorIcon } from '@/components/icons/LoadingIndicatorIcon';
import { SmallCircleSpinner } from '@/components/icons/SmallCircleSpinner';

type FileIDObject = {
  file_id: string;
  filename: string;
};

type ConvertFileStepProps = {
  ile: File | null; 
  uploadedFilesIds: FileIDObject[]; 
  setStep: (step: Step) => void;
};

export const ConvertFileStep: FC<ConvertFileStepProps> = ({ file, uploadedFilesIds, setStep, setConvertedFileId }) => {
  useEffect(() => {
    console.log('ConvertFileStep');
  }, [])

  useEffect(() => {
    const convertFile = async () => {
      console.log('ConvertFileStep useEffect');

      try {
        const convertUrl = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/convert_files`; 
        const { data } = await axios.post(convertUrl, { file_ids: uploadedFilesIds });
        const conversionStatuses = data.conversion_statuses;
        
        if (conversionStatuses.length > 0 && conversionStatuses[0].status === 'done') {
          setStep(Step.DownloadFile);
          setConvertedFileId(conversionStatuses[0].file_id);
        } else {
          alert('File conversion was unsuccessful. Please try again.');
        }
      } catch (error) {
        console.error('Error during file conversion:', error);
        alert('An error occurred during the file conversion process. Please try again.');
      }
    };

    if (uploadedFilesIds && uploadedFilesIds.length > 0) {
      convertFile();
    }
  }, [uploadedFilesIds, setStep]);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{file.name}</p>
        <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
      </div>
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4">
        <SmallCircleSpinner/>
        Converting your file
      </div>
      <div className="flex w-full gap-3">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm"
          disabled
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm"
          disabled
          id="download-button"
        >
          <LoadingIndicatorIcon/>
        </button>
      </div>
    </div>
  );
};