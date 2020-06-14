import React, { Component } from 'react';
import SearchCard from "./SearchCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MediaQuery from 'react-responsive';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class SearchPage extends React.Component{
  constructor() {
    super();
    this.state = { results: [], guar_or_ny: null, loading: true};
    this.fetch_search_news = this.fetch_search_news.bind(this);
  }

  fetch_search_news()
  {
    var localquery = this.props.location.search;
    var modifiedlocalquery = '?';
    if(localquery.substring(1,3) === 'gu')
    {
      this.setState({ guar_or_ny: 'guardian'});
      modifiedlocalquery += localquery.substring(3,);
      var searchquery = 'http://jmparekhhw8.us-east-1.elasticbeanstalk.com/guardian/search'+modifiedlocalquery;
      fetch(searchquery)
        .then(response => response.json())
        .then(data => this.setState({ results: data.response.results, loading: false }));
    }
    else
    {
      this.setState({ guar_or_ny: 'nytimes'});
      modifiedlocalquery += localquery.substring(3,);
      var searchquery = 'http://jmparekhhw8.us-east-1.elasticbeanstalk.com/nytimes/search'+modifiedlocalquery;
      fetch(searchquery)
        .then(response => response.json())
        .then(data => this.setState({ results: data.response.docs, loading: false }));
    }
  }

  componentDidMount(){
    this.fetch_search_news();
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.location.search !== this.props.location.search)
    {
      this.setState({loading: true});
      this.fetch_search_news();
    }
  }

  render(){
    let temp_rows = [];
    if(this.state.results.length === 0)
    {
      temp_rows.push(<h4 style={{textAlign: 'center',paddingTop: '20px'}}>No results</h4>);
    }
    let rows = [];
    for(let i=0; i<this.state.results.length && i<10;i++)
    {
      rows.push(<Col xs={12} lg={3} style={{padding:'0px'}} key={i}><SearchCard allinfo={this.state.results[i]} guar_or_ny={this.state.guar_or_ny} key={i}/></Col>)
    }
      return (
        <div>
        <h2 className='result_header'>Results</h2>
        <MediaQuery minWidth={992}>
          {this.state.loading ?
          <>
          <div className='myLoader'>
            <BounceLoader
              css={override}
              size={50}
              color={"#123abc"}
              loading={this.state.loading}
            />
            <h5 style={{textAlign:'center'}}>Loading</h5>
          </div>
          </>:<>
          {temp_rows}
            <Container fluid>
              <Row>
                {rows}
              </Row>
            </Container>
            </>
          }
        </MediaQuery>
        <MediaQuery maxWidth={991}>
        {this.state.loading ?
        null:<>
        {temp_rows}
          <Container fluid>
            <Row>
              {rows}
            </Row>
          </Container>
          </>
        }
        </MediaQuery>
        </div>
      );
    }
}
