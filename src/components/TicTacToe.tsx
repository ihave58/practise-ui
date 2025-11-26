import { type FC, type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './TicTacToe.module.css';

type TicTacToeProps = {
    rowCount?: number;
    columnCount?: number;
};

const defaultTicTacToeProps: TicTacToeProps = {
    rowCount: 3,
    columnCount: 3
}

const rowHeight = 60;
const columnWidth = 60;

const toStateKey = (...args: unknown[]) => args.join('-');

const TicTacToe: FC<TicTacToeProps> = (initialProps) => {
    const props = Object.assign({}, defaultTicTacToeProps, initialProps);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [inputCount, setInputCount] = useState<number>(0);
    const [gameState, setGameState] = useState<Map<string, boolean>>(new Map());

    const canvasHeight = useMemo(() => (props.rowCount! * rowHeight) + props.rowCount! + 1, [props.rowCount]);
    const canvasWidth = useMemo(() => (props.columnCount! * columnWidth) + props.columnCount! + 1, [props.columnCount]);

    const drawCross = (rowIndex: number, columnIndex: number) => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')

            if (context) {
                context.beginPath();
                context.strokeStyle = '#ff0000';
                context.lineWidth = 2;

                context.moveTo((columnIndex * (columnWidth + 1)) + 20, (rowIndex * (rowHeight + 1)) + 20)
                context.lineTo((columnIndex * (columnWidth + 1)) + columnWidth - 20, (rowIndex * (rowHeight + 1)) + rowHeight - 20);

                context.moveTo(((columnIndex + 1) * (columnWidth + 1)) - 20, (rowIndex * (rowHeight + 1)) + 20)
                context.lineTo((columnIndex * (columnWidth + 1)) + 20, (rowIndex * (rowHeight + 1)) + rowHeight - 20);


                context.stroke();
                context.closePath();
            }
        }
    }

    const drawCircle = (rowIndex: number, columnIndex: number) => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')

            if (context) {
                context.beginPath();
                context.fillStyle = '#00FF00';

                const cellDiagonalLength = Math.sqrt((columnWidth * columnWidth) + (rowHeight * rowHeight));

                const startX = (columnIndex * (columnWidth + 1)) + (cellDiagonalLength / 2) - 12;
                const startY = (rowIndex * (rowHeight + 1)) + (cellDiagonalLength / 2) - 12;

                context.arc(startX, startY, 14, 0, 360, false);


                context.fill();
                context.closePath();
            }
        }
    }

    const drawCanvasGrid = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')

            if (context) {
                context.beginPath();
                context.strokeStyle = '#232323';
                context.lineWidth = 1;

                // drawing rows
                for (let rowIndex = 0; rowIndex <= props.rowCount!; rowIndex++) {
                    context.moveTo(0, rowIndex * (rowHeight + 1));
                    context.lineTo(canvasWidth, rowIndex * (rowHeight + 1));
                }

                // drawing columns
                for (let columnIndex = 0; columnIndex <= props.columnCount!; columnIndex++) {
                    context.moveTo(columnIndex * (columnWidth + 1), 0);
                    context.lineTo(columnIndex * (columnWidth + 1), canvasHeight)
                }

                context.stroke();
                context.closePath();
            }
        }
    }

    const hasGameCompleted = () => {
        for (let rowIndex = 0; rowIndex < props.rowCount!; rowIndex++) {
            let hasFoundCompletedColumn = true;

            for (let columnIndex = 0; columnIndex < props.columnCount!; columnIndex++) {
                const key = toStateKey(rowIndex, columnIndex);

                hasFoundCompletedColumn = hasFoundCompletedColumn && !!gameState.get(key);
            }

            if (hasFoundCompletedColumn) {
                return true;
            }
        }

        for (let columnIndex = 0; columnIndex < props.columnCount!; columnIndex++) {
            let hasFoundCompletedRow = true;

            for (let rowIndex = 0; rowIndex < props.rowCount!; rowIndex++) {
                const key = toStateKey(rowIndex, columnIndex);

                hasFoundCompletedRow = hasFoundCompletedRow && !!gameState.get(key);
            }

            if (hasFoundCompletedRow) {
                return true
            }
        }

        return false;
    }

    const handleCanvasClick = (event: MouseEvent) => {
        const x = event.clientX - (event.target as HTMLCanvasElement).offsetLeft;
        const y = event.clientY - (event.target as HTMLCanvasElement).offsetTop;

        const rowIndex = Math.floor(y / rowHeight);
        const columnIndex = Math.floor(x / columnWidth);

        if (inputCount % 2) {
            drawCircle(rowIndex, columnIndex);
        } else {
            drawCross(rowIndex, columnIndex);
        }

        const updatedGameState = new Map(gameState);
        updatedGameState.set(toStateKey(rowIndex, columnIndex), true);

        setGameState(updatedGameState);
        setInputCount(inputCount => inputCount + 1);
    }

    useEffect(() => {
        if (hasGameCompleted()) {
            window.alert('Tic Tac Toe Completed!');
        }
    }, [gameState]);

    useEffect(() => {
        drawCanvasGrid();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={styles.ticTacToe}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
        />
    );
}


export default TicTacToe;
