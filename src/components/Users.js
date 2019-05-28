import React, {Component} from 'react';
import User from './User';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import InstaService from '../services/instaservice';

export default class  Users extends Component {
  InstaService = new InstaService();
  state = {
    users: [],
    error: false,
    loading: true
  }

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers() {
    this.InstaService.getAllUsers()
    .then(this.onUsersLoaded)
    .catch(this.onError);
  }

  onUsersLoaded = (users) => {
    this.setState({
      users,
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
      const {photo, altname, name, id} = item;
      return (
        <User
          src={photo}
          alt={altname}
          name={name}
          key={id}
          min
        />
      )
    })
  }

  render() {
    const {error, users, loading} = this.state;
    if (error) {
      return <ErrorMessage />
    } else if (loading) {
      return <Loader />
    }

    const items = this.renderItems(users);

    return(
      <div className="right">
        {/* Logged-in user is not implemented */}
        <User
          src="https://peopledotcom.files.wordpress.com/2018/11/prince-harry.jpg?crop=0px%2C0px%2C1200px%2C630px&resize=1200%2C630"
          alt="prince"
          name="Harry"
        />
        <div className="users__block">
          {items}
        </div>
      </div>
    )
  }
}