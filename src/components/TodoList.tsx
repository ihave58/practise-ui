import { type DragEvent, type FC, useRef, useState } from 'react';
import styles from './TasksList.module.css';

type Task = {
    title: string;
    description: string;
};

type TaskListMap = Map<string, Array<Task>>

type TodoListProps = {
    taskListMap: TaskListMap
}

const TodoList: FC<TodoListProps> = (props) => {
    const [taskListMap, setTaskListMap] = useState<TaskListMap>(structuredClone(props.taskListMap));
    const taskListRefs = useRef<Array<HTMLDivElement>>([]);

    const getRef = (element: HTMLDivElement | null, index: number) => {
        if (taskListRefs.current && element) {
            taskListRefs.current[index] = element
        }
    }

    const onTaskDrop = (event: DragEvent, targetTaskStatus: string) => {
        const updatedTaskListMap = structuredClone(taskListMap);
        const data = event.dataTransfer.getData('text/plain');
        const parsedData = JSON.parse(data);
        const task: Task = parsedData.task;
        const sourceTaskStatus: string = parsedData.sourceTaskStatus;
        const sourceTaskIndex: number = parsedData.sourceTaskIndex;

        updatedTaskListMap.get(sourceTaskStatus)!.splice(sourceTaskIndex, 1);
        updatedTaskListMap.set(targetTaskStatus, [
            ...(updatedTaskListMap.get(targetTaskStatus) || []),
            task
        ]);

        setTaskListMap(updatedTaskListMap);
    }

    const handleTaskDragStartEvent = (event: DragEvent, task: Task, sourceTaskStatus: string, sourceTaskIndex: number) => {
        const data = {
            task,
            sourceTaskStatus,
            sourceTaskIndex
        };

        event.dataTransfer.setData('text/plain', JSON.stringify(data));
    }

    const renderTaskListMap = () => {
        const taskStatuses = Array.from(taskListMap.keys());

        return taskStatuses.map((taskStatus, taskListIndex) => {
            const taskList = taskListMap.get(taskStatus)!;

            return (
                <div className={styles.taskStatusList}
                     ref={(element) => getRef(element, taskListIndex)}
                     onDragOver={(event) => event.preventDefault()}
                     onDrop={(dropEvent) => onTaskDrop(dropEvent, taskStatus)}
                >
                    <h4 className={styles.taskStatus}>{taskStatus}</h4>

                    <div className={styles.taskList}>
                        {
                            taskList.map((task, taskIndex) => (
                                <div className={styles.task} draggable={true}
                                     onDragStart={(event) => handleTaskDragStartEvent(event, task, taskStatus, taskIndex)}>
                                    <h4>{task.title}</h4>
                                    <div>{task.description}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={styles.tasksList}>
            {renderTaskListMap()}
        </div>
    )
}

export default TodoList;
export type { TodoListProps, Task, TaskListMap }
