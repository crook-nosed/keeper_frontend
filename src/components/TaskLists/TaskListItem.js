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
                    <button onClick={()=>props.returnId(id)} className="btn btn-dark btn-sm my-1"><Link to={`/taskList/${id}`} > Add Tasks</Link></button>
                </div>
                <div>
                    <button onClick={() => props.deleteItem(id)} className="btn btn-dark btn-sm my-1"> Delete</button>
                </div>
            </div>
        )
}

export default TaskListItem
