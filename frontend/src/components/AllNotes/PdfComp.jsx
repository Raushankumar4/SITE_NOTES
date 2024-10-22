import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { SERVER } from "../../constant";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setNumPages(0);
    setPageNumber(1);
    setError(null);
    setLoading(true);
  }, [pdfFile]);
  console.log(` ${SERVER}/${pdfFile?.notesPdf}`);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error) {
    console.error("Failed to load document:", error);
    setError("Failed to load PDF.");
    setLoading(false);
  }

  const isValidPdfFile = pdfFile && typeof pdfFile === "string";

  return (
    <div className="pdf-div">
      {isValidPdfFile ? (
        <>
          {loading ? (
            <p>Loading PDF...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <Document
                file={`${SERVER}/${pdfFile?.notesPdf}`}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                {Array.from({ length: numPages }, (v, i) => (
                  <Page
                    key={`page_${i + 1}`}
                    pageNumber={i + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))}
              </Document>
            </>
          )}
        </>
      ) : (
        <p className="text-red-500">Invalid PDF file.</p>
      )}
    </div>
  );
}

export default PdfComp;
