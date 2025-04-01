import { useState, useEffect } from 'react';
import BusDetailsModal from "./components/BusDetailsModal";


function App() {
  const [buses, setBuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBus, setSelectedBus] = useState(null);
  const pageSize = 10;

  
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/bus?page=${currentPage}&size=10`
        );
        const data = await response.json();
        setBuses(data.content);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };
    fetchBuses();
  }, [currentPage]);

  
  const fetchBusDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8090/bus/fid/${id}`);
      const data = await response.json();
      setSelectedBus(data);
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column p-0">
      

      <div className="row bg-light shadow-sm justify-content-center">
        <div className="col-12 text-center py-3">
        <h1 className="text-center mb-4">Listado de Buses</h1>
        </div>
      </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            {buses.length > 0 ? (
              <>
                 <div className="table-responsive  rounded-3">
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
                      onClick={() => {
                        console.log('Click en bus:', bus.id); 
                        setSelectedBus(bus);
                      }}
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
                </div>

                <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 0 && "disabled"}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(p => p - 1)}
                      >
                        Anterior
                      </button>
                    </li>
                    
                    <li className="page-item active">
                      <span className="page-link">
                        Página {currentPage + 1} de {totalPages}
                      </span>
                    </li>
                    
                    <li className={`page-item ${currentPage >= totalPages - 1 && "disabled"}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(p => p + 1)}
                      >
                        Siguiente
                      </button>
                    </li>
                  </ul>
                </nav>
                </div>
              </>
            ) : (
              <div className="alert alert-info text-center">
                No hay buses registrados
              </div>
            )}
          </div>
        </div>



      {selectedBus && (
        <BusDetailsModal
          bus={selectedBus}
          onClose={() => setSelectedBus(null)}
        />
      )}
    </div>
  );
}

export default App;