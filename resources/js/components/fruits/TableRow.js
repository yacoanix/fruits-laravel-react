import React from "react";

function TableRow(props) {
    return (
        <tr>
            <td>{props.fruit.name}</td>
            <td>{props.fruit.size_name}</td>
            <td>{props.fruit.color}</td>
            <td>
                <a onClick={(e) => props.getFruit(e, props.fruit)}
                        className="btn btn-warning">Editar
                </a>
            </td>
            <td>
                <a onClick={(e) => props.deleteFruit(e, props.fruit.id)}
                        className="btn btn-danger">Eliminar
                </a>
            </td>
        </tr>
    )
}

export default TableRow;
