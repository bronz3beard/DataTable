import React, { PureComponent } from "react";

class Pagination extends PureComponent {
    handlePageChange = (event) => {
        this.props.handlePageChange(event)
    }
    render() {
        const { currentPage, recordsPerPage } = this.props;

        const totalRecords = Math.ceil(this.props.data.length / recordsPerPage);
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

        const firstSepPage = currentPage !== startPage ?
            <li className="disabled">...</li> :
            null;

        const previousPage = currentPage === startPage ?
            null :
            <li title="previous" onClick={this.handlePageChange}>Previous</li>;

        const firstPage = currentPage === startPage ?
            null :
            <li title="first" onClick={this.handlePageChange}>&lang;&lang;</li>;

        const lastSepPage = currentPage !== endPage ?
            <li className="disabled">...</li> :
            null;

        const nextPage = currentPage === endPage ?
            null :
            <li title="next" onClick={this.handlePageChange}>Next</li>;

        const lastPage = currentPage === endPage ?
            null :
            <li title="last" onClick={this.handlePageChange}>&rang;&rang;</li>;

        return (
            <div className="pagination-wrapper">
                <ul className="pagination">
                    {firstPage}
                    {previousPage}
                    {firstSepPage}
                    {renderPageNumbers}
                    {lastSepPage}
                    {nextPage}
                    {lastPage}
                </ul>
            </div>
        )
    }
}

export default Pagination;