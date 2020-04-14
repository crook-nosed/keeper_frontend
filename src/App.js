import React,{Component, Fragment} from 'react';
import NavBar from './components/layout/NavBar';
import { HashRouter,BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
// import TaskListItem from './components/TaskLists/TaskListItem';
import Lister from './components/TaskLists/Lister';
import CreateList from './components/TaskLists/CreateList';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import TaskDetailPage from './components/pages/TaskDetailPage';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register'
import axios from 'axios';
import './App.css';
import Spinner from './components/layout/Spinner';

class App extends Component {

  state = {
    taskLists:[],
    tasks:[],
    loading:false,
    alert:null,
    taskId:null, 
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isUserLoading:false,
    user:null,
    authValues:null
 }

  async componentDidMount(){
    this.fetchUser();
   this.fetchTaskLists();
   this.fetchTasks()
  }

  tokenConfig = () => {
    const token = this.state.token;
    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }
    if(token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  }

  fetchUser = () => {
    this.setState({isUserLoading:true});
    axios.get('http://localhost:8000/api/auth/user',this.tokenConfig())
    .then(res=> {
      this.setState({isUserLoading:false, isAuthenticated:true, user: res.data });
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      this.setState({ 
        token:localStorage.getItem('token'),
        user:null,
        isAuthenticated:false,
        isUserLoading:false
      })
    })
  } 
  registerUser = ({username,password,email}) => {
    this.setState({isUserLoading:true});
    const token = this.state.token;
    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }

    const body = JSON.stringify({ username, email, password});
    axios.post('http://localhost:8000/api/auth/register',body,config)
    .then(res=> {
      localStorage.setItem('token',res.data.token);
      this.setState({isUserLoading:false, isAuthenticated:true, authValues: res.data,token: localStorage.getItem('token') });
    }).catch(err => {
      alert(err);
      localStorage.removeItem('token');
      this.setState({ 
        token:localStorage.getItem('token'),
        user:null,
        isAuthenticated:false,
        isUserLoading:false
      })
    })
  } 
  loginUser = (username,password) => {
    // this.setState({isUserLoading:true});
    // const token = this.state.token;
    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }

    const body = JSON.stringify({ username, password});
    axios.post('http://localhost:8000/api/auth/login',body,config)
    .then(res=> {
      localStorage.setItem('token',res.data.token);
      this.setState({isUserLoading:false, isAuthenticated:true, authValues: res.data,token: localStorage.getItem('token') });
    }).catch(err => {
      alert("User does not exist please register!");
      localStorage.removeItem('token');
      this.setState({ 
        token:localStorage.getItem('token'),
        user:null,
        isAuthenticated:false,
        isUserLoading:false
      })
    })
  } 
  logoutUser = () => {
    axios.post('http://localhost:8000/api/auth/logout/',null,this.tokenConfig())
    .then(res=> {
      localStorage.removeItem('token');
      this.setState({ 
        token:localStorage.getItem('token'),
        user:null,
        isAuthenticated:false,
        isUserLoading:false
      })
    }).catch(err => {
      console.log(err);
    })
  }
  fetchTaskLists = async () => {
    this.setState({loading:true});
    const res = await axios.get('http://localhost:8000/api/task-lists',this.tokenConfig());

    console.log(res.data);
    
    this.setState({taskLists: res.data, loading:false});
  }
  fetchTasks = async () => {
    this.setState({loading:true})
     const res = await axios.get('http://localhost:8000/api/tasks',this.tokenConfig());
 
     const returnedTasks = res.data;

     const relevantData = returnedTasks.filter(task=> task.taskList === this.state.taskId)
     console.log(relevantData);
     this.setState({tasks: relevantData,loading:false});
   }
  createNewTaskList = async (text) => {
    const newTaskList = {
      "task_list_name": text
    }
    const res = await axios.post('http://localhost:8000/api/task-lists/', newTaskList,this.tokenConfig());
    console.log(res.data);
    this.fetchTaskLists();
  }
  createNewTask = async (text, id) => {
    const newTask = {
      "task_name": text,
      "taskList":id
    }
    const res = await axios.post('http://localhost:8000/api/tasks/', newTask,this.tokenConfig());
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
    const res = await axios.delete(`http://localhost:8000/api/task-lists/${id}`,this.tokenConfig());
    console.log(res.data);
    this.fetchTaskLists();
  }
  deleteTaskItem = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/tasks/${id}`,this.tokenConfig());
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
        <NavBar title="NotesKeeper" isAuthenticated={this.state.isAuthenticated} user={this.state.user} logoutUser={this.logoutUser}/>
        <div className="container">
        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path='/' render={
            props => {
              if(this.state.isUserLoading) {
                return <Spinner/>
              }
              else if(!this.state.isAuthenticated){
                return <Redirect to="/login"/>;
              }
              else {
                return(
              <Fragment>
                <CreateList createNewTaskList={this.createNewTaskList} setAlert={this.setAlert} />
                <Lister loading={this.state.loading} taskLists={this.state.taskLists} deleteItem={this.deleteItem} returnId={this.returnId}/>
              </Fragment>
                )
              }
            }
          }/> 
          <Route exact path="/about" component={About} />
          <Route exact path="/register" render = {
            props => (
              <Register isAuthenticated={this.state.isAuthenticated} registerUser={this.registerUser} />
    )
          } />
          <Route exact path="/login" render = {
            props => (
              <Login isAuthenticated={this.state.isAuthenticated} loginUser={this.loginUser} />
    )
          } />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path={`/tasklist/${this.state.taskId}`} render={
            props => (
              <TaskDetailPage {...props} fetchTasks={this.fetchTasks} taskId={this.state.taskId} tasks={this.state.tasks} loading={this.state.loading} createNewTask={this.createNewTask} deleteTaskItem={this.deleteTaskItem}/>
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
