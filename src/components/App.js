import React, { PropTypes } from 'react';

import Profile from './Profile';

import About from './About';

import Work from './Work';

import Skills from './Skills';

import Education from './Education';


// const
// app = 
// props => {}
const App = props => {
  // props.jsonObj
  // basics
  // jsonObj is the prop being passed.
  const profileData = props.jsonObj.basics;
  
  // profileData summary
  const summaryData = profileData.summary;
  
  // work
  const workData = props.jsonObj.work;
  
  // skill
  const skillsData = props.jsonObj.skills;
  
  // education
  const educationData = props.jsonObj.education;

  return (
    <div className="container">
      <div className="row">
        <aside className="col-md-4">
          <div className="inner">
            <Profile profileData={profileData} />
          </div>
        </aside>
        
        <main className="col-md-8">
          <div className="inner">
            <About aboutData={summaryData} />
            <Work workData={workData} />
            <Skills skillsData={skillsData} />
            <Education educationData={educationData} />
          </div>
        </main>
      </div>
    </div>
  );

};


export default App;
