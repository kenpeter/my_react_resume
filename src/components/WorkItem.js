import React from 'react';

const WorkItem = props => {

  const getHighlights = () => {};

  return (
    <div className="workItem">
      <h3>{props.workItem.position}, <span><a href={props.workItem.website}>{props.workItem.company}</a></span></h3>
      <p>{props.workItem.summary}</p>
      <ul>{getHighlights}</ul>    
    </div>
  );
}

export default WorkItem;
