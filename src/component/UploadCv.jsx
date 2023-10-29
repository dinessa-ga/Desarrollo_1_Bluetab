import React, { useEffect, useState } from 'react';
import { BubbleChat } from 'flowise-embed-react';
import { db } from '../configuration/firebase'; 
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import './UploadCV.css'; 

export default function UploadCV() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [formDetails, setFormDetails] = useState(null); 
  const [formName, setFormName] = useState(''); 

  const viewPdf = async (pdf) => {
    setSelectedPdf(pdf);
    setFormName(pdf.name);

   
    const formDocRef = doc(db, 'Forms', pdf.name); 
    const formDocSnapshot = await getDoc(formDocRef);
    
    if (formDocSnapshot.exists()) {
      setFormDetails(formDocSnapshot.data());
    } else {
      setFormDetails(null);
    }
  };

  const clearSelectedPdf = () => {
    setSelectedPdf(null);
    setFormDetails(null);
    setFormName('');
  }

  useEffect(() => {
    const fetchPDFs = async () => {
      const pdfsCollection = collection(db, 'pdfs');
      const pdfsSnapshot = await getDocs(pdfsCollection);
      const pdfList = pdfsSnapshot.docs.map((pdfDoc) => {
        const pdfData = pdfDoc.data();
        return { id: pdfDoc.id, ...pdfData };
      });
      setPdfs(pdfList);
    }

    fetchPDFs();
  }, []);

  return (
    <div>
      <BubbleChat chatflowid="cea7bf3b-09cc-428f-8a6c-680f4ed8569d" apiHost="https://bluetab-tf.onrender.com" />

      <div>
        <h2>PDFs en Firestore:</h2>
        <ul>
          {pdfs.map((pdf, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => viewPdf(pdf)}
              >
                {pdf.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {selectedPdf && (
        <div>
          <h2>PDF Seleccionado: {selectedPdf.name}</h2>
          <p>Texto del PDF:</p>
          <div className="pdf-text-container">
            <pre>{selectedPdf.text}</pre>
          </div>
          {formDetails && (
            <div>
              <h2>Detalles del Formulario:</h2>
              <p>Nombre: {formName}</p> 
              <p>Experiencia Laboral: {formDetails.experienciaLaboral}</p> 
            </div>
          )}
        </div>
      )}
    </div>
  );
}
