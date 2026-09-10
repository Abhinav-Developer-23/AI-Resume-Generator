import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Triggers native high-fidelity vector PDF print.
 * This is the gold standard for ATS resumes: 100% vector fonts, selectable text, and clickable links.
 */
export function printResume(): void {
  window.print();
}

/**
 * Programmatic PDF export with multi-page support.
 */
export async function exportResumeToPdf(
  elementId: string,
  fileName: string = "Resume.pdf"
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Resume element #${elementId} not found.`);
  }

  // Create high-resolution canvas
  const canvas = await html2canvas(element, {
    scale: 2.5, // 2.5x retina resolution for ultra-sharp text
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate scaled height on A4
  const imgHeight = (canvasHeight * pageWidth) / canvasWidth;

  // If content fits on 1 page
  if (imgHeight <= pageHeight) {
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
  } else {
    // Multi-page clean pagination
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d");

    const singlePageCanvasHeight = (pageHeight * canvasWidth) / pageWidth;
    pageCanvas.width = canvasWidth;
    pageCanvas.height = singlePageCanvasHeight;

    let renderedHeight = 0;
    let pageIndex = 0;

    while (renderedHeight < canvasHeight) {
      if (pageIndex > 0) {
        pdf.addPage();
      }

      if (pageCtx) {
        pageCtx.fillStyle = "#ffffff";
        pageCtx.fillRect(0, 0, canvasWidth, singlePageCanvasHeight);
        pageCtx.drawImage(
          canvas,
          0,
          renderedHeight,
          canvasWidth,
          singlePageCanvasHeight,
          0,
          0,
          canvasWidth,
          singlePageCanvasHeight
        );

        const pageImgData = pageCanvas.toDataURL("image/png");
        pdf.addImage(pageImgData, "PNG", 0, 0, pageWidth, pageHeight);
      }

      renderedHeight += singlePageCanvasHeight;
      pageIndex++;
    }
  }

  pdf.save(fileName);
}
