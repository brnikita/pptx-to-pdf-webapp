import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Step } from '@/components/PowerpointToPDFConverter';
import { formatBytes } from '@/utils/file'; 
import { LoadingIndicatorIcon } from '@/components/icons/LoadingIndicatorIcon';

type ConvertFileStepProps = {
  file: File | null; 
  uploadedFileId: string; 
  setStep: (step: Step) => void;
};

export const ConvertFileStep: FC<ConvertFileStepProps> = ({ file, uploadedFileId, setStep }) => {
  useEffect(() => {
    const convertFile = async () => {

      try {
        const convertUrl = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/convert`; 
        const { data } = await axios.post(convertUrl, { file_id: uploadedFileId });

        if (data.conversion_status === 'success') {
          // Proceed to download or the next step
          setStep(Step.DownloadFile);


        } else {
          alert('File conversion was unsuccessful. Please try again.');
        }
      } catch (error) {
        console.error('Error during file conversion:', error);
        alert('An error occurred during the file conversion process. Please try again.');
      }
    };

    if (uploadedFileId) {
      convertFile();
    }
  }, [uploadedFileId, setStep]);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{file.name}</p>
        <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
      </div>
      <div>
        Converting your file
      </div>  
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="mt-4 rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-700"
          disabled
        >
          Cancel
        </button>
                
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          disabled
        >
          <LoadingIndicatorIcon/>
        </button>
      </div>
    </div>
  );

  
};