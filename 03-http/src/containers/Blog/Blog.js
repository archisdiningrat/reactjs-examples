import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    // mounted
    async componentDidMount(){
        const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const updatedPosts = posts.slice(0, 4).map(post => ({
            ...post,
            author: 'ikhaa'
        }));
        this.setState({ posts: updatedPosts });
    }

    selectPostHandler(id){
        this.setState({ selectedPostId: id });
    }

    render () {
        const posts = this.state.posts.map(post => (
            <Post 
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.selectPostHandler(post.id)}
            />
        ));

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;