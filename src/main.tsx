import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LinkedTabs from './components/LinkedTabs.tsx';
import DeepLinkedTabs from './components/DeepLinkedTabs.tsx';
import TodoList from './components/TodoList.tsx';
import DirectoryTree from './components/DirectoryTree.tsx';
import Table from './components/Table.tsx';
import SvgBarChart from './components/SvgBarChart.tsx';
import BarChart from './components/BarChart.tsx';

import './index.css'

type EmployeeData = {
    id: string,
    name: string,
    ticketCount: number,
    color: string
};

const mapToBarChartData = (employeesData: Array<EmployeeData> = []) => {
    const xAxisData: Array<{ value: string, color: string }> = [];
    const yAxisData: Array<number> = [];

    employeesData.forEach(employeeData => {
        xAxisData.push({
            value: employeeData.name,
            color: employeeData.color
        });

        yAxisData.push(employeeData.ticketCount)
    });

    return { xAxisData, yAxisData };
}

const EmployeesData: Array<EmployeeData> = [
    {
        id: 'employee1',
        name: 'Employee 1',
        ticketCount: 1,
        color: '#3f888f'
    },
    {
        id: 'employee2',
        name: 'Employee 2',
        ticketCount: 4,
        color: '#8f3f76'
    },
    {
        id: 'employee3',
        name: 'Employee 3',
        ticketCount: 6,
        color: '#0b0c0b'
    },
    {
        id: 'employee5',
        name: 'Employee 5',
        ticketCount: 14,
        color: '#4aae0b'
    },
    {
        id: 'employee6',
        name: 'Employee 6',
        ticketCount: 11,
        color: '#e6bc51'
    },
    {
        id: 'employee4',
        name: 'Employee 4',
        ticketCount: 10,
        color: '#121fac'
    },
    {
        id: 'employee7',
        name: 'Employee 7',
        ticketCount: 3,
        color: '#f6065a'
    }
];

const barChartData = mapToBarChartData(EmployeesData);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div style={{
            height: '100vh',
            width: '100vw',
            padding: '1rem'
        }}>
            <div>
                <DeepLinkedTabs
                    tabs={[
                        {
                            title: 'Tab 1',
                            link: '#/tab1',
                            body: <TodoList taskListMap={new Map([
                                ['todo', [
                                    {
                                        title: 'Task 1',
                                        description: 'Sample description text'
                                    },
                                    {
                                        title: 'Task 2',
                                        description: 'Sample description text'
                                    }
                                ]],
                                ['doing', [
                                    {
                                        title: 'Task 3',
                                        description: 'Sample description text'
                                    },
                                    {
                                        title: 'Task 4',
                                        description: 'Sample description text'
                                    }
                                ]],
                                ['done', [
                                    {
                                        title: 'Task 5',
                                        description: 'Sample description text'
                                    },
                                ]]
                            ])}/>
                        },
                        {
                            title: 'Tab 2',
                            link: '#/tab2',
                            body:
                                <Table
                                    columns={[
                                        {
                                            id: 'title',
                                            title: 'Title',
                                            sortable: true,
                                        },
                                        {
                                            id: 'location',
                                            title: 'Location',
                                            sortable: true,
                                            sorted: true
                                        },
                                        {
                                            id: 'country',
                                            title: 'Country',
                                            sortable: true
                                        }
                                    ]}
                                    data={[
                                        {
                                            title: 'Title 4',
                                            location: 'Durg',
                                            country: 'India'
                                        },
                                        {
                                            title: 'Title 2',
                                            location: 'Osaka',
                                            country: 'Japan'
                                        },
                                        {
                                            title: 'Title 3',
                                            location: 'Bhilai',
                                            country: 'India'
                                        },
                                        {
                                            title: 'Title 5',
                                            location: 'Nagpur',
                                            country: 'India'
                                        },
                                        {
                                            title: 'Title 1',
                                            location: 'London',
                                            country: 'Britain'
                                        }
                                    ]}
                                />
                        },
                        {
                            title: 'Tab 3',
                            link: '#/tab3',
                            body: <DirectoryTree items={[
                                {
                                    id: 'directory1',
                                    name: 'Directory 1',
                                    type: 'directory',
                                    children: [
                                        {
                                            id: 'directory3',
                                            name: 'Directory 3',
                                            type: 'directory',
                                            children: [
                                                {
                                                    id: 'directory5',
                                                    name: 'Directory 5',
                                                    type: 'directory',
                                                },
                                                {
                                                    id: 'directory6',
                                                    name: 'Directory 6',
                                                    type: 'directory',
                                                    children: [
                                                        {
                                                            id: 'file3',
                                                            name: 'File 3.tsx',
                                                            type: 'file',
                                                        },
                                                        {
                                                            id: 'directory13',
                                                            name: 'Directory 13',
                                                            type: 'directory',
                                                            children: [
                                                                {
                                                                    id: 'directory15',
                                                                    name: 'Directory 15',
                                                                    type: 'directory',
                                                                },
                                                                {
                                                                    id: 'directory16',
                                                                    name: 'Directory 16',
                                                                    type: 'directory',
                                                                    children: [
                                                                        {
                                                                            id: 'file13',
                                                                            name: 'File 13.tsx',
                                                                            type: 'file',
                                                                        },
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 'directory4',
                                            name: 'Directory 4',
                                            type: 'directory',
                                        },
                                        {
                                            id: 'directory7',
                                            name: 'Directory 7',
                                            type: 'directory',
                                        },
                                        {
                                            id: 'file1',
                                            name: 'File 1.tsx',
                                            type: 'file',
                                        },
                                        {
                                            id: 'file2',
                                            name: 'File 2.tsx',
                                            type: 'file',
                                        },
                                    ]
                                },
                                {
                                    id: 'directory2',
                                    name: 'Directory 2',
                                    type: 'directory',
                                },
                                {
                                    id: 'file5',
                                    name: 'File 5.tsx',
                                    type: 'file',
                                },
                                {
                                    id: 'file6',
                                    name: 'File 6.tsx',
                                    type: 'file',
                                },
                            ]}/>
                        },
                        {
                            title: 'Tab 4',
                            link: '#/tab4',
                            body: <SvgBarChart
                                title={'Employee Ticket Distribution'}
                                xAxisTitle={'Employee'}
                                yAxisTitle={'Ticket Count'}
                                height={'200px'}
                                width={'600px'}
                                xAxis={{
                                    data: barChartData.xAxisData
                                }}
                                yAxis={barChartData.yAxisData}
                            />
                        },
                        {
                            title: 'Tab 5',
                            link: '#/tab5',
                            body: <BarChart
                                title="Employee Ticket Distribution"
                                xAxisTitle={'Employee'}
                                yAxisTitle={'Ticket Count'}
                                height={'200px'}
                                width={'600px'}
                                xAxis={{
                                    data: barChartData.xAxisData
                                }}
                                yAxis={barChartData.yAxisData}
                            />
                        },
                        {
                            title: 'Tab 6',
                            link: '#/tab6',
                            body: 'Tab 6'
                        }
                    ]}/>
            </div>

            <div style={{
                marginTop: '2rem'
            }}>
                <LinkedTabs
                    tabs={[
                        {
                            title: 'Tab 1',
                            body: 'Reloadable Tab 1'
                        },
                        {
                            title: 'Tab 2',
                            body: 'Reloadable Tab 2'
                        },
                        {
                            title: 'Tab 3',
                            body: 'Reloadable Tab 3'
                        }
                    ]}
                />
            </div>
        </div>
    </StrictMode>,
);
