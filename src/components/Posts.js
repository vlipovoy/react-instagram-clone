import React, {Component} from 'react';
import User from './User';
import Loader from './Loader';
import InstaService from '../services/instaservice';
import ErrorMessage from './ErrorMessage';

export default class Posts extends Component {
  InstaService = new InstaService();
  state = {
    posts: [],
    error: false,
    loading: true
  }

  componentDidMount() {
    this.updatePosts();
  }

  updatePosts() {
    this.InstaService.getAllPosts()
    .then(this.onPostsLoaded)
    .catch(this.onError);
  }

  onPostsLoaded = (posts) => {
    this.setState({
      posts,
      error: false,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  renderItems(arr) {
    return arr.map(item => {
      const {name, altname, photo, src, alt, descr, id} = item;

      return (
        <div key={id} className="post">
          <User
            src={photo}
            alt={altname}
            name={name}
            min/>
          <img src={src} alt={alt}></img>
          <div className="post__name">
            {name}
          </div>
          <div className="post__descr">
            {descr}
          </div>
        </div>
      )
    })
  }

  render() {
    const {error, posts, loading} = this.state;
    if (error) {
      return <ErrorMessage />
    } else if (loading) {
      return <Loader />
    }

    const items = this.renderItems(posts);

    return (
      <div className="left">
        {items}
      </div>
    )
  }
}