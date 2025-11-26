import { type FC, useState } from 'react';
import styles from './DirectoryTree.module.css';
import cx from 'classnames';

type Directory = {
    id: string,
    name: string,
    type: 'directory',
    children?: Array<Directory | File>
}

type File = {
    id: string,
    name: string,
    type: 'file',
}

type DirectoryProps = {
    items: Array<Directory | File>
}

const DirectoryTree: FC<DirectoryProps> = (props) => {
    const { items } = props;
    const [openDirectoryList, setOpenDirectoryList] = useState<Set<Directory['id']>>(new Set([]));

    const handleDirectoryClick = (id: Directory['id']) => {
        const updatedOpenDirectoryList = new Set(openDirectoryList);

        if (updatedOpenDirectoryList.has(id)) {
            updatedOpenDirectoryList.delete(id);
        } else {
            updatedOpenDirectoryList.add(id);
        }

        setOpenDirectoryList(updatedOpenDirectoryList);
    }

    const renderDirectory = (directory: Directory) => {
        const { id, name, children = [] } = directory;
        const isChildrenVisible = children.length && openDirectoryList.has(id);
        const iconSource = isChildrenVisible ? './down-arrow.png' : './right-arrow.png'

        return (
            <div className={styles.directory}>
                <div
                    className={cx(styles.header, { [styles.inactive]: !children.length })}
                    onClick={() => handleDirectoryClick(id)}>
                    <img width={18} height={18} src={iconSource}></img>
                    <img width={24} height={24} src={'./directory.png'}></img>
                    <span>{name}</span>
                </div>

                {
                    isChildrenVisible ? (
                        <div className={styles.directoryContent}>
                            {children.map(renderItem)}
                        </div>
                    ) : null
                }
            </div>
        );
    }

    const renderFile = (file: File) => {
        const { name } = file;

        return (
            <div className={styles.file}>
                <div className={styles.header}>
                    <img width={24} height={24} src={'./file.png'}></img>
                    <span>{name}</span>
                </div>
            </div>
        )
    }

    const renderItem = (item: Directory | File) => {
        if (item.type === 'file') {
            return renderFile(item);
        } else {
            return renderDirectory(item);
        }
    }

    return (
        <div className={styles.directoryTree}>
            <h3 className={styles.heading}>Directory</h3>

            {items.map(renderItem)}
        </div>
    )
}

export default DirectoryTree;
