export default class InstaService {
  constructor() {
    this._apiBase = 'http://localhost:3000/';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return res.json();
  }

  getAllPosts = async () => {
    const res = await this.getResource('posts/');
    return res;
  }

  getAllUsers = async () => {
    const res = await this.getResource('posts/');
    return res.map(this._transformPostsToUsers);
  }

  _transformPostsToUsers = (post) => {
    return {
      photo: post.photo,
      altname: post.altname,
      name: post.name,
      id: post.id
    }
  }

  getAllPhotos = async () => {
    const res = await this.getResource('posts/');
    return res.map(this._transformPostsToPhotos);
  }

  _transformPostsToPhotos = (post) => {
    return {
      src: post.src,
      alt: post.alt,
      id: post.id
    }
  }
}