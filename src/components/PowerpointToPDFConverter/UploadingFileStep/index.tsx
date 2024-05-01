import { FC, useEffect, useState } from 'react';
import { Step } from '@/components/PowerpointToPDFConverter';
import { CircleProgressBar } from '@/components/icons/CircleProgressBar';
import axios from 'axios';

type FileIDObject = {
    file_id: string;
    filename: string;
};

type UploadingFileStepProps = {
    file: File | null; 
    setStep: (step: Step) => void;
    setUploadFilesIds: (filesIds: FileIDObject[]) => void;
};
export const UploadingFileStep: FC<UploadingFileStepProps> = ({ file, setStep, setUploadFilesIds }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    console.log('UploadingFileStep');
  }, [])

  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        const formData = new FormData();
        formData.append('files', file);
        
        try {
          const uploadUrl = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/upload_files`;
          const { data } = await axios.post(uploadUrl, formData, {
            headers: { 
              'Content-Type': 'multipart/form-data' 
            },
            onUploadProgress: (progressEvent: ProgressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted); 
            }
          });

          if (data.file_ids && data.file_ids.length > 0) {
            setUploadFilesIds(data.file_ids);
            setStep(Step.ConvertFile);
          } else {
            alert('File upload was unsuccessful. Please try again.');
          }

          } catch (error) {
            console.error('Error during file uploading:', error);
            alert('An error occurred during the file uploading process. Please try again.');
          }
      };

      uploadFile();
    }
  }, [file, setStep, setUploadFilesIds]);

    return (
        <div className="flex flex-col gap-2 group cursor-pointer rounded-xl border border-dashed border-gray-400 bg-white px-6 py-16">
            <div className="grid place-items-center rounded-full p-2">
              <CircleProgressBar progress={uploadProgress}/>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Uploading...
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {file.name}  
              </p>
            </div>
        </div>
    );
};