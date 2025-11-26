import styles from './Sudoku.module.css'

function Sudoku() {
    const renderGrid = () => {
        return (
            <div className={styles.grid}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(rowIndex => {
                        return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(colIndex => {
                            return <div key={`${rowIndex}-${colIndex}`}
                                        className={styles.gridCell}>{rowIndex}-{colIndex}</div>
                        });
                    })
                }
            </div>
        )
    }

    return (
        <div className={styles.app}>
            <h3 className={styles.heading}>Sudoku</h3>

            {renderGrid()}
            Howdy Ady!
        </div>
    )
}

export default Sudoku
