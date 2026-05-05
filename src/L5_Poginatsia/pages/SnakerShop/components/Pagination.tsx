


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

    return (

        <div>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}>Назад ⬅️</button>

            <div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}>{pageNum}</button>
                ))}
            </div>

            <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange(currentPage + 1)}>Вперёд ➡️</button>
        </div>
    )
}

export default Pagination