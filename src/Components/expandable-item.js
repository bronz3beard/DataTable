import React, { PureComponent } from "react";

class ExpandableItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isExpanded: this.props.expanded,
            isLoading: false,
        }
    }

    render() {
        const { data, columns, getDescendantProp } = this.props;

        return(
            <tr>
                {
                    columns && columns.map((column, key) => {
                        return (
                            <td key={key}>
                                {getDescendantProp(data, column.Value)}
                            </td>
                        );
                    })

                }
            </tr>
        );
    }
}

export default ExpandableItem;