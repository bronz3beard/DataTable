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
            <td>
                {
                    columns && columns.map((column, key) => {
                        return (
                            <div key={key}>
                                {getDescendantProp(data, column.Value)}
                            </div>
                        );
                    })

                }
            </td>
        );
    }
}

export default ExpandableItem;