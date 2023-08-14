import PDFDocument from 'pdfkit';
import fs from 'fs';
import { dialog } from 'electron';
import moment from 'moment';

const fontPath = __dirname + '/fonts/';

const pdf = {
  margin: 24,
  fontSize: {
    header: 20,
    title: 16,
    subtitle: 12,
    text: 10
  },
  fonts: {
    light: fontPath + 'light.ttf',
    regular: fontPath + 'regular.ttf',
    medium: fontPath + 'medium.ttf',
    bold: fontPath + 'bold.ttf'
  }
};

export function generatePDF(data: any, outputPath: string): void {
  const path = dialog.showSaveDialogSync({
    title: 'Save PDF',
    defaultPath: outputPath,
    filters: [
      {
        name: 'PDF',
        extensions: ['pdf']
      }
    ]
  });

  if (!path) {
    return;
  }

  const doc = new PDFDocument({
    font: pdf.fonts.regular,
    margin: pdf.margin
  });

  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F7FAFF');
  doc.fill('#000');

  doc.pipe(fs.createWriteStream(path));

  doc
    .fontSize(pdf.fontSize.header)
    .font(pdf.fonts.bold)
    .text(data.profileDetails.firstName + ' ' + data.profileDetails.lastName)
    .fontSize(pdf.fontSize.subtitle)
    .font(pdf.fonts.regular)
    .text(data.profileDetails.title)
    .moveDown(2);

  const xPosition = pdf.margin; // Adjust this to your desired x position
  const lineStartX = xPosition + 125; // Adjust this based on your layout

  doc
    .fontSize(pdf.fontSize.text)
    .font(pdf.fonts.medium)
    .text('Bio')
    .moveUp(1)
    .font(pdf.fonts.light)
    .text(data.profileDetails.bio, lineStartX, undefined, {
      align: 'justify'
    })
    .moveDown(2);

  addSectionHeader(doc, 'Work Experience');

  data.experiences.forEach((experience: any) => {
    doc
      .font(pdf.fonts.medium)
      .fontSize(pdf.fontSize.subtitle)
      .text(experience.title, lineStartX)
      .font(pdf.fonts.medium)
      .fontSize(pdf.fontSize.text)
      .fillColor('#444444')
      .text(experience.company, lineStartX)
      .text(
        `${moment(experience.startDate).format('MMM YYYY')} - ${
          experience.endDate
            ? moment(experience.endDate).format('MMM YYYY')
            : 'Present'
        }`,
        lineStartX
      )
      .moveDown(1)
      .font(pdf.fonts.regular)
      .fontSize(pdf.fontSize.text)
      .fillColor('#000')
      .text(experience.overview, lineStartX)
      .moveDown(1)
      .font(pdf.fonts.medium)
      .fontSize(pdf.fontSize.subtitle)
      .text('Projects', lineStartX)
      .moveDown(1);

    const projects = data.projects.filter(
      (project: any) => project.company === experience.id
    );

    projects.forEach((project: any) => {
      doc
        .font(pdf.fonts.bold)
        .fontSize(pdf.fontSize.text)
        .text(project.name, lineStartX)
        .font(pdf.fonts.regular)
        .fontSize(pdf.fontSize.text)
        .fillColor('#000')
        .text(project.description, lineStartX)
        .moveDown(1);
    });
  });

  addSectionHeader(doc, 'Education & Qualifications');

  doc.end();
}

const addSectionHeader = (doc: PDFKit.PDFDocument, text: string) => {
  let yPosition = pdf.margin; // Adjust this to your desired y position
  const lineHeight = pdf.fontSize.subtitle; // Adjust this to your desired line height
  const lineStartY = doc.y + yPosition; // Adjust this based on your layout

  const lines = splitTextAtFirstSpace(text); // Split the text into lines

  for (const line of lines) {
    doc.fontSize(lineHeight).font(pdf.fonts.bold).text(line, pdf.margin);
    yPosition += lineHeight; // Move to the next line
  }

  const lineEndX = doc.page.width - pdf.margin; // Adjust this based on your layout
  const lineEndY = lineStartY;

  doc.lineWidth(1); // Adjust line width if needed
  doc
    .moveTo(pdf.margin + 125, lineStartY)
    .lineTo(lineEndX, lineEndY)
    .stroke();
};

const splitTextAtFirstSpace = (text: string) => {
  const firstSpaceIndex = text.indexOf(' ');

  if (firstSpaceIndex !== -1) {
    const firstPart = text.substring(0, firstSpaceIndex);
    const remainingPart = text.substring(firstSpaceIndex + 1);
    return [firstPart, remainingPart];
  } else {
    return [text];
  }
};
