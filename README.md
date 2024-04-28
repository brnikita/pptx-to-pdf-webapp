# Slidespeak Webapp

![slidespeak-banner-github](https://github.com/SlideSpeak/slidespeak-webapp/assets/5519740/8ea56893-3c7a-42ee-906c-01e5797287af)

SlideSpeak allows you to chat with your PowerPoint slides. Upload any PowerPoint, Word or PDF file and ask questions
about the content.

SlideSpeak was built with:

Frontend:

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Chat Stream](https://github.com/XD2Sketch/react-chat-stream)

The backend for this project is available
here: [https://github.com/SlideSpeak/slidespeak-backend](https://github.com/SlideSpeak/slidespeak-backend)

## Requirements

- Bun installed to use it as a package runner (https://bun.sh/).
- Having the SlideSpeak backend up and running.

See [here](https://github.com/SlideSpeak/slidespeak-backend) on how to setup the backend.

## Getting Started

Make sure to have the environment variables set up correctly, you can copy the values from .env.local.example with the
following command:

```bash
cp .env.local.example .env.local
```

Install all dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Updating pdfjs-dist versions

SlideSpeak uses pdfjs-dist to render PDF files in the browser. To make sure this is done with the correct version we
maintain a local copy of the pdfjs worker file in /public/scripts. To update the pdfjs-dist version, download the latest
version from [unpkg.com](https://unpkg.com/browse/pdfjs-dist@2.1.266/) replace the worker file in and filename in
/public/scripts and change the PDFJS_VERSION variable in /src/utils/config/versions.ts. It is very important that these
versions match the version of pdfjs-dist in package.json.

## License

See LICENSE file.
