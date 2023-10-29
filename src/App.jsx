// App.js
import React, { useState } from 'react';
import FileUpload from './component/Fileupload';
import { BubbleChat } from 'flowise-embed-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    abstract: '',
    // Agrega aquí otros campos de tu formulario...
  });

  const [responseFromFlowise, setResponseFromFlowise] = useState(null);

  const updateFormDataFromPDF = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      name: data.name,
      // Agrega más campos aquí si es necesario.
    }));
  };

  const saveDataToAPI = async () => {
    try {
      // Realiza una solicitud a Flowise con el texto extraído del PDF
      const textToFlowise = formData.name; // Cambia a los datos que deseas enviar a Flowise
      console.log('Datos que se envían a Flowise:', textToFlowise);

      // Aquí debes realizar la solicitud a Flowise y gestionar la respuesta
      // Por ejemplo:
      // const response = await sendTextToFlowise(textToFlowise);
      // setResponseFromFlowise(response);

    } catch (error) {
      console.error('Error al guardar los datos en el servidor:', error);
    }
  };

  // En este useEffect, puedes realizar acciones adicionales con la respuesta de Flowise si es necesario.

  return (
    <>
      <BubbleChat chatflowid="cea7bf3b-09cc-428f-8a6c-680f4ed8569d" apiHost="https://bluetab-tf.onrender.com" />
      <div id="formCv">
        <h1>Subir CV</h1>
        <FileUpload updateFormData={updateFormDataFromPDF} />
        <h2>Formulario de Datos:</h2>
        <form>
          {/* Renderiza los campos de tu formulario aquí... */}
        </form>
        <button onClick={saveDataToAPI}>Guardar en el servidor</button>
        {responseFromFlowise && (
          <div>
            <h3>Respuesta de Flowise:</h3>
            <pre>{JSON.stringify(responseFromFlowise, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
