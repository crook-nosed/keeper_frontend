// Lists the TaskList cards in the page.

import React from 'react'
import TaskListItem from './TaskListItem'
import Spinner from '../layout/Spinner';

const Lister = (props) => {
    if (props.loading){
        return <Spinner />
    } else {
        return (
            <div style={listStyle}>
                {props.taskLists.map(taskList => (
                    <TaskListItem key={taskList.id} taskList={taskList} deleteItem={props.deleteItem} id={taskList.id}/>
                ))}
            </div>
        )

    }
}

const listStyle = {
    display: "grid",
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Lister
