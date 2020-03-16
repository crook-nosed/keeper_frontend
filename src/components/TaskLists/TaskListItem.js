import React from 'react'
import { Link } from 'react-router-dom';

const TaskListItem = props => {
        const {task_list_name,id} = props.taskList;
        // console.log(task_list_name,id);
        return (
            <div className="card text-center">
                <div className="card text-center">
                    <h3>{task_list_name}</h3>
                </div>

                <div>
                    <Link to={`/taskList/${id}`} className="btn btn-dark btn-sm my-1"> Add Tasks</Link>
                </div>
                <div>
                    <button onClick={() => props.deleteItem(id)} href="http://google.com" className="btn btn-dark btn-sm my-1"> Delete</button>
                </div>
            </div>
        )
}

export default TaskListItem
