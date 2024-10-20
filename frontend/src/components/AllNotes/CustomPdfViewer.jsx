import React from "react";
import { PDFViewer } from "pdf-viewer-reactjs";

const CustomPdfViewer = ({ file }) => (
  <PDFViewer
    document={{
      url: file,
    }}
    style={{ width: "100%", height: "500px" }}
  />
);

export default CustomPdfViewer;

// import CustomPdfViewer from './CustomPdfViewer'; // Adjust import based on the new viewer npm install pdf-viewer-reactjs
