const Paging = ({ paging, pageChange }) => {
    const pages = [];

    for (let i = 0; i < paging.totalPages; i++) {
        pages.push(
            <li className="page-item" key={i}>
                <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        pageChange(i);
                    }}
                >
                    {i + 1}
                </a>
            </li>
        );
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center pagination-lg">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous"
                       onClick={(e) => {
                           e.preventDefault();
                           pageChange(0);
                       }}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pages}
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next"
                       onClick={(e) => {
                           e.preventDefault();
                           pageChange(paging.totalPages - 1);
                       }}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Paging;
