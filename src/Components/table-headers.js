import React, { PureComponent } from "react";

class TableHeaders extends PureComponent { //child of RecordTable
    state = {
        width: window.innerWidth,
    };
    componentDidMount() {
        window.addEventListener("resize", this.resizeWindow);
    }
    resizeWindow = () => {
        this.setState({
            width: window.innerWidth,
        });
        //console.log(window.innerWidth);
    }
    render() {
        const { columns, columnSort, checked } = this.props;

        if (this.state.width > 760) {
            return (
                <tbody>
                    <tr>
                        <col />
                        {
                            columns.map((column) => {
                                return (
                                    <th id="tableHeaders" key={column.columnId} onClick={() => columnSort(!checked ? column.sortOn : column.locationSortOn)}>
                                        {!checked ? column.Header : column.locationHeader}
                                    </th>
                                );
                            })
                        }
                    </tr>
                </tbody>
            );
        } else {
            return (<div />);
        }
    }
}

export default TableHeaders;