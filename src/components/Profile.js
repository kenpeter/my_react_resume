// import react
import React from 'react';

// const
// profile = 
// props => {}
const Profile = props => {
  // const
  // profile obj
  // props
  // profileData
  const profileObj = props.profileData;
  
  return (
    <div>
      <div className="profileImg">
        <img role="presentation" className="img-rounded" src={profileObj.picture} width="100%" />
        
        <h2 className="text-left">{profileObj.name}</h2>
        
        <h3 className="text-left">{profileObj.label}</h3>
        
        <div className="divider"></div>
        
        <ul className="list-unstyled contact-links">
          <li><i className="fa fa-lg fa-envelope"></i><a href="mailto:{profileObj.email}">{profileObj.email}</a></li>
        </ul>
        
        <div className="divider"></div>
        
        <ul className="profileLinks list-inline">
        
          <li><a className="fa fa-github fa-2x" href={'https://github.com/' + profileObj.profiles[0].username}></a></li>
          
          <li><a className="fa fa-linkedin fa-2x" href={'https://au.linkedin.com/in/' + profileObj.profiles[1].username}></a></li>
        </ul>
        
        <div className="divider"></div>
        
        <p>Resme built with React components, based on <a href="https://github.com/freaksauce/React-Resume-ES6">React-Resume-ES6</a></p>
            
      </div>                  
    </div>
  );  
};

export default Profile;

