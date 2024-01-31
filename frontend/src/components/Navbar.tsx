import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {


    const handellogout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("name");
        // navigate("/login")
    }
    return (
        <>
        <div className='navwrapper'>
            <div className='navbar'>
                <Link className='logo' to="/">
                    <h4>TO-DO LIST</h4>
                </Link>
                <p>Hello ! { localStorage.getItem("name")}</p>
                <div className='auth-buttons'>
                    {(!localStorage.getItem("Token")) ?
                        <>
                            <Link to="/login">
                                <button className='butt1'>Login</button>
                            </Link>
                            <Link to="/createuser">
                                <button className='butt2'>Signup</button>
                            </Link>
                        </>

                        : <Link to="/login" onClick={handellogout}>
                            <button className='butt2' style={{ backgroundColor: "#ff0000" }}>Logout</button>
                        </Link>
                    }
                    {/* {console.log(localStorage.getItem("token"))} */}
                </div>
            </div >
            </div>
        </>
    )
}

export default Navbar