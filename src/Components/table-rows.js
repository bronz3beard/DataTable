import React, { PureComponent } from "react";

import Preloader from "../Components/pre-loader";
import TreeItem from "../Components/tree-item";

class TableRows extends PureComponent { //child of RecordTable
    state = {
        treeData: this.props.data,
        isLoading: false,
    };
    loadTreeItemsFromServer(recordUri) {// + recordUri
        const xmlhr = new XMLHttpRequest();
        xmlhr.open("GET", "home/gettreeitems/" + recordUri, true);
        xmlhr.onload = () => {
            const data = JSON.parse(xmlhr.responseText);
            var updateVal = this.props.data;
            updateVal.Items = data;
            //updateVal.map((index) => { return index.child = data });
            this.setState({
                treeData: updateVal,
                isLoading: false,
            });
            //console.log(this.state.isLoading);
        };
        xmlhr.send();
    }
    toggleHidden(index) {
        var updateVal = this.props.data;
        updateVal.Collapse = !updateVal.Collapse;

        this.setState({
            ...this.state.treeData,
            updateVal,
        });

        this.loadTreeItemsFromServer(index);
    }
    render() {
        const { treeData, isLoading } = this.state;
        const { columns, data, checked } = this.props;


        let expandVal;
        if (treeData.IsContainer && treeData.Collapse) {
            expandVal = " + ";
        } else if (treeData.IsContainer && !treeData.Collapse) {
            expandVal = " - ";
        } else {
            expandVal = null;
        }

        const treeItems = isLoading === true && !data.Collapse ? <Preloader /> : treeData.Items !== null && data.IsContainer && !data.Collapse ? treeData.Items.map((record, key) => {
            return (
                <TreeItem columns={columns} data={record} key={key} getDescendantProp={getDescendantProp}>
                    {
                        columns.map((column, key) => {
                            return (
                                <td className="treeitem" key={key}>
                                    {record}
                                </td>
                            );
                        })
                    }
                </TreeItem>
            );
        }) : null

        return (
            <tbody>
                <tr className="tableRow">
                    <td>
                        <div className="expand" onClick={treeData.IsContainer ? () => this.toggleHidden(data.id) : null}>
                            {expandVal}
                        </div>
                    </td>
                    {
                        columns.map((column, key) => {
                            return (
                                <td key={key}>
                                    {data.name.first}
                                </td>
                            );
                        })
                    }
                </tr>
                {treeItems}
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