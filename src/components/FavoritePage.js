import React, { Component } from 'react';
import BookmarkCard from './BookmarkCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';

export default class FavoritePage extends React.Component{
  constructor(props) {
  super(props);
  this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  this.state = {hideFav: false};
  ReactTooltip.hide();
}

rerenderParentCallback(input) {
  toast('Removing '+input, {className: 'bookmark_toast'});
  this.forceUpdate();
}

  render(){
    var fav_arr = JSON.parse(localStorage.getItem("fav_arr"));
    let rows = [], temp_rows= [];
    var header_style = {display: 'block'};
    if(fav_arr === null || fav_arr.length === 0)
    {
      fav_arr = [];
      localStorage.setItem("fav_arr", JSON.stringify(fav_arr));
      temp_rows.push(<div style={{textAlign:'center',paddingTop: '20px'}}>
                <ToastContainer closeOnClick={true} autoClose={3000} transition={Zoom} hideProgressBar={true} position="top-center"/>
                <h4>You have no saved articles</h4>
              </div>);
      header_style = {display: 'none'};
    }

    for(let i=0; i<fav_arr.length && i<10;i++)
    {
      rows.push(<Col xs={12} lg={3} style={{padding:'0px'}} key={i}><BookmarkCard allinfo={fav_arr[i]} rerenderParentCallback={this.rerenderParentCallback} key={i}/></Col>)
    }
    return(
      <div>
      {temp_rows}
      <h2 className='result_header' style={header_style}>Favorites</h2>

      <Container fluid>
        <Row>
        {rows}
        </Row>
      </Container>
      <ToastContainer closeOnClick={true} autoClose={3000} transition={Zoom} hideProgressBar={true} position="top-center"/>
      </div>
    );
  }
}
