import React,{Component} from 'react';
import {Link} from 'react-router';

  const Header = () => (
      <div className="header_container">
        <Link to="/upload">Upload Movies</Link>
      </div>
  );

  export default Header;
