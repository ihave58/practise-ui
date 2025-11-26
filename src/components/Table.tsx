import { type FC, useState } from 'react';
import styles from './Table.module.css';
import cx from 'classnames';

type Column = {
    id: string;
    title: string;
    sortable?: boolean;
    sorted?: boolean;
};

type Row = Record<Column['id'], string | number>;

type TableProps = {
    columns: Array<Column>,
    data: Array<Row>
};

const sortData = <T extends Row>(data: Array<T>, columnId: keyof T) => {
    return data.sort((a, b) => {
        if (typeof a[columnId] === 'string' && typeof b[columnId] === 'string') {
            return a[columnId].localeCompare(b[columnId]);
        } else if (typeof a[columnId] === 'number' && typeof b[columnId] === 'number') {
            return a[columnId] - b[columnId];
        } else {
            return a > b ? 1 : 0;
        }
    });
}

const Table: FC<TableProps> = (props) => {
    const { columns = [] } = props;
    const [sortedColumnId, setSortedColumnId] = useState<Column['id']>(() => {
        const sortedColumn = columns.filter(column => column.sorted).at(-1);

        return sortedColumn!.id;
    });

    const [data, setData] = useState<Array<Row>>(sortData(props.data, sortedColumnId));

    const handleHeaderColumnClick = (columnId: Column['id']) => {
        const sortedData = sortData(data, columnId);

        setSortedColumnId(columnId);
        setData(sortedData);
    }

    const renderTableHeader = () => {
        return (
            <div className={styles.tableRow}>
                {
                    columns.map(column => {
                        const columnClasses = cx([styles.tableColumn, { [styles.sorted]: sortedColumnId === column.id }]);

                        return (
                            <div
                                className={columnClasses}
                                onClick={() => handleHeaderColumnClick(column.id)}
                            >
                                {column.sortable
                                    ? <img
                                        width={18}
                                        height={18}
                                        src={'./sortable-icon.png'}></img>
                                    : null
                                }
                                {column.title}
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    const renderTableBody = () => {
        const { columns = [] } = props;

        return data.map(row => (
            <div className={styles.tableRow}>
                {
                    columns.map(column => {
                        const columnClasses = cx([styles.tableColumn, { [styles.sorted]: sortedColumnId === column.id }]);

                        return (
                            <div className={columnClasses}>
                                {row[column.id]}
                            </div>
                        );
                    })
                }
            </div>
        ))
    }

    return (
        <div className={styles.table}>
            <h3>Table</h3>

            <div className={styles.tableWrapper}>
                <div className={styles.tableHeader}>
                    {renderTableHeader()}
                </div>
                <div className={styles.tableBody}>
                    {renderTableBody()}
                </div>
            </div>
        </div>
    );
}

export default Table;
