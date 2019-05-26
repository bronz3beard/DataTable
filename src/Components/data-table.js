import React, { PureComponent } from "react";

import TableHeaders from "./table-headers";
import TableRows from "./table-rows";

class RecordTable extends PureComponent { //Child of SearchContainer
    state = {
        columns: [
            {
                "name": "",
                "username": "",
                "rating": 3,
                "favorites": 12,
                "visits": 72,
                "difficulty": 1,
                "terrain": 1,
                "size": "big",
                "created": "March 14, 2019",
                "updated": "April 29, 2019",
                "coords": "5.1911 159.6754"
            }
        ],
        //data and locationData length both set to 300 records total server side
        data: [],

        toggled: false,
        isLoading: true,

        sortOrder: {
            key: "asc",
        },

        currentPage: 1,
        recordsPerPage: 30,

        query: "",
        suggestionPlaceHolder: "Table filter",
        isHidden: true,
    };
    componentDidMount() {
        this.loadRecordsFromServer();
    }
    // Initial call to the server for records 
    loadRecordsFromServer() {
        const xmlhr = new XMLHttpRequest();
        const url = "https://randomuser.me/api/";
        xmlhr.open("GET", url, true);
        xmlhr.onload = () => {
            if (xmlhr.readyState === xmlhr.DONE) {
                if (xmlhr.status === 200) {
                    const data = JSON.parse(xmlhr.responseText);
                    this.setState({
                        data: data.results,
                        isLoading: false,
                    });
                }
            }
        };
        xmlhr.send();
    }

    toggleHidden(index) {
        var updateVal = this.state.data;
        updateVal.Collapse = !updateVal.Collapse;

        this.setState({
            ...this.state.data,
            updateVal,
        });

        this.loadTreeItemsFromServer(index);
    }


    // Column Sort handler + Logic
    columnSort = (key) => {
        const { data, sortOrder } = this.state;

        const tableData = data

        let newData;
        if (key === "Uri") {
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
                ...this.state.data,
            });
      
    }
    //on page table filter handler
    tableSearchFilter = (event) => {
        let query = event.target.value.substr(0, 100);
        this.setState({
            query: query,
        });
        console.log("TCL: RecordTable -> tableSearchFilter -> query", query)

    }
    // Column Sort handler + Logic
    columnSort = (key) => {
        const { data, locationData, checked, sortOrder } = this.state;
        //console.log(checked, " ", key, " ", sortOrder[key]);

        const tableData = !checked ? data : locationData;
        var updateVal = tableData;
        updateVal.Collapse = !updateVal.Collapse;

        let newData;
        if (key === "Uri") {
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
    }
    render() {
        const { data, columns, query,
            childData, toggled, suggestionPlaceHolder,
            currentPage, recordsPerPage,
            isHidden, isLoading } = this.state;


        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

        //record and location data filtered by query for the on page table filter
        const tableData = data.slice(indexOfFirstRecord, indexOfLastRecord); //filter(searchFilter(query)).
        console.log("TCL: RecordTable -> render -> data", data)

        //on page table data filter
        const recordFilter =
            <form className="filterForm">
                <input
                    className="input-sm"
                    id="table-filter"
                    type="text"
                    value={query}
                    placeholder={suggestionPlaceHolder}
                    onChange={this.tableSearchFilter}
                />
            </form>
        return (
            <div>
                {recordFilter}
                <table id="dataTable">
                    <TableHeaders columns={columns} columnSort={this.columnSort} />
                    {
                        !tableData ? <tbody /> : tableData.map((record) => {
                            return (
                                <TableRows
                                    key={record}
                                    columns={columns}
                                    data={record}
                                 />
                            );
                        })
                    }
                </table>
            </div>
        )
    }
}


export default RecordTable;


function searchFilter(searchQuery) {
    /*return (x) => {
        if (x.Title === undefined) {
            return (
                x.Uri.includes(searchQuery) ||
                x.Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.DateCreated.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.TrimType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                !searchQuery
            );
        } else {
            return (
                x.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.Uri.includes(searchQuery) ||
                x.Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.DateCreated.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.TrimType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                !searchQuery
            );
        }
    };*/
}
function locationSearchFilter(searchQuery) {
    return (x) => {
        if (x.EmailAddress || x.Honorific === null) {
            return (
                x.FormattedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.Uri.includes(searchQuery) ||
                x.TypeOfLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                !searchQuery);
        } else {
            return (
                x.FormattedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.Uri.includes(searchQuery) ||
                x.TypeOfLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.EmailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
                x.Honorific.toLowerCase().includes(searchQuery.toLowerCase()) ||
                !searchQuery
            );
        }
    };
}