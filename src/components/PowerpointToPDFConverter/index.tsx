// PowerpointToPDFConverter/index.tsx
'use client';

import { useState, useEffect } from 'react';
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
  type FileIDObject = {
    file_id: string;
    filename: string;
  };
  
  const [step, setStep] = useState<Step>(Step.ChooseFile);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFilesIds, setUploadFilesIds] = useState<FileIDObject | null>(null);
  const [convertedFileId, setConvertedFileId] = useState<string | null>(null);

  useEffect(() => {
    console.log('PowerpointToPDFConverter');
  }, [])

  return (
    <div>
      {step === Step.ChooseFile && <ChooseFileStep setStep={setStep} setFile={setFile} />}
      {step === Step.SelectedFile && file && <SelectedFileStep file={file} setStep={setStep} />}
      {step === Step.UploadingFile && file && <UploadingFileStep file={file} setStep={setStep} setUploadFilesIds={setUploadFilesIds} />}
      {step === Step.ConvertFile && file && uploadedFilesIds && <ConvertFileStep file={file} uploadedFilesIds={uploadedFilesIds} setStep={setStep} setConvertedFileIds={setConvertedFileId} />}
      {step === Step.DownloadFile && convertedFileId && <DownloadFileStep fileId={convertedFileId} setStep={setStep} />}
    </div>
  );
};