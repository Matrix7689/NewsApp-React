import React, { Component } from 'react';
import HomeLayout from './HomeLayout';

export default class BusinessPage extends React.Component{
  render(){
    return(
      <div>
        <HomeLayout newstype={'business'} guardian_or_ny={this.props.guardian_or_ny_app}/>
      </div>
    );
  }
}
