import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';



class NavBar extends React.Component {

    render(){
        const {isAuthenticated, user}= this.props;
        const authLinks = (
            <ul>
                 <li>
                <span>
        <strong>{user ? `Welcome ${user.username}!` : ""}</strong>
                </span>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <button onClick={this.props.logoutUser} className="btn btn-dark btn-sm " >
                    Logout
                </button>
            </li>
        </ul>
        );
        const guestLinks = (
            <ul>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
        </ul>
        );
        return (
            <nav className="navbar bg-primary" >
                <div style={{display:"flex"}}>
                <img src="https://img.icons8.com/ios-filled/50/000000/google-keep.png" alt="logo" style={{width:"40px", height:"40px"}}/>
                <h1><Link to='/'>{this.props.title}</Link></h1>

                </div>
                {isAuthenticated ? authLinks:guestLinks}
            </nav>
        )
    }
}

// NavBar.propTypes = {
//     title: PropTypes.string.isRequired
// }

export default NavBar
