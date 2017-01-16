// import react
// from 
// react
import React from 'react';

// const
// about = 
// props => {}
const About = props => {
  // section
  // class name about
  // h2
  // class name text upper case
  // <i></i>
  // classname
  // fa fa-lg fa-user
  // about
  // <div></div>
  // props.about data
  return (
    <section className="about">
      <h2 className="text-uppercase"><i className="fa fa-lg fa-user"></i> About</h2>
      <div>{props.summary}</div>      
    </section>
  );
};

// export default
export default About;

