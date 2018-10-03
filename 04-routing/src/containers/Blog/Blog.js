import React, { Component } from 'react';

import './Blog.css';
import Posts from './Posts/Posts';
// import FullPost from './FullPost/FullPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import NewPost from './NewPost/NewPost';
import AsyncComponent from "../../hoc/asyncComponent";

const AsyncNewPost = AsyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: false
    }

    render () {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink exact to="/posts" activeClassName="active" activeStyle={{ textDecoration: 'underline' }}>Posts</NavLink></li>
                            <li><NavLink exact to={{ 
                                    pathname: '/new-post', // this.props.match.url + '/new-post' => relative path
                                    hash: '#submit', 
                                    search: '?quick-submit=true' 
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* <Route path="/" exact render={() => <h1>HOME</h1>} ></Route> */}
                <Switch>
                    <Route path="/posts" component={Posts} ></Route>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} ></Route> : null}
                    <Redirect exact from="/" to="/posts"></Redirect>
                    <Route render={() => <h1>Page Not Found</h1>}></Route>
                </Switch> 

            </div>
        );
    }
}

export default Blog;