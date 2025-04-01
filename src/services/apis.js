
export const fetchBuses = async (page, size = 10) => {
    try {
      const response = await fetch(`http://localhost:8090/bus?page=${page}&size=${size}`);
      if (!response.ok) {
        throw new Error('Error al obtener los buses');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching buses:', error);
      throw error;
    }
  };
  
  export const fetchBusDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8090/bus/find/${id}`);
      if (!response.ok) throw new Error('Error al obtener detalles');
      return await response.json();
    } catch (error) {
      console.error('Error en fetchBusDetails:', error);
      throw error;
    }
  };