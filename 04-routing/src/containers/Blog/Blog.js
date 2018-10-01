import React, { Component } from 'react';

import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink } from 'react-router-dom';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render () {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink exact to="/" activeClassName="active" activeStyle={{ textDecoration: 'underline' }}>Home</NavLink></li>
                            <li><NavLink exact to={{ 
                                    pathname: '/new-post', // this.props.match.url + '/new-post' => relative path
                                    hash: '#submit', 
                                    search: '?quick-submit=true' 
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>HOME</h1>} ></Route> */}
                <Route path="/" exact component={Posts} ></Route> 
                <Route path="/new-post" component={NewPost} ></Route> 

            </div>
        );
    }
}

export default Blog;