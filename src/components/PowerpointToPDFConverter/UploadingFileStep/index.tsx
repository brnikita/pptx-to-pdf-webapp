import { FC, useEffect, useRef } from 'react';
import { formatBytes } from '@/utils/file';
import { Step } from '@/components/PowerpointToPDFConverter';
import { LoadingIndicatorIcon } from '@/components/icons/LoadingIndicatorIcon';
import axios from 'axios';

type UploadingFileStepProps = {
    file: File | null; 
    setStep: (step: Step) => void;
    setUploadFileId: (fileId: string) => void;
};

export const UploadingFileStep: FC<UploadingFileStepProps> = ({ file, setStep, setUploadFileId }) => {
    const uploadAttempted = useRef(false);

    useEffect(() => {
        if (uploadAttempted.current) {
            return;
        }

        const uploadFile = async () => {
          const formData = new FormData();
          
          uploadAttempted.current = true; 
          formData.append('files', file);

            try {
                const uploadUrl = `${process.env.NEXT_PUBLIC_TO_PDF_CONVERTER_API_URL}/upload_files`;
                const { data } = await axios.post(uploadUrl, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (data.file_ids && data.file_ids.length > 0) {
                  setUploadFileId(data.file_ids[0].file_id);
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

        return () => {
            uploadAttempted.current = false;
        };
    }, [file, setStep, setUploadFileId]);

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <LoadingIndicatorIcon />
            <div>Uploading...</div>
            <div>{file.name} ({formatBytes(file.size)})</div>
        </div>
    );
};