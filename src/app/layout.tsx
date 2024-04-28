import './globals.css';

export const metadata = {
  title: 'PowerPoint PDF converter - SlideSpeak',
  description: 'Convert your PowerPoint file to pdf',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
