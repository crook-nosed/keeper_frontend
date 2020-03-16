import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';



const NavBar = (props)=> {
        return (
            <nav className="navbar bg-primary" >
                <div style={{display:"flex"}}>
                <img src="https://img.icons8.com/ios-filled/50/000000/google-keep.png" alt="logo" style={{width:"40px", height:"40px"}}/>
                <h1><Link to='/'>{props.title}</Link></h1>

                </div>
                <ul>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/about'>Login</Link>
                    </li>
                </ul>
            </nav>
        )
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired
}

export default NavBar
