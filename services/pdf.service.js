import fs from 'fs'
import PDFDocument from 'pdfkit'

export const pdfService = {
  buildBugPDF,
}

function buildBugPDF(bugs, filename = 'BugsPDF.pdf') {
  const doc = new PDFDocument()

  // Pipe its output somewhere, like to a file or HTTP response
  doc.pipe(fs.createWriteStream(filename))

  // iterate bugs array, and create a pdf with all the bugs
  bugs.forEach(bug => {
    doc.text(`Bug ID: ${bug._id}`)
    doc.text(`Name: ${bug.title}`)
    doc.text(`Severity: ${bug.severity}`)
    doc.text(`Description: ${bug.description}`)
    doc.addPage()
  })

  // finalize PDF file
  doc.end()
}
