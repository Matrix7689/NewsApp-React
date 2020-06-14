import React, { Component } from 'react';
import HomeLayout from './HomeLayout';

export default class WorldPage extends React.Component{
  render(){
    return(
      <div>
        <HomeLayout newstype={'world'} guardian_or_ny={this.props.guardian_or_ny_app}/>
      </div>
    );
  }
}
