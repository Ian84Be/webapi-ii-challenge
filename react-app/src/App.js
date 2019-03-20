import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios.get('http://localhost:4000/api/posts/')
    .then(res => {
      console.log(res.data);
      this.setState({
        posts:[...res.data]
      });
    })
    .catch(err => console.log(err));
  }

  deletePost = e => {
    axios.delete(`http://localhost:4000/api/posts/${e.target.id}`)
      .then(res => {
        this.getPosts();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => {
          return (
            <div className="postCard" key={post.id}>
            <p>Title: {post.title}</p>
            <p>Contents: {post.contents}</p>
            <button id={post.id} onClick={this.deletePost}>DELETE</button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
