import { useEffect, useState } from 'react';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

function App() {
    //const [forecasts, setForecasts] = useState();
    const [facturas, setFacturas] = useState();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [form, setForm] = useState({
        id: 0,
        name: "",
        description: "",
        total: 0
    })

    useEffect(() => {
       //populateWeatherData();
        cargarFacturas();
    }, []);

    const contents = facturas === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <Button color="primary" onClick={() => setMostrarModal(true) }>Agregra nuevo producto</Button>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Descripcion</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map(fact =>
                        <tr key={fact.id}>
                            <td>{fact.id}</td>
                            <td>{fact.name}</td>
                            <td>{fact.description}</td>
                            <td>{fact.total}</td>
                            <td><Button color="danger" onClick={() => eliminar(fact.id)}>Eliminar</Button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal isOpen={mostrarModal}>
                <ModalHeader>
                    <div><h2>Insertar Nuevo producto</h2></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id:</label>
                        <input className="form-control" type="text" name="id" onChange={cambios} />
                    </FormGroup>
                    <FormGroup>
                        <label>Name:</label>
                        <input className="form-control" name='name' type="text" onChange={cambios} />
                    </FormGroup>
                    <FormGroup>
                        <label>Description:</label>
                        <input className="form-control" name='description' type="text" onChange={cambios} />
                    </FormGroup>
                    <FormGroup>
                        <label>Total:</label>
                        <input className="form-control" name='total' type="text" onChange={cambios} />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        insertar();
                    }
                    }> Insertar</Button>
                    <Button className="btn-danger" color="danger" onClick={() => setMostrarModal(false)}> Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    //async function populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    if (response.ok) {
    //        const data = await response.json();
    //        console.log(data)
    //        setForecasts(data);
    //    }
    //}

    function cambios(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    async function cargarFacturas() {
        const respuesta = await fetch('/api/Factura');
        if (respuesta.ok) {
            const datos = await respuesta.json();
            console.log(datos);
            setFacturas(datos);
        }
    }

    async function insertar() {
        console.log(JSON.stringify(form));
        const respuesta = await fetch('/api/Factura', {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Indicate the type of data being sent
            },
            body: JSON.stringify(form)
        });
        const dato = await respuesta.json();
        setFacturas(dato);
        setMostrarModal(false);
    }

    async function eliminar(id) {
        const respuesta = await fetch('/api/Factura/'+id, {
            method: 'DELETE', // Specify the HTTP method as DELETE
        });
        const dato = await respuesta.json();
        setFacturas(dato);
        setMostrarModal(false);
    }
}

export default App;