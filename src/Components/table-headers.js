import React, { PureComponent } from "react";

class TableHeaders extends PureComponent {
    state = {
        width: window.innerWidth,
    };
    componentDidMount() {
        window.addEventListener("resize", this.resizeWindow);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeWindow);
    }
    resizeWindow = () => {
        this.setState({
            width: window.innerWidth,
        });
        //console.log(window.innerWidth);
    }
    render() {
        const { columns, columnSort } = this.props;

        if (this.state.width > 760) {
            return (
                <tbody>
                    <tr>
                        <col />
                        {
                            columns.map((column, key) => {
                                return (
                                    <th id="tableHeaders" key={key} onClick={() => columnSort(column.sortOn)}>
                                        {column.Header}
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