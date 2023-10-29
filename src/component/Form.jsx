import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../configuration/firebase';
import DataList from './DataList'; // Asegúrate de importar DataList si aún no lo has hecho

function Form() {
  const [formData, setFormData] = useState({
    nombre: '',
    experienciaLaboral: '',
    // Agrega más campos según tus necesidades
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guarda los datos en Cloud Firestore
      const formDataCollection = collection(db, 'Forms'); // Reemplaza 'Forms' con el nombre de tu colección
      await addDoc(formDataCollection, formData);

      // Limpia el Form después de guardar
      setFormData({
        nombre: '',
        experienciaLaboral: '',
        // Restablece otros campos si es necesario
      });

      console.log('Datos guardados en Firestore con éxito.');
    } catch (error) {
      console.error('Error al guardar los datos en Firestore:', error);
    }
  };

  return (
    <div>
      <h2>Form de Datos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Experiencia Laboral:</label>
          <textarea
            name="experienciaLaboral"
            value={formData.experienciaLaboral}
            onChange={handleChange}
          />
        </div>
        {/* Agrega más campos aquí según tus necesidades */}
        <button type="submit">Guardar en Firestore</button>
      </form>

      {/* Agrega el componente DataList para mostrar los datos */}
      <DataList />
    </div>
  );
}

export default Form;
