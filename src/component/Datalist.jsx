import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configuration/firebase';

function DataList({ formData }) { 
  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDataCollection = collection(db, 'Forms');
        const querySnapshot = await getDocs(formDataCollection);

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        setDataList(data);
      } catch (error) {
        console.error('Error al obtener los datos de Firestore:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <h2>Lista de Datos</h2>
      <ul>
        {dataList.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item.name} 
          </li>
        ))}
      </ul>
      {selectedItem && (
        <div>
          <h3>Experiencia Laboral de {selectedItem.name}</h3>
          <p>Resumen: {selectedItem.summary}</p>
          <p>Institución Educativa: {selectedItem.education_institution}</p>
          </div>
      )}
    </div>
  );
}

export default DataList;
