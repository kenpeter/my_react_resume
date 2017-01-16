// import react
// from react
import React from 'react';
import WorkItem from './WorkItem';

// const
// work = 
// props => {}
const Work = props => {
  const getWorkExperience = () => {
    // const
    // work items =
    // []
    const workItems = [];
    
    // props
    // work data
    // for each()
    // (val, index) => {}
    // val, index
    // push item to array
    props.work.forEach((workItem, index) => {
      workItems.push(<WorkItem key={index} workItem={workItem}/>);
    });
    
    return workItems;
  };
    
  // section
  // classname=
  // work
  // h2
  // classname
  // text-uppercase
  // <i></i>
  // classname
  // fa, usually
  // fa-lg, large
  // fa-building
  // {}, code
  // exec func
  return (
    <section className="work">
      <h2 className="text-uppercase"><i className="fa fa-lg fa-building"></i> Work experience</h2>
      {getWorkExperience()}
    </section>
  );
};

export default Work;

