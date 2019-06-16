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
        const { columns, data } = this.props;
        
        console.log("TCL: TableRows -> render -> columns.childItem", columns.childItem !==null)
        let expandVal;
        if (columns.childItem !==null && !expand) {
            expandVal = " + ";
        } else if (columns.childItem !==null && expand) {
            expandVal = " - ";
        } else {
            expandVal = null;
        }

        const hasItem = columns.childItem !==null && columns.map((item, key) => {
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
                                <td key={key}>{this.getDescendantProp(data, column.Value)}</td>
                            );
                        })
                    }
                    {expand ? hasItem : null}
                </tr>
            </tbody>
        );
    }
}

export default TableRows;