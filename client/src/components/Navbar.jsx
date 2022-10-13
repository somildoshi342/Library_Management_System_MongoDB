import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from 'js-cookie'
<link rel="stylesheet" href="./style.css" />
function Navbar() {
    const logout = () => {
        Cookies.remove('user');
        window.location.reload()
    }

    if (Cookies.get('user')) {
        if (Cookies.get('user') === 'Admin') {
            return (
                <>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a class="navbar-brand" href="#">Library Management System</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item ">
                                    <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                                </li>
                                <li class="nav-item ">
                                    <Link class="nav-link" to="/books">Book List <span class="sr-only">(current)</span></Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {Cookies.get('user')}
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link class="dropdown-item" to='/favourite'>Favourites</Link>
                                        <Link class="dropdown-item" to='/userBooks'>My Books</Link>
                                        <Link class="dropdown-item" to='/addbook'>Add Book</Link>
                                        <a class="dropdown-item" onClick={logout}>Logout</a>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </>
            )
        } else {
            return (
                <>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a class="navbar-brand" href="#">Library Management System</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item ">
                                    <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                                </li>
                                <li class="nav-item ">
                                    <Link class="nav-link" to="/books">Book List <span class="sr-only">(current)</span></Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {Cookies.get('user')}
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link class="dropdown-item" to='/userBooks'>My Books</Link>
                                        <Link class="dropdown-item" to='/favourite'>Favourites</Link>
                                        <a class="dropdown-item" onClick={logout}>Logout</a>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </>
            )
        }
    } else {
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Library Management System</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item ">
                                <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item ">
                                <Link class="nav-link" to="/books">Book List <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/login'>Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }

}

export default Navbar
