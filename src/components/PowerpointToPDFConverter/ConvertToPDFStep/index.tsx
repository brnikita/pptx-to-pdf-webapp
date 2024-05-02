import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Step } from '@/components/PowerpointToPDFConverter';
import { formatBytes } from '@/utils/file'; 
import { LoadingIndicatorIcon } from '@/components/icons/LoadingIndicatorIcon';
import { PercentageLoader } from '@/components/icons/PercentageLoader';

type FileIDObject = {
  file_id: string;
  filename: string;
};

type ConvertFileStepProps = {
  files: File[] | null; 
  setStep: (step: Step) => void;
  setConvertedFilesIds: (filesIds: FileIDObject[]) => void;
};

export const ConvertFileStep: FC<ConvertFileStepProps> = ({ files, setStep, setConvertedFilesIds }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    console.log('ConvertFileStep');
  }, [])

  useEffect(() => {
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append('files', file);
    });
    
    const convertFiles = async () => {
      console.log('ConvertFileStep useEffect');

      try {
        const uploadUrl = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/upload_and_convert`;
          const { data } = await axios.post(uploadUrl, formData, {
            headers: { 
              'Content-Type': 'multipart/form-data' 
            },
            onUploadProgress: (progressEvent: ProgressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              
              setTimeout(() => {
                setUploadProgress(percentCompleted);
              }, 1000); 
            }
        });

        const conversionStatuses = data.conversion_statuses;
        
        if (conversionStatuses.length) {
          setStep(Step.DownloadFile);
          setConvertedFilesIds(conversionStatuses);
        } else {
          alert('File conversion was unsuccessful. Please try again.');
        }
      } catch (error) {
        console.error('Error during file conversion:', error);
        alert('An error occurred during the file conversion process. Please try again.');
      }
    };

    if (files && files.length > 0) {
      convertFiles();
    }
  }, [files, setStep, setConvertedFilesIds]);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      {files.length > 0 && files.map((file, index) => (
        <div key={index} className="flex flex-col gap-1 rounded-lg border border-gray-300 p-3 text-center">
          <p className="text-lg font-semibold text-gray-800">{file.name}</p>
          <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
        </div>
      ))}
      <div className="flex w-full flex-row gap-2 rounded-lg border border-gray-300 p-3">
        <PercentageLoader percentage={uploadProgress} size='small'/>
        <p className="relative top-1">Converting your files</p>
      </div>
      <div className="flex w-full gap-3">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 font-semibold text-gray-300 shadow-sm"
          disabled>
          Cancel
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-blue-200 bg-blue-200 px-4 py-2.5 font-semibold text-white shadow-sm"
          disabled
          id="download-button">
          <span className="animate-spin">
            <LoadingIndicatorIcon />
          </span>
        </button>
      </div>
    </div>
  );
};