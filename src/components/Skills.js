import React from 'react';

const Skills = props => {
  // need to execute it
  const getSkills = () => {
    const arr = [];
  
    props.skill.forEach((val, index) => {
      arr.push(<li key={index}><span className="label label-success">{val}</span></li>);
    });
    
    //console.log('test');
    //console.log(arr);
    
    return arr;  
  };


  // h2
  // class name
  // text upper case
  // fa fa-lg fa-code
  // ul
  // skills-list
  // list-inline
  // func()
	return (
	  <section className="skills">
      <h2 className="text-uppercase"><i className="fa fa-lg fa-code"></i> Skills</h2>
      <ul className="skills-list list-inline">{getSkills()}</ul>
    </section>
	)
};

// export default
// skills
export default Skills;
