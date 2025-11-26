import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DeepLinkedTabs from './components/DeepLinkedTabs.tsx';
import TodoList from './components/TodoList.tsx';
import DirectoryTree from './components/DirectoryTree.tsx';
import Table from './components/Table.tsx';

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div style={{
            height: '100vh',
            width: '100vw',
            padding: '1rem'
        }}>
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
                        body: 'Body for Tab 4'
                    }
                ]}/>
        </div>
    </StrictMode>,
);
