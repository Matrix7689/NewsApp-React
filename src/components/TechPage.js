import React, { Component } from 'react';
import HomeLayout from './HomeLayout';

export default class TechPage extends React.Component{
  render(){
    return(
      <div>
        <HomeLayout newstype={'technology'} guardian_or_ny={this.props.guardian_or_ny_app}/>
      </div>
    );
  }
}
