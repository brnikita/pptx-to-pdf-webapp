// PowerpointToPDFConverter/index.tsx
'use client';

import { useState } from 'react';
import { ChooseFileStep } from '@/components/PowerpointToPDFConverter/ChooseFileStep';
import { SelectedFileStep } from '@/components/PowerpointToPDFConverter/SelectedFileStep';
import { UploadingFileStep } from '@/components/PowerpointToPDFConverter/UploadingFileStep';
import {ConvertFileStep} from '@/components/PowerpointToPDFConverter/ConvertToPDFStep';
import { DownloadFileStep } from '@/components/PowerpointToPDFConverter/DownloadFileStep';

export enum Step {
  ChooseFile,
  SelectedFile,
  UploadingFile,
  ConvertFile,
  DownloadFile,
}

export const PowerpointToPDFConverter = () => {
  const [step, setStep] = useState<Step>(Step.ChooseFile);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileId, setUploadFileId] = useState<string | null>(null);
  const [convertedFileId, setConvertedFileId] = useState<string | null>(null);

  return (
    <div>
      {step === Step.ChooseFile && <ChooseFileStep setStep={setStep} setFile={setFile} />}
      {step === Step.SelectedFile && file && <SelectedFileStep file={file} setStep={setStep} />}
      {step === Step.UploadingFile && file && <UploadingFileStep file={file} setStep={setStep} setUploadFileId={setUploadFileId} />}
      {step === Step.ConvertFile && file && <ConvertFileStep file={file} uploadedFileId={uploadedFileId} setStep={setStep} setConvertedFileId={setConvertedFileId} />}
      {step === Step.DownloadFile && convertedFileId && <DownloadFileStep fileId={convertedFileId} setStep={setStep} />}
    </div>
  );
};