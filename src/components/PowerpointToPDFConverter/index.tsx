'use client';

import { useState, useEffect } from 'react';
import { ChooseFileStep } from '@/components/PowerpointToPDFConverter/ChooseFileStep';
import { SelectedFileStep } from '@/components/PowerpointToPDFConverter/SelectedFileStep';
import { ConvertFileStep } from '@/components/PowerpointToPDFConverter/ConvertToPDFStep';
import { DownloadFileStep } from '@/components/PowerpointToPDFConverter/DownloadFileStep';

export enum Step {
  ChooseFile,
  SelectedFile,
  ConvertFile,
  DownloadFile,
}

export const PowerpointToPDFConverter = () => {
  const [step, setStep] = useState<Step>(Step.ChooseFile);
  const [files, setFiles] = useState<File[]>([]);
  const [convertedFilesIds, setConvertedFilesIds] = useState<string[]>([]);

  useEffect(() => {
    console.log('PowerpointToPDFConverter');
  }, []);

  return (
    <div>
      {step === Step.ChooseFile && <ChooseFileStep setStep={setStep} setFiles={setFiles} />}
      {step === Step.SelectedFile && files.length > 0 && <SelectedFileStep files={files} setStep={setStep} />}
      {step === Step.ConvertFile && files.length > 0 && <ConvertFileStep files={files} setStep={setStep} setConvertedFilesIds={setConvertedFilesIds} />}
      {step === Step.DownloadFile && convertedFilesIds && <DownloadFileStep filesIds={convertedFilesIds} setStep={setStep} />}
    </div>
  );
};