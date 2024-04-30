'use client';

import { useState } from 'react';
import { ChooseFileStep } from '@/components/PowerpointToPDFConverter/ChooseFileStep';
import { SelectedFileStep } from '@/components/PowerpointToPDFConverter/SelectedFileStep';
import { UploadingFileStep } from '@/components/PowerpointToPDFConverter/UploadingFileStep';
import {ConvertFileStep} from '@/components/PowerpointToPDFConverter/ConvertToPDFStep';
import { DownloadFileStep } from '@/components/PowerpointToPDFConverter/DownloadFileStep';

export enum Step {
  ChooseFile,
  SelectedFileStep,
  UploadingFileStep,
  ConvertFile, 
  DownloadFile,
}

export const PowerpointToPDFConverter = () => {
  const [step, setStep] = useState<Step>(Step.ConvertFile);
  const [file, setFile] = useState<File | null>(null);
  const [convertedFileId, setConvertedFileId] = useState<string | null>(null); // Store file ID for download

  switch (step) {
    case Step.ChooseFile:
      return <ChooseFileStep setStep={setStep} setFile={setFile} />;
    case Step.SelectedFileStep:
      return <SelectedFileStep setStep={setStep} setFile={setFile} />
    case Step.UploadingFileStep:
      return <UploadingFileStep setStep={setStep} setFile={setFile} />;
    case Step.ConvertFile: 
      if (file) {
        return <ConvertFileStep file={file} setStep={setStep} setConvertedFileId={setConvertedFileId} />;
      } else {
        console.error('No file selected for conversion'); 
        return null;
      }
    case Step.DownloadFile:
      if (convertedFileId) {
        return <DownloadFileStep fileId={convertedFileId} setStep={setStep} />;
      } else {
        console.error('No file ID available for downloading'); 
        return null;
      }
    default:
      return null;
  }
};