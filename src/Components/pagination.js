import React from "react";




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