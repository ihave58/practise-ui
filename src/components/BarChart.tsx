import styles from './BarChart.module.css';
import { type FC, useMemo } from 'react';

type BarChartProps = {
    title: string,
    xAxisTitle: string,
    yAxisTitle: string,
    height?: string,
    width?: string,
    xAxis: {
        data: Array<{
            value: string,
            color: string
        }>
    },
    yAxis: Array<number>
}

const BarChart: FC<BarChartProps> = (props) => {
    const {
        title,
        xAxisTitle,
        yAxisTitle,
        height = '100%',
        width = '100%',
        xAxis: { data: xAxisData = [] },
        yAxis = []
    } = props;
    const yAxisMaxValue = useMemo(() => {
        let maxValue = 0;

        yAxis.forEach(yAxisBarValue => {
            maxValue = Math.max(maxValue, yAxisBarValue);
        });

        return maxValue;
    }, [yAxis]);

    return (
        <div className={styles.barChart} style={{ height, width }}>
            <h3>{title}</h3>

            <div className={styles.container}>
                <div className={styles.xAxisTitle}>{xAxisTitle}</div>
                <div className={styles.yAxisTitle}>{yAxisTitle}</div>

                <div className={styles.bars}>
                    {
                        yAxisMaxValue > 0 ? yAxis.map((bar, index) => {
                            const barHeightPercentage = (bar / yAxisMaxValue) * 100;

                            return (
                                <div
                                    style={{
                                        height: barHeightPercentage,
                                        backgroundColor: xAxisData[index]?.color
                                    }}
                                    className={styles.bar}
                                />
                            );
                        }) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default BarChart;
