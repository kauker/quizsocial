import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        const {displayName, photoURL} = this.props.user;

      return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                    <img src="img/owl-logo.png" />
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                    
                    </div>

                    
                        {displayName ? 
                        <div className="navbar-end">
                            <div className="navbar-item">
                                {displayName ? `Hello, ${displayName}` : ''}
                            </div>
                            <div className="navbar-item has-dropdown is-hoverable">
                                
                                <a className="navbar-link">
                                
                                {photoURL ? <figure className="image is-32x32"><img className="is-rounded" src={photoURL} /></figure> : ''}
                                </a>

                                <div className="navbar-dropdown">
                                <hr className="navbar-divider" />
                                <a className="navbar-item" onClick={this.props.handleLogout}>
                                    Logout
                                </a>
                                </div>
                            </div>
                        </div>
                        : null}
                    
                </div>
            </div>
        </nav>
      );
    }
  }
  
  export default Navbar;