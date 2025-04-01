import { useState, useEffect } from 'react';
import BusTable from "./components/BusTable";
import BusDetailsModal from "./components/BusDetailsModal";
import { fetchBuses, fetchBusDetails } from './services/apis';


function App() {
  const [buses, setBuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBus, setSelectedBus] = useState(null);
  const pageSize = 10;

  
  useEffect(() => {
    const loadBuses = async () => {
      try {
        const data = await fetchBuses(currentPage, pageSize);
        setBuses(data.content);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };
    loadBuses();
  }, [currentPage]);

  
  const handleRowClick = async (id) => {
    try {
      const data = await fetchBusDetails(id);
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
                 <BusTable 
                buses={buses} 
                onRowClick={handleRowClick} 
              />
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