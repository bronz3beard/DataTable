import React, { PureComponent } from "react";

class TreeItem extends PureComponent { //Child of TableRows
    render() {
        const { columns, data, checked, linkVal, getDescendantProp } = this.props;

        return (
            <tr>
                <td>
                    <div className="expand">
                        {linkVal}
                    </div>
                </td>
                {
                    columns.map((column, key) => {
                        return (
                            <td className="treeitem" key={key} >
                                {getDescendantProp(data, !checked ? column.Value : column.locationValue)}
                            </td>
                        );
                    })
                }
            </tr>
        );
    }
}

export default TreeItem;