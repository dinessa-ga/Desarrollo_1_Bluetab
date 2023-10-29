import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../configuration/firebase';

export default function PdfList() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const pdfsCollection = collection(db, 'pdfs');
        const pdfsSnapshot = await getDocs(pdfsCollection);
        const pdfList = [];

        for (const pdfDoc of pdfsSnapshot.docs) {
          const pdfData = pdfDoc.data();
          pdfList.push({ id: pdfDoc.id, ...pdfData });
        }

        setPdfs(pdfList);
      } catch (error) {
        console.error('Error al obtener los PDFs:', error);
      }
    };

    fetchPDFs();
  }, []);

  const viewPdf = async (pdf) => {
    try {
      const formDocRef = doc(db, 'Forms', pdf.name); // Suponiendo que el nombre del PDF coincide con el campo 'nombre' del formulario
      const formDocSnapshot = await getDoc(formDocRef);

      if (formDocSnapshot.exists()) {
        setSelectedPdf({ pdf, form: formDocSnapshot.data() });
      } else {
        console.error('No se encontró el formulario asociado.');
        setSelectedPdf({ pdf, form: null });
      }
    } catch (error) {
      console.error('Error al obtener los detalles del formulario:', error);
      setSelectedPdf(null);
    }
  };

  const clearSelectedPdf = () => {
    setSelectedPdf(null);
  };

  return (
    <div>
      <h2>PDFs en Firestore:</h2>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <a href="#" onClick={() => viewPdf(pdf)}>
              {pdf.name}
            </a>
          </li>
        ))}
      </ul>

      {selectedPdf && (
        <div>
          <h2>PDF Seleccionado: {selectedPdf.pdf.name}</h2>
          <p>Texto del PDF:</p>
          <div className="pdf-text-container">
            <pre>{selectedPdf.pdf.text}</pre>
          </div>
          {selectedPdf.form && (
            <div>
              <h2>Detalles del Formulario:</h2>
              <p>Nombre: {selectedPdf.pdf.name}</p>
              {/* Muestra otros detalles del formulario según sea necesario */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
