
import React from 'react';


const BusTable = ({ buses, onRowClick }) => {
  return (
    <table className="table table-hover mb-0">
    <thead className="table-dark">
      <tr>
        <th>Número de Bus</th>
        <th>Placa</th>
        <th>Marca</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {buses.map((bus) => (
        <tr 
        key={bus.id} 
        onClick={() => onRowClick(bus.id)}
        style={{ cursor: "pointer" }}
        className="hover-effect" 
      >
          <td>{bus.numeroBus}</td>
          <td>{bus.placa}</td>
          <td>{bus.marca?.nombre}</td>
          <td>
            <span className={`badge ${bus.activo ? "bg-success" : "bg-danger"}`}>
              {bus.activo ? "Activo" : "Inactivo"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default BusTable;