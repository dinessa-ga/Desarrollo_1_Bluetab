import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Asegúrate de que la importación sea correcta
import { db } from '../configuration/firebase';
import DataList from './Datalist';
import './Form.css'; // Asegúrate de que el archivo de estilos se llame "Form.css" o cámbialo según corresponda.

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    education_institution: '',
    education_institution_title: '',
    education_startMonth: '',
    education_startYear: '',
    education_lastMonth: '',
    education_lastYear: '',
    certification_company: '',
    certification_name: '',
    certification_startMonth: '',
    certification_startYear: '',
    certification_lastMonth: '',
    certification_lastYear: '',
    experience_nameCompany: '',
    experience_position: '',
    experience_startMonth: '',
    experience_startYear: '',
    experience_lastMonth: '',
    experience_lastYear: '',
    knowledge: '',
  });

  const updateFormDataFromPDF = (data) => {
    setFormData({
      ...data,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guarda los datos en Cloud Firestore
      const formDataCollection = collection(db, 'Forms'); // Reemplaza 'Forms' con el nombre de tu colección
      await addDoc(formDataCollection, formData);

      console.log('Datos guardados en Firestore con éxito.');
    } catch (error) {
      console.error('Error al guardar los datos en Firestore:', error);
    }
  };

  return (
    <div>
      <h2>Form de Datos</h2>
      <form className="container-form" id="container-form" onSubmit={handleSubmit}>
        <section>
          <label htmlFor="name" className="group-title">
            Nombre
          </label>
          <input
            type="text"
            className="group-large-input"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="summary" className="group-title">
            Resumen
          </label>
          <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} />
        </section>
        <section>
          <label className="group-title">Educación</label>
          <div className="main-input-group">
            <input
              type="text"
              className="group-large-input"
              placeholder="Institución Educativa"
              id="education_institution"
              name="education_institution"
              value={formData.education_institution}
              onChange={handleChange}
            />

            <input
              type="text"
              className="group-large-input"
              placeholder="Título"
              id="education_institution_title"
              name="education_institution_title"
              value={formData.education_institution_title}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="education_startDate">Fecha de inicio</label>
          <div className="container-date">
            <input
              type="text"
              className="education-input date"
              placeholder="Mes"
              id="education_startMonth"
              name="education_startMonth"
              value={formData.education_startMonth}
              onChange={handleChange}
            />

            <input
              type="text"
              className="education-input date"
              placeholder="Año"
              id="education_startYear"
              name="education_startYear"
              value={formData.education_startYear}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="education_lastMonth">Fecha de finalización</label>
          <div className="container-date">
            <input
              type="text"
              className="date"
              placeholder="Mes"
              id="education_lastMonth"
              name="education_lastMonth"
              value={formData.education_lastMonth}
              onChange={handleChange}
            />

            <input
              type="text"
              className="date"
              placeholder="Año"
              id="education_lastYear"
              name="education_lastYear"
              value={formData.education_lastYear}
              onChange={handleChange}
            />
          </div>
        </section>

        <section>
          <p className="group-title">Certificaciones y cursos</p>
          <div className="main-input-group">
            <input
              type="text"
              className="group-large-input"
              placeholder="Empresa emisora"
              id="certification_company"
              name="certification_company"
              value={formData.certification_company}
              onChange={handleChange}
            />

            <input
              type="text"
              className="group-large-input"
              placeholder="Nombre de la certificación o curso"
              id="certification_name"
              name="certification_name"
              value={formData.certification_name}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="education_startDate">Fecha de inicio</label>
          <div className="container-date">
            <input
              type="text"
              className="date"
              placeholder="Mes"
              id="certification_startMonth"
              name="certification_startMonth"
              value={formData.certification_startMonth}
              onChange={handleChange}
            />

            <input
              type="text"
              className="date"
              placeholder="Año"
              id="certification_startYear"
              name="certificationn_startYear"
              value={formData.certification_startYear}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="education_lastMonth">Fecha de finalización</label>
          <div className="container-date">
            <input
              type="text"
              className="date"
              placeholder="Mes"
              id="certification_lastMonth"
              name="certification_lastMonth"
              value={formData.certification_lastMonth}
              onChange={handleChange}
            />

            <input
              type="text"
              className="date"
              placeholder="Año"
              id="certification_lastYear"
              name="certification_lastYear"
              value={formData.certification_lastYear}
              onChange={handleChange}
            />
          </div>
        </section>

        <section>
          <p className="group-title">Experiencia laboral</p>
          <div className="main-input-group">
            <input
              type="text"
              className="group-large-input"
              placeholder="Nombre de la empresa"
              id="experience_nameCompany"
              name="experience_nameCompany"
              value={formData.experience_nameCompany}
              onChange={handleChange}
            />

            <input
              type="text"
              className="group-large-input"
              placeholder="Cargo"
              id="experience_position"
              name="experience_position"
              value={formData.experience_position}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="education_startDate">Fecha de inicio</label>
          <div className="container-date">
            <input
              type="text"
              className="date"
              placeholder="Mes"
              id="experience_startMonth"
              name="experience_startMonth"
              value={formData.experience_startMonth}
              onChange={handleChange}
            />

            <input
              type="text"
              className="date"
              placeholder="Año"
              id="experience_startYear"
              name="experience_startYear"
              value={formData.experience_startYear}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="experience_lastMonth">Fecha de finalización</label>
          <div className="container-date">
            <input
              type="text"
              className="date"
              placeholder="Mes"
              id="experience_lastMonth"
              name="experience_lastMonth"
              value={formData.experience_lastMonth}
              onChange={handleChange}
            />

            <input
              type="text"
              className="date"
              placeholder="Año"
              id="experience_lastYear"
              name="experience_lastYear"
              value={formData.experience_lastYear}
              onChange={handleChange}
            />
          </div>
        </section>

        <button type="submit">Guardar en Firestore</button>
      </form>
      <DataList formData={formData}/>
    </div>
  );
}

export default Form;
