import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Fruit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            size: '',
            color: '',
            fruits: [],
        }
    }

    componentDidMount() {
        this.fetchFruits();
    }

    fetchFruits() {
        axios.get(`/api/fruits`)
            .then(response => {
                this.setState({
                    fruits: response.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getFruit(e, fruit) {
        this.setState({
            id: fruit.id,
            name: fruit.name,
            size: fruit.size,
            color: fruit.color,
        })
    }

    submit(event, id) {
        event.preventDefault();
        if (id == 0) {
            axios.post(`/api/fruits`, {
                name: this.state.name,
                size: this.state.size,
                color: this.state.color,
            })
                .then(response => {
                    this.fetchFruits();
                    this.clearForm();
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.put(`/api/fruits/${id}`, {
                name: this.state.name,
                size: this.state.size,
                color: this.state.color,
            })
                .then(response => {
                    this.fetchFruits();
                    this.clearForm();
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    deleteFruit(e, id) {
        axios.delete(`/api/fruits/${id}`)
            .then(response => {
                this.fetchFruits();
            })
            .catch(err => {
                console.log(err)
            })
    }

    nameChange(e) {
        this.setState({
            name: event.target.value
        })
    }

    sizeChange(e) {
        this.setState({
            size: event.target.value
        })
    }

    colorChange(e) {
        this.setState({
            color: event.target.value
        })
    }

    clearForm() {
        this.setState({
            id: 0,
            name: '',
            size: '',
            color: '',
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">
                                <h2>Frutas</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <form onSubmit={(e) => this.submit(e, this.state.id)}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Nombre *</label>
                                                <input
                                                    className="form-control"
                                                    onChange={(e) => this.nameChange(e)}
                                                    value={this.state.name}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label>Tamaño *</label>
                                                <select
                                                    value={this.state.size}
                                                    className="custom-select"
                                                    onChange={(e) => this.sizeChange(e)}
                                                >
                                                    <option value="">Selecciona</option>
                                                    <option value="0">pequeño</option>
                                                    <option value="1">mediano</option>
                                                    <option value="2">grande</option>
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <label>Color</label>
                                                <input
                                                    className="form-control"
                                                    value={this.state.color}
                                                    onChange={(e) => this.colorChange(e)}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <button type="submit" className="btn btn-success mt-4">Guardar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="row mt-3">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Tamaño</th>
                                            <th>Color</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.fruits.map(fruit =>
                                            <tr>
                                                <td>{fruit.name}</td>
                                                <td>{fruit.size_name}</td>
                                                <td>{fruit.color}</td>
                                                <td>
                                                    <button onClick={(e) => this.getFruit(e, fruit)}
                                                            className="btn btn-warning">Editar
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={(e) => this.deleteFruit(e, fruit.id)}
                                                            className="btn btn-danger">Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Fruit;

if (document.getElementById('fruit')) {
    ReactDOM.render(<Fruit/>, document.getElementById('fruit'));
}
