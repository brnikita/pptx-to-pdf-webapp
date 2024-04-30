import { FC, useCallback } from 'react';
import { Step } from '@/components/PowerpointToPDFConverter';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@/components/icons/UploadIcon';

type ChooseFileStepProps = {
  setStep: (step: Step) => void;
  setFile: (file: File) => void;
};

export const ChooseFileStep: FC<ChooseFileStepProps> = ({ setFile, setStep }) => {
  const handleFileDrop = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setStep(Step.SelectedFile); // Transition to SelectedFile after file selection
    }
  }, [setFile, setStep]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    maxSize: 200 * 1024 * 1024, // 200MB as maximum file size
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
          className="rounded-lg bg-blue-50 px-4 py-2.5 font-semibold text-sm text-blue-700 transition-colors group-hover:bg-blue-100"
        >
          Choose file
        </button>
      </div>
    </div>
  );
};