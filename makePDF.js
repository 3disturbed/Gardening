#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// --- Argument Parsing ---
let args = process.argv.slice(2); // Get arguments after 'node' and script name

if (args.length < 2) {
  console.error('Error: Missing required arguments.');
  console.error('Usage: node makePDF.js <inputHtmlPath> <outputPdfName>');
  console.error('Example: node makePDF.js ./mybook.html mybook.pdf');
  process.exit(1);
}

const inputHtmlPath = path.resolve(args[0]); // Get absolute path for input HTML
let outputPdfName = args[1];
let outputPdfPath = path.resolve(outputPdfName); // Get absolute path for output PDF

// --- Validation ---
if (!fs.existsSync(inputHtmlPath)) {
  console.error(`Error: Input HTML file not found at "${inputHtmlPath}"`);
  process.exit(1);
}

if (!outputPdfName.toLowerCase().endsWith('.pdf')) {
  console.warn(`Warning: Output filename "${outputPdfName}" does not end with .pdf. Appending .pdf`);
  outputPdfName += '.pdf';
  outputPdfPath = path.resolve(outputPdfName); // Update absolute path
}

// --- PDF Conversion Function ---
async function convertHtmlToPdf(htmlPath, pdfPath) {
  console.log(`Starting PDF conversion...`);
  console.log(`  Input HTML: ${htmlPath}`);
  console.log(`  Output PDF: ${pdfPath}`);

  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the local HTML file using file:// protocol
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    // Generate PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4', // Common page format
      printBackground: true, // Include CSS background colors/images
      margin: { // Standard margins
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    console.log(`Successfully created PDF: ${pdfPath}`);

  } catch (error) {
    console.error('PDF generation failed!');
    console.error(error);
    process.exitCode = 1; // Set exit code to indicate failure
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}

// --- Execute Conversion ---
convertHtmlToPdf(inputHtmlPath, outputPdfPath);