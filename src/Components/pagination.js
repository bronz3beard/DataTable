import React, { PureComponent } from "react";

class Pagination extends PureComponent {
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
        const { recordsPerPage, data, locationData, checked } = this.state;
        this.setState({
            currentPage: Math.ceil((!checked ? data.length : locationData.length) / recordsPerPage),
        });
    }
    render() {


        // pagination, mapping and logic.
        const totalRecords = Math.ceil((!checked ? data.length : locationData.length) / recordsPerPage);
        const pageNumbers = [];
        for (let i = 1; i <= totalRecords; i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.slice((currentPage - 1), (currentPage - 1) + 5).map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageChange}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </li>
            );
        });

        //pagination logic
        const startPage = pageNumbers.slice(0)[0]; // 1
        const endPage = pageNumbers.slice(-1)[0]; // 10

        const firstSepPage = currentPage != startPage ?
            <li className="disabled">...</li> :
            null;

        const previousPage = currentPage === startPage ?
            null :
            <li key="Previous" onClick={this.decrement} className="page-link">Previous</li>;

        const firstPage = currentPage === startPage ?
            null :
            <li key="first" onClick={this.first} className="page-link">&lang;&lang;</li>;

        const lastSepPage = currentPage != endPage ?
            <li className="disabled">...</li> :
            null;

        const nextPage = currentPage === endPage ?
            null :
            <li key="Next" onClick={this.increment} className="page-link">Next</li>;

        const lastPage = currentPage === endPage ?
            null :
            <li key="last" onClick={this.last} className="page-link">&rang;&rang;</li>;

        return (
            <ul id="page-numbers">
                {firstPage}
                {previousPage}
                {firstSepPage}
                {renderPageNumbers}
                {lastSepPage}
                {nextPage}
                {lastPage}
            </ul>
        )
    }
}


export default Pagination;