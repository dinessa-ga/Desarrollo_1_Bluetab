import React, { useState } from 'react';
import FileUpload from './component/Fileupload';
import { BubbleChat } from 'flowise-embed-react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    abstract: '',
  });
  
  const [responseFromFlowise, setResponseFromFlowise] = useState(null);

  const updateFormDataFromPDF = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      name: data.name,
    }));
  };

  const saveDataToAPI = async () => {
    try {
      const textToFlowise = formData.name; 
      console.log('Datos que se envían a Flowise:', textToFlowise);


    } catch (error) {
      console.error('Error al guardar los datos en el servidor:', error);
    }
  };

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
    <div id='containerImg'>
    <div id='img1'></div>
    </div>
      <BubbleChat chatflowid="cea7bf3b-09cc-428f-8a6c-680f4ed8569d" apiHost="https://bluetab-tf.onrender.com" />
      <div id="formCv">
          <h1>Subir CV</h1>
        <FileUpload updateFormData={updateFormDataFromPDF} />
        <h2>Formulario de Datos:</h2>
        {isFormVisible ? ( 
          <form>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </form>
        ) : (
          <button onClick={toggleFormVisibility}>Llenar Formulario</button>
        )}
        {isFormVisible && (
          <button onClick={saveDataToAPI}>Guardar en el servidor</button>
        )}
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
