import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <nav>

                <ul className="pagination">
                    {pageNumbers.map((number) => {
                        return (
                            <li key={number} className="">
                                <Link style={{ textDecoration: 'none', color: '#000' }} onClick={() => paginate(number)} href='!#' className="page-link">{number}</Link>
                            </li>
                        )

                    })}

                </ul>

            </nav>
        </div >
    )
}

export default Pagination;