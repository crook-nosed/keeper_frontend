// import React from 'react'
// import axios from 'axios';

// class TaskDetailPage extends React.Component {
//     state={
//         text:'',
//         tasks:[]
//     }
//     async componentDidMount(){
//         const currentHref = window.location.href;
//         console.log(currentHref);
//         const taskListIdList = currentHref.split("/");
//         const taskListId = taskListIdList[taskListIdList.length-1];
//         this.fetchTasks();
//     }
     
//     // fetchTasks = async () => {
//     //     //  this.setState({loading:true});
//     //     const currentHref = window.location.href;
//     //     // console.log(currentHref);
//     //     const taskListIdList = currentHref.split("/");
//     //     const taskListId = taskListIdList[taskListIdList.length-1];
//     //      const res = await axios.get('http://localhost:8000/api/tasks');
     
//     //      const returnedTasks = res.data;

//     //      const relevantData = returnedTasks.filter(task=> task.taskList === taskListId)
//     //      console.log(relevantData);
//     //      this.setState({tasks: relevantData});
//     //    }
//     createNewTask = async(text) => {
//         const currentHref = window.location.href;
//         // console.log(currentHref);
//         const taskListIdList = currentHref.split("/");
//         const taskListId = taskListIdList[taskListIdList.length-1];
//         const newTask = {
//             "task_name": text,
//             "taskList": Number(taskListId)
//           }
//           const res = await axios.post('http://localhost:8000/api/task-create/', newTask);
//           console.log(res.data);
//           this.fetchTasks();
//     }
//     onChange = (e) => {
//         this.setState({[e.target.name]: e.target.value})
//     }
//     onSubmit = (e) => {
//         e.preventDefault();
//         this.createNewTask(this.state.text);
//         this.setState({text:''})

//     }

//     render(){
//     return (
//         <div className="container">
//             <form onSubmit={this.onSubmit} className="form">
//                     <input type="text" name="text" placeholder="Create New Task..." value={this.state.text} onChange={this.onChange}/>
//                     <input type="submit" value="Enter" className="btn btn-dark btn-block"/>

//             </form>
//             <div >
//                 {this.state.tasks.map(task => (
//                     <div className="card" style={{display:"flex"}}>
//                         <div>
//                             {task.task_name}
//                         </div>
//                         <div>
//                             <button onClick={this.deleteTask}><i class="fas fa-trash"></i></button>
//                         </div>
//                     </div>

//                 ))}
//             </div>
//         </div>
//     )
//     }
// }

// export default TaskDetailPage

import React, { Fragment,Component } from 'react';
// import Spinner from '../layout/Spinner';
// import CreateTask from '../TaskLists/CreateTask';


export class TaskDetailPage extends Component {
    state = {
        text:''
    }

 
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.text === '')
        {
            this.props.setAlert("Please enter something" ,"light");

        } else {
            this.props.createNewTask(this.state.text,this.props.taskId);
            this.setState({text:''})

        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    componentDidMount(){
        this.props.fetchTasks();
    }
    componentDidUpdate(){

    }
    render() {
        const { taskId, tasks,loading } = this.props;
        return (
            <Fragment>
                <div>
                    <form onSubmit={this.onSubmit} className="form">
                        <input type="text" name="text" placeholder="Create New Task or TaskList..." value={this.state.text} onChange={this.onChange}/>
                        <input type="submit" value="Enter" className="btn btn-dark btn-block"/>

                    </form>
                </div>
                {/* <div className="card"> */}
                <div className="container">
                {tasks.map(task=>(
                   <div key={task.id} className="card" style={{display:"flex"}}>
                       <div style = {{flex:8}}>
                        {task.task_name} 
                       </div>
                       {/* <div style = {{flex:1}}>
                       <button onClick={() => this.props.editItem(task.id)} className="btn btn-dark btn-sm my-1"> Edit</button> 
                       </div> */}
                       <div style = {{flex:1}}>
                       <button onClick={() => this.props.deleteTaskItem(task.id)} className="btn btn-dark btn-sm my-1"> Delete</button> 
                       </div>
                       
                    </div>
                ))}

                </div>
                {/* </div> */}
                {/* <h1>{tasks.map(task=>task.task_name)}</h1> */}
            </Fragment>
        )
    }
}

export default TaskDetailPage

