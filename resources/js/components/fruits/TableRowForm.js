import React from "react";

function TableRowForm(props) {
    return (
        <tr>
            <td>
                <input
                    className="form-control"
                    onChange={props.handleChangeFormEdit}
                    value={props.formEdit.name}
                    name="name"
                    required
                />
            </td>
            <td>
                <select
                    value={props.formEdit.size}
                    className="custom-select"
                    onChange={props.handleChangeFormEdit}
                    name="size"
                    required
                >
                    <option value="">Selecciona</option>
                    <option value="0">pequeño</option>
                    <option value="1">mediano</option>
                    <option value="2">grande</option>
                </select>
            </td>
            <td>
                <input
                    className="form-control"
                    value={props.formEdit.color}
                    onChange={props.handleChangeFormEdit}
                    name="color"
                />
            </td>
            <td>

            </td>
            <td>
                <button type="submit" className="btn btn-success">Guardar</button>
            </td>
        </tr>
    )
}

export default TableRowForm;
