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
        <div className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-md">
            <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-3 text-center">
                <p className="text-lg font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
            </div>
            <div className="flex w-full flex-col gap-1 rounded-lg border bg-blue-25 border-blue-200 p-3">
                <div class="flex items-center">
                    <input id="convert-to-pdf" type="radio" class="relative bottom-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked />
                    <label for="convert-option-1" class="block ms-2  text-sm text-blue-800">
                        Convert to PDF <br/>
                        Best quality, retaining images and other assets.
                    </label>
                </div>
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