import React,{Component, Fragment} from 'react';
import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import TaskListItem from './components/TaskLists/TaskListItem';
import Lister from './components/TaskLists/Lister';
import CreateList from './components/TaskLists/CreateList';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import TaskDetailPage from './components/pages/TaskDetailPage';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    taskLists:[],
    tasks:[],
    loading:false,
    alert:null,
    taskId:null

  }

  async componentDidMount(){
   this.fetchTaskLists();
   this.fetchTasks()
  }

  fetchTaskLists = async () => {
    this.setState({loading:true});
    const res = await axios.get('http://localhost:8000/api/task-lists');

    console.log(res.data);
    
    this.setState({taskLists: res.data, loading:false});
  }
  fetchTasks = async () => {
    this.setState({loading:true})
     const res = await axios.get('http://localhost:8000/api/tasks');
 
     const returnedTasks = res.data;

     const relevantData = returnedTasks.filter(task=> task.taskList === this.state.taskId)
     console.log(relevantData);
     this.setState({tasks: relevantData,loading:false});
   }
  createNewTaskList = async (text) => {
    const newTaskList = {
      "task_list_name": text
    }
    const res = await axios.post('http://localhost:8000/api/task-list-create/', newTaskList);
    console.log(res.data);
    this.fetchTaskLists();
  }
  createNewTask = async (text, id) => {
    const newTask = {
      "task_name": text,
      "taskList":id
    }
    const res = await axios.post('http://localhost:8000/api/task-create/', newTask);
    console.log(res.data);
    this.fetchTasks();
  }

  setAlert = (msg, type) => {

    this.setState({alert:{ msg:msg, type:type}});
    setTimeout(()=> {
      this.setState({alert:null})
    },4000)
  }
  deleteItem = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/task-list-delete/${id}`);
    console.log(res.data);
    this.fetchTaskLists();
  }
  deleteTaskItem = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/task-delete/${id}`);
    console.log(res.data);
    this.fetchTasks();
  }
  returnId= (id) => {
    this.setState({taskId:id})
  }
  render(){
    // const id = 
    return (
      <Router>
      <div className="App">
        <NavBar title="NotesKeeper"/>
        <div className="container">
        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path='/' render={
            props => (
              <Fragment>
                <CreateList createNewTaskList={this.createNewTaskList} setAlert={this.setAlert} />
                <Lister loading={this.state.loading} taskLists={this.state.taskLists} deleteItem={this.deleteItem} returnId={this.returnId}/>
              </Fragment>
            )
          }/> 
          <Route exact path="/about" component={About} />
          <Route exact path={`/tasklist/${this.state.taskId}`} render={
            props => (
              <TaskDetailPage timestamp={new Date().toString()} {...props} fetchTasks={this.fetchTasks} taskId={this.state.taskId} tasks={this.state.tasks} loading={this.state.loading} createNewTask={this.createNewTask} deleteTaskItem={this.deleteTaskItem}/>
            )
          } />
          {/* <Route exact path="/taskList" render = {
            props=> (
              <Fragment>
                <TaskDetailPage />
              </Fragment>
            )
          } /> */}
        </Switch>
          

        </div>
      </div> 

      </Router>
    );
  }

}

export default App;
