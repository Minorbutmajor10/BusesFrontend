
import React from 'react';


const BusTable = ({
  buses,
  currentPage,       
  totalPages,       
  pageSize,          
  onPageChange,      
  onSizeChange,      
  onRowClick
}) => {

  return (
    <div className="table-container mt-4">

      <div className="mb-3">
        <select
          className="form-select"
          value={pageSize}
          onChange={(e) => onSizeChange(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>
              Mostrar {size} elementos
            </option>
          ))}
        </select>
      </div>

      <table className="table table-hover mb-0 mt-5">
        <thead className="table-dark">
          <tr>
            <th className="text-center align-middle" >Número de Bus</th>
            <th className="text-center align-middle" >Placa</th>
            <th className="text-center align-middle" >Marca</th>
            <th className="text-center align-middle" >Estado</th>
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
              <td className="text-center align-middle">{bus.numeroBus}</td>
              <td className="text-center align-middle">{bus.placa}</td>
              <td className="text-center align-middle">{bus.marca?.nombre}</td>
              <td className="text-center align-middle">
                <span className={`badge ${bus.activo ? "bg-success" : "bg-danger"}`}>
                  {bus.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default BusTable;