// react
import React from 'react';

// moment
import moment from 'moment';


// const
// education = 
// props => {}
const Education = props => {
  // the interesting thing here is that
  // it maps the data
  // map to html tag
  // const
  // get education
  // props.
  // education.
  // map
  // func(item, index)
  // div key index
  // <h3> item study type
  // <h4> item institution
  const getEducation = props.education.map(function(item, index) {
  		
		return (
      <div key={index}>
        <h3>{item.studyType}</h3>
			  <h4>{item.institution}</h4>
			</div>
    )
	});  
    
  // section
  // education
  // h2 class name
  // text upper case  
	return (
	  <section className="education">
      <h2 className="text-uppercase"><i className="fa fa-lg fa-mortar-board"></i> Education</h2>
      {getEducation}
    </section>
	)
};

export default Education;

