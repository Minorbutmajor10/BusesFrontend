import { Modal, Button } from 'react-bootstrap';

export default function BusDetailsModal({ bus, onClose }) {
  return (
    <Modal
      show={!!bus}
      onHide={onClose}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Detalles del Bus #{bus?.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Número:</strong> {bus?.numeroBus}</p>
            <p><strong>Placa:</strong> {bus?.placa}</p>
            <p><strong>Marca:</strong> {bus?.marca?.nombre}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Estado:</strong>
              <span className={`badge ${bus?.activo ? 'bg-success' : 'bg-danger'} ms-2`}>
                {bus?.activo ? 'Activo' : 'Inactivo'}
              </span>
            </p>
            <p><strong>Fecha Registro:</strong> {new Date(bus?.fechaCreacion).toLocaleDateString()}</p>
            <p><strong>Características:</strong> {bus?.caracteristicas}</p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}