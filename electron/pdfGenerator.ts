import PDFDocument from 'pdfkit';
import fs from 'fs';
import { dialog } from 'electron';
import moment from 'moment';
import { IExperience } from '../src/interfaces/Experience';
import { IProject } from '../src/interfaces/Project';
import { IProfileDetails } from '../src/interfaces/Profile';

const fontPath = __dirname + '/fonts/';

const pdf = {
  margin: 24,
  fontSize: {
    header: 20,
    title: 16,
    subtitle: 12,
    text: 10,
    small: 8
  },
  fonts: {
    light: fontPath + 'light.ttf',
    regular: fontPath + 'regular.ttf',
    medium: fontPath + 'medium.ttf',
    bold: fontPath + 'bold.ttf'
  },
  content: {
    x: 148
  },
  colours: {
    blue: '#1488CC',
    black: '#000'
  }
};

interface IGenerateData {
  experiences: IExperience[];
  projects: IProject[];
  profileDetails: IProfileDetails;
}

export function generatePDF(data: IGenerateData, outputPath: string): void {
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
  doc.image(`${__dirname}/images/background.png`, 0, 0, {
    width: 300,
    height: 300
  });
  doc.pipe(fs.createWriteStream(path));

  doc
    .fontSize(pdf.fontSize.header)
    .font(pdf.fonts.bold)
    .text(data.profileDetails.firstName + ' ' + data.profileDetails.lastName)
    .fontSize(pdf.fontSize.subtitle)
    .font(pdf.fonts.regular)
    .fillColor('#1488CC')
    .text(data.profileDetails.title)
    .fillColor('#000')
    .moveDown(2);

  drawFullLine(doc);

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

  let experienceIndex = 0;

  data.experiences
    .sort((a, b) => {
      if (a.startDate > b.startDate) {
        return -1;
      }
      if (a.startDate < b.startDate) {
        return 1;
      }
      return 0;
    })
    .forEach((experience: any) => {
      addExperience(doc, experience);
      // const projects = data.projects.filter(
      //   (project: any) => project.company === experience.id
      // );

      // projects.forEach((project: any) => {
      //   doc
      //     .font(pdf.fonts.bold)
      //     .fontSize(pdf.fontSize.text)
      //     .text(project.name, lineStartX + 20)
      //     .font(pdf.fonts.regular)
      //     .fontSize(pdf.fontSize.text)
      //     .fillColor('#000')
      //     .text(project.description, lineStartX + 20, undefined, {
      //       align: 'justify'
      //     })
      //     .moveDown(1);
      // });

      if (experienceIndex !== data.experiences.length - 1) {
        drawLine(doc);
      }

      experienceIndex++;
    });

  doc.moveDown(2);

  addSectionHeader(doc, 'Education & Qualifications');

  doc.end();
}

const drawFullLine = (doc: PDFKit.PDFDocument) => {
  const lineEndX = doc.page.width; // Adjust this based on your layout
  const lineEndY = doc.y;

  doc.lineWidth(1); // Adjust line width if needed
  doc.opacity(0.1);
  doc.moveTo(0, doc.y).lineTo(lineEndX, lineEndY).stroke().moveDown(2);
  doc.opacity(1);
};

const drawLine = (doc: PDFKit.PDFDocument) => {
  const lineEndX = doc.page.width - pdf.margin; // Adjust this based on your layout
  doc.moveDown(1);
  const lineEndY = doc.y;

  doc.lineWidth(1); // Adjust line width if needed
  doc
    .opacity(0.2)
    .moveTo(pdf.margin + 125, doc.y)
    .lineTo(lineEndX, lineEndY)
    .stroke(pdf.colours.blue)
    .moveDown(1)
    .opacity(1);
};

const addSectionHeader = (doc: PDFKit.PDFDocument, text: string) => {
  let yPosition = pdf.margin; // Adjust this to your desired y position
  const lineHeight = pdf.fontSize.subtitle; // Adjust this to your desired line height
  const lineStartY = doc.y + yPosition; // Adjust this based on your layout

  const lines = splitTextAtFirstSpace(text); // Split the text into lines

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    doc
      .fontSize(lineHeight)
      .font(pdf.fonts.bold)
      .fillColor(i === 0 ? pdf.colours.black : pdf.colours.blue)
      .text(line, pdf.margin);
    yPosition += lineHeight; // Move to the next line
  }

  const lineEndX = doc.page.width - pdf.margin; // Adjust this based on your layout
  const lineEndY = lineStartY;

  doc.lineWidth(1); // Adjust line width if needed
  doc
    .moveTo(pdf.margin + 125, lineStartY)
    .lineTo(lineEndX, lineEndY)
    .stroke(pdf.colours.blue)
    .moveDown(1)
    .fillColor(pdf.colours.black);
};

const addExperience = (doc: PDFKit.PDFDocument, experience: IExperience) => {
  doc
    .font(pdf.fonts.bold)
    .fontSize(pdf.fontSize.text)
    .font(pdf.fonts.medium)
    .text(
      `${moment(experience.startDate).format('MMM YYYY')} - ${
        experience.endDate
          ? moment(experience.endDate).format('MMM YYYY')
          : 'Present'
      }`,
      pdf.content.x
    )
    .fontSize(pdf.fontSize.small)
    .fillColor(pdf.colours.blue)
    .moveDown(1)
    .text(experience.company, pdf.content.x)
    .fillColor('#000')
    .text(experience.location, pdf.content.x)
    .moveUp(4.25)
    .font(pdf.fonts.bold)
    .fontSize(pdf.fontSize.text)
    .text(experience.title, pdf.content.x + 150)
    .moveDown(1)
    .font(pdf.fonts.regular)
    .fontSize(pdf.fontSize.text)
    .text(experience.overview, pdf.content.x + 150, undefined, {
      align: 'justify'
    })
    .moveDown(1);
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
