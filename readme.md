# makePDF

A simple Node.js utility to convert local HTML files to PDF using Puppeteer.

## Author
Ben Darlington

## Features
- Converts any local HTML file to a PDF document
- Uses [Puppeteer](https://github.com/puppeteer/puppeteer) for accurate rendering
- Supports custom output filenames
- Adds standard A4 page size and margins
- Includes CSS backgrounds and images in the PDF

## Requirements
- Node.js (v14 or higher recommended)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)

Install dependencies with:

```
npm install puppeteer
```

## Usage

```
node makePDF.js <inputHtmlPath> <outputPdfName>
```

- `<inputHtmlPath>`: Path to your local HTML file (e.g., `./book.html`)
- `<outputPdfName>`: Desired name for the output PDF (e.g., `book.pdf`). If you omit `.pdf`, it will be appended automatically.

### Example

```
node makePDF.js ./book.html GardenersCompanion.pdf
```

This will create `GardenersCompanion.pdf` from `book.html` in the current directory.

## Notes
- The script must be run from the command line.
- The input HTML file must exist.
- The output PDF will be created in the current working directory unless an absolute path is provided.

## Troubleshooting
- If you see an error about missing Puppeteer, run `npm install puppeteer`.
- If the script fails to launch a browser, ensure you have internet access for Puppeteer to download Chromium, or see the [Puppeteer troubleshooting guide](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md).

## License
MIT License
