import React, { PureComponent } from "react";

//Components
import Preloader from "./pre-loader";
import ScrollButton from "./scroll-to-top";
import TableHeaders from "./table-headers";
import TableRows from "./table-rows";
import Pagination from "./pagination";

class RecordTable extends PureComponent {
    state = {
        error: false,
        isLoading: false,
        columns: [
            {
                Header: "",
                commentHeader: "",
                Value: "",
                commentValue: "",
                sortOn: "",
                childItem: null,
            }, {
                Header: "Id",
                commentHeader: "Id",
                Value: "id",
                commentValue: "id",
                sortOn: "id",
                childItem: null,
            }, {
                Header: "Name",
                commentHeader: "Name",
                Value: "name",
                commentValue: "name",
                sortOn: "name",
                childItem: null,
            }, {
                Header: "username",
                commentHeader: "",
                Value: "username",
                commentValue: "",
                sortOn: "username",
                childItem: null,
            }, {
                Header: "Email",
                commentHeader: "Email",
                Value: "email",
                commentValue: "email",
                sortOn: "email",
                childItem: null,
            }, {
                Header: "Phone",
                commentHeader: "",
                Value: "phone",
                commentValue: "",
                sortOn: "phone",
                childItem: null,
            }, {
                Header: "Website",
                commentHeader: "",
                Value: "website",
                commentValue: "",
                sortOn: "website",
                childItem: null,
            }, {
                Header: "Address",
                commentHeader: "",
                Value: "address.city",
                commentValue: "",
                sortOn: "adress.city",
                childItem: [
                    {             
                        Value: "address.zipcode",
                    }, {    
                        Value: "address.street",
                    }
                ],
            }, {
                Header: "",
                commentHeader: "Comment",
                Value: "",
                commentValue: "body",
                sortOn: "body",
                childItem: null,
            }, 
        ],
        data: [],
        checked: false,
        currentPage: 1,
        recordsPerPage: 30,

        sortOrder: {
            key: "asc",
        },

        query: "",
        PlaceHolder: "Table filter",
    };

    componentDidMount() {
        this.loadDataFromServer();
    }
    // Initial call to the server for records 
    loadDataFromServer = () => {
        const { checked } = this.state;
  
        const xmlhr = new XMLHttpRequest();
        const url = !checked ? `https://jsonplaceholder.typicode.com/comments` : `https://jsonplaceholder.typicode.com/users`;
        this.setState({ isLoading: true });

        xmlhr.open("GET", url, true);
        xmlhr.onload = () => {
            if (xmlhr.readyState === xmlhr.DONE) {
                if (xmlhr.status === 200) {
                    const data = JSON.parse(xmlhr.responseText);
                    this.setState({
                        data: data,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        error: true,
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

        const newData = tableData.sort((a, b) => (sortOrder[key] === "asc" ?
            a[key] > b[key] :
            b[key] > a[key])
        );

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
    handleCheckBox = () => {
        const { checked } = this.state;
        this.setState({
            recordsPerPage: 30,
            checked: !checked,
            query: "",
        });
        this.loadDataFromServer();
    }
    //Pagination 
    handlePageChange = (event) => {
        const currentPage = Number(event.target.id);
        const type = event.target.textContent;
        console.log("TCL: RecordTable -> handlePageChange -> type", type)

        this.setState({
            currentPage: currentPage,
        });

        if (type === "Next") {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        } else if (type === "Previous") {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        } else if (type === "〉〉") { //Last
            this.setState({
                currentPage: Math.ceil(this.state.data.length / this.state.recordsPerPage)
            });
        } else if (type === "〈〈") { //First
            this.setState({
                currentPage: 1
            });
        }
    }
    render() {
        const { error, isLoading, data, columns, query, PlaceHolder,
            currentPage, recordsPerPage, checked
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
                <div id="checkbox">
                    <input
                        type="checkbox"
                        id="checkBox"
                        onClick={this.handleCheckBox}
                        defaultChecked="true" /> <strong>Change Data</strong>
                </div>
            </form>

        if (error) {
            return (
                <div className="error">
                    <span>
                        table data has not been fetched.
                    </span>
                </div>
            );
        }
        
        return (
            <div>
                {recordFilter}
                <table id="dataTable">
                    <TableHeaders columns={columns} checked={checked} columnSort={this.columnSort} />
                    {
                        tableData.map((record, key) => {
                            return (
                                <TableRows
                                    key={key}
                                    columns={columns}
                                    data={record}
                                    checked={checked}
                                />
                            );
                        })
                    }
                </table>
                <Pagination data={data} currentPage={currentPage} recordsPerPage={recordsPerPage} handlePageChange={this.handlePageChange} />
                {isLoading && <Preloader />}
                <ScrollButton />
            </div>
        )
    }
}

export default RecordTable;