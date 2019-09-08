
import React, { PureComponent } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import sessionService from '../authentication/sessionService';

export default class Nav extends PureComponent {

  constructor(props) {
    super(props);
    this._sessionService = props.sessionService || sessionService;
    this._authenticated = props.authenticated || this._sessionService.isUserSignedIn();
  }

  authenticatedView() {
    if (!this._authenticated) return;
    return <Link to='/signout'>Signout</Link>;
  }

  unauthenticatedView() {
    if (this._authenticated) return;
    return <Link to='/signin'>Signin</Link>;
  }

  render() {
    return (
      <nav className='flash-nav'>
        <Link to='/' className='logo'><span>Flash</span></Link>
        <ul>
          <li>{this.authenticatedView() || this.unauthenticatedView()}</li>
        </ul>
      </nav>
    );
  }
}
