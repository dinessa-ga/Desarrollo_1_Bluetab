import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configuration/firebase';

function DataList() {
  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDataCollection = collection(db, 'Forms'); // Asegúrate de usar el mismo nombre de la colección
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
            {item.nombre}
          </li>
        ))}
      </ul>
      {selectedItem && (
        <div>
          <h3>Experiencia Laboral de {selectedItem.nombre}</h3>
          <p>{selectedItem.experienciaLaboral}</p>
          {/* Agrega más campos aquí según tus necesidades */}
        </div>
      )}
    </div>
  );
}

export default DataList;
