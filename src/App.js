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
    loading:false,
    alert:null
  }

  async componentDidMount(){
   this.fetchTaskLists();
  }

  fetchTaskLists = async () => {
    this.setState({loading:true});
    const res = await axios.get('http://localhost:8000/api/task-lists');

    console.log(res.data);
    
    this.setState({taskLists: res.data, loading:false});
  }
  createNewTaskList = async (text) => {
    const newTask = {
      "task_list_name": text
    }
    const res = await axios.post('http://localhost:8000/api/task-list-create/', newTask);
    console.log(res.data);
    this.fetchTaskLists();
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
  render(){
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
                <Lister loading={this.state.loading} taskLists={this.state.taskLists} deleteItem={this.deleteItem}/>
              </Fragment>
            )
          }/> 
          <Route exact path="/about" component={About} />
          <Route exact path="/about" component={TaskDetailPage} />
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
