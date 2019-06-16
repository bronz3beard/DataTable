import React, { PureComponent } from "react";

//Components
import ExpandableItem from "./expandable-item";

class TableRows extends PureComponent {
    state = {
        expand: false,
    };
    getDescendantProp = (obj, desc) => {
        var arr = desc.split('.');
        while (arr.length && (obj = obj[arr.shift()]));
        return obj;
    }
    toggleHidden = (index) => {
        const { expand } = this.state;
        if(index) {
            this.setState({
                expand: !expand,
            });
        }
    }
    render() {
        const { expand } = this.state;
        const { columns, data, checked } = this.props;

        let expandVal;
        if (!expand) {
            expandVal = " + ";
        } else if (expand) {
            expandVal = " - ";
        } else {
            expandVal = null;
        }

        const hasItem = columns.map((item, key) => {
            return (
                <ExpandableItem key={key} data={data} columns={item.childItem} getDescendantProp={this.getDescendantProp} />
            );
        });

        return (
            <tbody>
                <tr>
                    <td>
                        <div className="expand" onClick={() => this.toggleHidden(data.id)}>
                            {expandVal}
                        </div>
                    </td>
                    {
                        columns.map((column, key) => {
                            return (
                                <td key={key}>{this.getDescendantProp(data, checked ? column.Value : column.commentValue)}</td>
                            );
                        })
                    }
                </tr>
                {expand ? hasItem : null}
            </tbody>
        );
    }
}

export default TableRows;