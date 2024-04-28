# Slidespeak PowerPoint to PDF Webapp 

Frontend:

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)


The backend for this project is available
here: [https://github.com/SlideSpeak/pptx-to-pdf-server](https://github.com/SlideSpeak/pptx-to-pdf-server)

## Requirements

- Bun installed to use it as a package runner (https://bun.sh/).
- Having the SlideSpeak PowerPoint to PDF backend up and running.

See [here](https://github.com/SlideSpeak/slidespeak-backend) on how to setup the backend.

## Getting Started

Make sure to have the environment variables set up correctly, you can copy the values from .env.example with the
following command:

```bash
cp .env.example .env
```

Run the development server:

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser.