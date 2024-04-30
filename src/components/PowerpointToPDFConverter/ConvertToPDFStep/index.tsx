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

export const ConvertFileStep: FC<ConvertFileStepProps> = ({ file, setStep, setConvertedFileId }) => {
  const [isConverting, setIsConverting] = useState(false);

  const startConversionProcess = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }

    setIsConverting(true);

    try {
      
        const conversionResponse = await requestConversion(fileIds);
        const successfulConversion = conversionResponse.conversion_statuses.find(status => status.status === 'done');
        
        if (successfulConversion) {
          setConvertedFileId(successfulConversion.file_id);
          setStep(Step.DownloadFile);
        } else {
          throw new Error('File conversion failed');
        }
    } catch (error) {
      console.error('Error during file conversion:', error);
      alert('An error occurred during the file conversion process. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const requestConversion = async (fileIds: Array<object>): Promise<ConversionStatusResponse> => {
    try {
      const conversionUrl = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/convert_files`;
      const { data } = await axios.post<ConversionStatusResponse>(conversionUrl, { file_ids: fileIds });
      return data;
    } catch (error) {
      console.error('Conversion request failed:', error);
      throw new Error('Failed to convert the file.');
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{file?.name || 'No file selected'}</p>
        <p className="text-sm text-gray-600">{file ? formatBytes(file.size) : ''}</p>
      </div>
      <div>
      {isConverting && (
          <div className="flex items-center justify-center gap-2">
            <LoadingIndicatorIcon />
            <p>Converting your file...</p>
          </div>
      )}
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