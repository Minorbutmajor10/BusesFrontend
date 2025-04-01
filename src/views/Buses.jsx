import { useState, useEffect } from 'react';
import BusTable from "../components/BusTable";
import BusDetailsModal from "../components/BusDetailsModal";
import { fetchBuses, fetchBusDetails } from '../services/apis';


export default function Buses() {
    const [pageData, setPageData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 10
    });

   
    const [selectedBus, setSelectedBus] = useState(null);


    const loadBuses = async (page = 0, size = pageData.size) => {
        try {
            const data = await fetchBuses(page, size);
            setPageData({
                content: data.content,
                totalPages: data.totalPages,
                number: data.number,
                size: size
            });
        } catch (error) {
            console.error('Error fetching buses:', error);
        }
    };

    useEffect(() => {
        loadBuses();
    }, []);

    
    const handlePageChange = (newPage) => loadBuses(newPage, pageData.size);
    const handleSizeChange = (newSize) => loadBuses(0, newSize);

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
                    {pageData.content.length > 0 ? (
                        <>
                            <div className="table-responsive  rounded-3">
                                <BusTable
                                    buses={pageData.content}
                                    currentPage={pageData.number}
                                    totalPages={pageData.totalPages}
                                    pageSize={pageData.size}
                                    onPageChange={handlePageChange}
                                    onSizeChange={handleSizeChange}
                                    onRowClick={handleRowClick}

                                />
                            </div>

                            <div className="d-flex justify-content-center pagination-container mt-5">
                                <nav>
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${pageData.number === 0 && "disabled"}`}>
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => handlePageChange(pageData.number - 1)}
                                                disabled={pageData.number === 0}
                                            >
                                                Anterior
                                            </button>
                                        </li>

                                        <li className="page-item active">
                                            <span className="page-link">
                                                Página {pageData.number + 1} de {pageData.totalPages}
                                            </span>
                                        </li>

                                        <li className={`page-item ${pageData.number >= pageData.totalPages - 1 && "disabled"}`}>
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => handlePageChange(pageData.number + 1)}
                                                disabled={pageData.number >= pageData.totalPages - 1}
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