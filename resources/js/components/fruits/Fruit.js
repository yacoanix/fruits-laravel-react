import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import TableRow from "./TableRow";
import TableRowForm from "./TableRowForm";

class Fruit extends Component {
    constructor(props) {
        super(props);
        this.deleteFruit = this.deleteFruit.bind(this);
        this.getFruit = this.getFruit.bind(this);
        this.handleChangeFormEdit = this.handleChangeFormEdit.bind(this);
        this.state = {
            form: {
                name: '',
                size: '',
                color: '',
            },
            formEdit: {
                id: 0,
                name: '',
                size: '',
                color: '',
            },
            fruits: [],
        }
    }

    handleChangeForm = e => this.setState({
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    });

    handleChangeFormEdit = e => this.setState({
        formEdit: {
            ...this.state.formEdit,
            [e.target.name]: e.target.value
        }
    });

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
            formEdit: {
                id: fruit.id,
                name: fruit.name,
                size: fruit.size,
                color: fruit.color,
            }
        })
    }

    submit(event, id) {
        event.preventDefault();
        if (id == 0) {
            this.storeFruit()
        } else {
            this.updateFruit(id)
        }
    }

    storeFruit() {
        axios.post(`/api/fruits`, {
            name: this.state.form.name,
            size: this.state.form.size,
            color: this.state.form.color,
        })
            .then(response => {
                this.fetchFruits();
                this.clearForm();
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Guardado realizado correctamente',
                })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ha salido mal',
                })
                if (err.response && err.response.status == 422) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                }
            })
    }

    updateFruit(id) {
        axios.put(`/api/fruits/${id}`, {
            name: this.state.formEdit.name,
            size: this.state.formEdit.size,
            color: this.state.formEdit.color,
        })
            .then(response => {
                this.fetchFruits();
                this.clearFormEdit();
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Actualizado realizado correctamente',
                })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ha salido mal',
                })
                if (err.response && err.response.status == 422) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                }
            })
    }


    deleteFruit(e, id) {
        Swal.fire({
            title: '¿Estas seguro de querer eliminar esta fruta?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/fruits/${id}`)
                    .then(response => {
                        this.fetchFruits();
                        Swal.fire(
                            'Eliminado',
                            'Tu fruta ha sido eliminada correctamente',
                            'success'
                        )
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo ha salido mal',
                        })
                        console.log(err);
                        if (err.response) {
                            console.log(err.response.data);
                            console.log(err.response.status);
                        }
                    })
            }
        })
    }

    clearForm() {
        this.setState({
            form: {
                name: '',
                size: '',
                color: '',
            },
        })
    }

    clearFormEdit() {
        this.setState({
            formEdit: {
                id: 0,
                name: '',
                size: '',
                color: '',
            },
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
                                    <form
                                        className="form"
                                        onSubmit={(e) => this.submit(e, 0)}
                                    >
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Nombre *</label>
                                                <input
                                                    className="form-control"
                                                    onChange={this.handleChangeForm}
                                                    value={this.state.form.name}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label>Tamaño *</label>
                                                <select
                                                    value={this.state.form.size}
                                                    className="custom-select"
                                                    onChange={this.handleChangeForm}
                                                    name="size"
                                                    required
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
                                                    value={this.state.form.color}
                                                    onChange={this.handleChangeForm}
                                                    name="color"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <button type="submit" className="btn btn-success mt-4">Guardar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="row mt-3">
                                    <form
                                        className="col-12"
                                        onSubmit={(e) => this.submit(e, this.state.formEdit.id)}
                                    >
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
                                            {this.state.fruits.map(fruit => {
                                                    if (fruit.id != this.state.formEdit.id) {
                                                        return (
                                                            <TableRow
                                                                key={fruit.id}
                                                                fruit={fruit}
                                                                getFruit={this.getFruit}
                                                                deleteFruit={this.deleteFruit}
                                                            />
                                                        )
                                                    } else {
                                                        return (
                                                            <TableRowForm
                                                                key={fruit.id}
                                                                formEdit={this.state.formEdit}
                                                                handleChangeFormEdit={this.handleChangeFormEdit}
                                                            />
                                                        )
                                                    }
                                                }
                                            )}
                                            </tbody>
                                        </table>
                                    </form>
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
