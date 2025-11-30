import styles from './SvgBarChart.module.css';
import { type FC, useMemo, useRef } from 'react';

type SvgBarChartProps = {
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

const SvgBarChart: FC<SvgBarChartProps> = (props) => {
    const {
        title,
        xAxisTitle,
        yAxisTitle,
        height = '100%',
        width = '100%',
        xAxis: { data: xAxisData = [] },
        yAxis = []
    } = props;
    const svgRef = useRef<SVGSVGElement>(null);

    const yAxisMaxValue = useMemo(() => {
        let maxValue = 0;

        yAxis.forEach(yAxisBarValue => {
            maxValue = Math.max(maxValue, yAxisBarValue);
        });

        return maxValue;
    }, [yAxis]);

    return (
        <div className={styles.svgBarChart} style={{ height, width }}>
            <h3>{title}</h3>

            <svg width="100%" ref={svgRef}>
                <text
                    x="50%"
                    y="100%"
                    text-anchor="middle"
                    dominant-baseline="bottom"
                    className={styles.xAxisTitle}
                >{xAxisTitle}</text>

                <text
                    x={8}
                    y="50%"
                    writingMode="tb"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    className={styles.yAxisTitle}
                >{yAxisTitle}</text>

                <g className={styles.bars}>
                    {
                        yAxisMaxValue > 0 ? yAxis.map((bar, index) => {
                            const barHeightPercentage = (bar / yAxisMaxValue) * 100;
                            const x = index * 40 + ((index + 1) * 5);

                            return (
                                <rect
                                    className={styles.bar}
                                    x={x}
                                    y={'100%'}
                                    width={40}
                                    height={barHeightPercentage}
                                    fill={xAxisData[index]?.color}
                                />
                            );
                        }) : null
                    }
                </g>


                <line
                    x1={20} y1={0}
                    x2={20} y2="100%"
                    stroke={'#232323'}
                    strokeWidth={2}
                />

                <line
                    x1={0} y1="90%"
                    x2="100%" y2="90%"
                    stroke={'#232323'}
                    strokeWidth={2}
                />
            </svg>
        </div>
    );
}

export default SvgBarChart;
