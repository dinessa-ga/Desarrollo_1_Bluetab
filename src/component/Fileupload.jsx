import React, { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { db } from '../configuration/firebase';
import { collection, addDoc } from 'firebase/firestore';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileUpload = ({ updateFormData }) => {
  const inputRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        setPdfData(arrayBuffer);
        updateFormData({ name: file.name }); // Esto es opcional y lo utilizas para actualizar el nombre en el formulario

        saveToFirestore(arrayBuffer, file.name);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const saveToFirestore = async (data, fileName) => {
    try {
      const text = await extractTextFromPdf(data); // Extrae el texto del PDF

      // Sube el texto a Cloud Firestore
      const pdfCollectionRef = collection(db, 'pdfs'); // Reemplaza 'pdfs' con el nombre de tu colección en Firestore
      const pdfDocRef = await addDoc(pdfCollectionRef, {
        name: fileName,
        text: text, // Aquí guardas el texto extraído del PDF
        // Agrega más campos si es necesario
      });

      console.log('Texto del PDF subido a Cloud Firestore con éxito.');
      const pdfURL = pdfDocRef.id; // Puedes utilizar el ID del documento como URL
      console.log('URL del PDF en Cloud Firestore:', pdfURL);
    } catch (error) {
      console.error('Error al guardar el texto del PDF en Cloud Firestore:', error);
    }
  };

  const extractTextFromPdf = async (data) => {
    return new Promise((resolve, reject) => {
      // Código para extraer el texto del PDF utilizando pdf.js
      const textLayer = [];
      const pdfData = new Uint8Array(data);

      pdfjs.getDocument({ data: pdfData }).promise.then((pdf) => {
        const maxPages = pdf._pdfInfo.numPages;
        let page = 1;

        function extractPageText(page) {
          pdf.getPage(page).then(function (pdfPage) {
            pdfPage.getTextContent().then(function (textContent) {
              textLayer.push(textContent.items.map((s) => s.str).join(' '));
              if (page < maxPages) {
                extractPageText(page + 1);
              } else {
                resolve(textLayer.join('\n'));
              }
            });
          });
        }

        extractPageText(page);
      });
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        ref={inputRef}
        onChange={handleFileChange}
      />
      {pdfData && (
        <div>
          <Document file={pdfData}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
