// ConvertToPDFStep/index.tsx
import { FC, useState } from 'react';
import { formatBytes } from '@/utils/file';
import { Step } from '@/components/PowerpointToPDFConverter';
import { LoadingIndicatorIcon } from '@/components/icons/LoadingIndicatorIcon';
import axios from 'axios';
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

export const UploadingFileStep: FC<ConvertFileStepProps> = ({ file, setStep }) => {
  const startUploadingProcess = async () => {

    try {
      const uploadResponse = await uploadFile(file);
      
      if (uploadResponse.file_ids && uploadResponse.file_ids.length > 0) {
        setStep(Step.ConvertFile);
      }
    } catch (error) {
      console.error('Error during file uploading:', error);
      alert('An error occurred during the file conversion process. Please try again.');
    } 
  };

  const uploadFile = async (file: File): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const uploadUrl = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/upload_files`;
      const { data } = await axios.post<FileUploadResponse>(uploadUrl, formData);
      return data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw new Error('Failed to upload the file.');
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      
      <div>
          <div className="flex items-center justify-center gap-2">
            <LoadingIndicatorIcon />
            <p>Uploading ...</p>
          </div>
      </div>
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{file?.name || 'No file selected'}</p>
        <p className="text-sm text-gray-600">{file ? formatBytes(file.size) : ''}</p>
      </div>
        
    </div>
  );
};