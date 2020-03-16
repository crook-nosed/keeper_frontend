import React, { Component } from 'react'

export class CreateList extends Component {
    state = {
        text:''
    }

 
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.text === '')
        {
            this.props.setAlert("Please enter something" ,"light");

        } else {
            this.props.createNewTaskList(this.state.text);
            this.setState({text:''})

        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Create New Task or TaskList..." value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="Enter" className="btn btn-dark btn-block"/>

                </form>
            </div>
        )
    }
}

export default CreateList
