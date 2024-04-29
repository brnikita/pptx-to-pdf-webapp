import { FC, useCallback } from 'react';
import { Step } from '@/components/PowerpointToPDFConverter';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@/components/icons/UploadIcon';

type ChooseFileStepProps = {
  setStep: (step: Step) => void;
  setFile: (file: File) => void;
};

const MAX_POWERPOINT_FILE_SIZE = 200 * 1024 * 1024; // 200MB to manage file size limit for conversion

export const ChooseFileStep: FC<ChooseFileStepProps> = ({ setFile, setStep }) => {
  const handleFileDrop = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      // Update the next step to proceed with the file conversion process
      setStep(Step.ConvertFile); // Step.ConvertFile in your Step enum now
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback(handleFileDrop, [setFile, setStep]),
    accept: {
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    maxSize: MAX_POWERPOINT_FILE_SIZE,
    maxFiles: 1,
  });

  return (
    <div
      className="group cursor-pointer rounded-xl border border-dashed border-gray-400 bg-white px-6 py-16"
      {...getRootProps()}
    >
      <input {...getInputProps()} id="choose-file-input" />
      <div className="flex shrink-0 grow-0 flex-col items-center gap-2">
        <div className="mb-2 rounded-full bg-gray-100 p-2">
          <div className="grid place-items-center rounded-full bg-gray-200 p-2 [&>svg]:size-8">
            <UploadIcon />
          </div>
        </div>
        <p className="text-sm leading-8 text-gray-600">
          Drag and drop a PowerPoint file to convert to PDF.
        </p>
        <button
          type="button"
          title="Choose a PowerPoint file to convert."
          className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-blue-700 transition-colors group-hover:bg-blue-100"
        >
          Choose file
        </button>
      </div>
    </div>
  );
};