import React, { Component } from 'react';

export default class DisableSwitch extends React.Component{
  componentDidMount()
  {
    this.props.removeSwitch();
  }
  render(){
    return(
      <div>
      </div>
    );
  }
}
