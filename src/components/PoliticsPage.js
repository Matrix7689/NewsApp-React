import React, { Component } from 'react';
import HomeLayout from './HomeLayout';

export default class PoliticsPage extends React.Component{
  render(){
    return(
      <div>
        <HomeLayout newstype={'politics'} guardian_or_ny={this.props.guardian_or_ny_app}/>
      </div>
    );
  }
}
