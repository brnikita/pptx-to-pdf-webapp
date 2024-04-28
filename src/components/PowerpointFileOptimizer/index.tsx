'use client';

import { useState } from 'react';
import { ChooseFileStep } from '@/components/PowerpointFileOptimizer/ChooseFileStep';
import {
  CompressFileStep,
  CompressPresentationResponse,
} from '@/components/PowerpointFileOptimizer/CompressFileStep';
import { DownloadFileStep } from '@/components/PowerpointFileOptimizer/DownloadFileStep';

export enum Step {
  ChooseFile,
  CompressFile,
  DownloadFile,
}

export const PowerpointFileOptimizer = () => {
  const [step, setStep] = useState<Step>(Step.ChooseFile);
  const [file, setFile] = useState<File | null>(null);
  const [compressResult, setCompressResult] = useState<CompressPresentationResponse | null>(null);

  switch (step) {
    case Step.ChooseFile:
      return <ChooseFileStep setStep={setStep} setFile={setFile} />;
    case Step.CompressFile:
      return (
        <CompressFileStep file={file} setStep={setStep} setCompressResult={setCompressResult} />
      );
    case Step.DownloadFile:
      return <DownloadFileStep result={compressResult} setStep={setStep} />;
  }
};
