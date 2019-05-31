import React, { PureComponent } from "react";

class TableRows extends PureComponent {
    state = {
        isLoading: false,
    };

    render() {

        const { columns, data } = this.props;

        return (
            <tbody>
                <tr className="tableRow">
                    {
                        columns.map((column, key) => {
                            return (
                                <td key={key}>
                                    {getDescendantProp(data, column.Value)}
                                </td>
                            );
                        })
                    }
                </tr>
            </tbody>
        );
    }
}

export default TableRows;

function getDescendantProp(obj, desc) {
    var arr = desc.split('.');
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}