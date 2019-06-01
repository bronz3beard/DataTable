import React, { PureComponent } from "react";

//Components
import Preloader from "./pre-loader";
import TableHeaders from "./table-headers";
import TableRows from "./table-rows";
import Pagination from "./pagination";

class RecordTable extends PureComponent {
    state = {
        columns: [
            {
                Header: "Id",
                Value: "id",
                sortOn: "id",
            }, {
                Header: "Content",
                Value: "body",
                sortOn: "body",
            }, {
                Header: "Email",
                Value: "email",
                sortOn: "email",
            }, {
                Header: "Name",
                Value: "name",
                sortOn: "name",
            },
        ],
        data: [],

        isLoading: true,

        sortOrder: {
            key: "asc",
        },
        currentPage: 1,
        recordsPerPage: 30,

        query: "",
        PlaceHolder: "Table filter",
    };
    componentDidMount() {
        this.loadRecordsFromServer();
    }
    // Initial call to the server for records 
    loadRecordsFromServer() {
        const xmlhr = new XMLHttpRequest();
        const url = "https://jsonplaceholder.typicode.com/comments";
        xmlhr.open("GET", url, true);
        xmlhr.onload = () => {
            if (xmlhr.readyState === xmlhr.DONE) {
                if (xmlhr.status === 200) {
                    const data = JSON.parse(xmlhr.responseText);
                    this.setState({
                        data: data,
                        isLoading: false,
                    });
                }
            }
        };
        xmlhr.send();
    }

    // Column Sort handler + Logic
    columnSort = (key) => {
        const { data, sortOrder } = this.state;
        const tableData = data

        let newData;
        if (key === "id") {
            newData = tableData.sort((a, b) => (sortOrder[key] === "asc" ?
                a[key] - b[key] :
                b[key] - a[key])
            );
        } else {
            newData = tableData.sort((a, b) => (sortOrder[key] === "asc" ?
                a[key].localeCompare(b[key]) :
                b[key].localeCompare(a[key]))
            );
        }
        this.setState({
            data: newData,
            sortOrder: {
                [key]: sortOrder[key] === "asc" ? "desc" : "asc"
            },
            isLoading: false,
            ...data,
        });
    }
    //on page table filter handler
    tableSearchFilter = (event) => {
        let query = event.target.value.substr(0, 100);
        this.setState({
            query: query,
        });
    }
    //Pagination 
    handlePageChange = (event) => {
        const currentPage = Number(event.target.id);
        this.setState({
            currentPage: currentPage,
        });
    }
    // Logic for pagination next page (pages go forward 1 at a time)
    increment = () => {
        const { currentPage } = this.state;
        this.setState({
            currentPage: currentPage + 1,
        });
    }
    // Logic for pagination previous page (pages go back 1 at a time)
    decrement = () => {
        const { currentPage } = this.state;
        this.setState({
            currentPage: currentPage - 1,
        });
    }
    // Logic for pagination first page
    first = () => {
        this.setState({
            currentPage: 1,
        });
    }
    // Logic for pagination last page
    last = () => {
        const { recordsPerPage, data } = this.state;
        this.setState({
            currentPage: Math.ceil(data.length / recordsPerPage),
        });
    }
    render() {
        const { data, columns, query, PlaceHolder, 
            currentPage, recordsPerPage, isLoading 
        } = this.state;

        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

        //table data filtered by query for the on page table filter
        const lowercasedFilter = query.toLowerCase();
        const tableData = data.filter((item) => {
            return ( 
                Object.keys(item).some(key =>
                item[key].toString().toLowerCase().indexOf(lowercasedFilter) !== -1 ||
                !lowercasedFilter
            ));
        }).slice(indexOfFirstRecord, indexOfLastRecord);

        //on page table data filter
        const recordFilter =
            <form className="filterForm">
                <input
                    className="input-sm"
                    id="table-filter"
                    type="text"
                    value={query}
                    placeholder={PlaceHolder}
                    onChange={this.tableSearchFilter}
                />
            </form>

        return (
            isLoading ? <Preloader /> :
                <div>
                    {recordFilter}
                    <table id="dataTable">
                        <TableHeaders columns={columns} columnSort={this.columnSort} />
                        {
                            tableData.map((record, key) => {
                                return (
                                    <TableRows
                                        key={key}
                                        columns={columns}
                                        data={record}
                                    />
                                );
                            })
                        }
                    </table>
                    <Pagination
                        data={data}
                        recordsPerPage={recordsPerPage}
                        currentPage={currentPage}
                        handlePageChange={this.handlePageChange}
                        handleDecrement={this.decrement}
                        handleFirst={this.first}
                        handleFast={this.last}
                        handleIncrement={this.increment}
                    />
                </div>
        )
    }
}

export default RecordTable;