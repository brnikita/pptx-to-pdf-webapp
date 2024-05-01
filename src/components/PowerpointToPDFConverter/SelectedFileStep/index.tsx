import React, { FC, useEffect } from 'react';
import { formatBytes } from '@/utils/file'; 
import { Step } from '@/components/PowerpointToPDFConverter'; 

type SelectedFileStepProps = {
    file: File | null; 
    setStep: (step: Step) => void; 
};

export const SelectedFileStep: FC<SelectedFileStepProps> = ({ file, setStep }) => {
    const handleCancel = () => setStep(Step.ChooseFile); 
    const handleConvert = () => setStep(Step.UploadingFile); 

    useEffect(() => {
        console.log('SelectedFileStep');
      }, [])

    if (!file) {
        return (
            <div className="alert">
                No file selected. Please go back and select a file.
                <button onClick={handleCancel}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 rounded-xl bg-white p-6 shadow-md">
            <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-3 text-center">
                <p className="text-lg font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
            </div>
            <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-3">
                Convert to PDF <br/> 
                Best quality, retaining images and other assets.
            </div>  
            <div className="flex w-full gap-3">
                <button
                    type="button"
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm"
                    onClick={handleConvert}
                    id="download-button"
                >
                    Convert
                </button>
            </div>
        </div>
    );
};