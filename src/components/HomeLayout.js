import React, { Component } from 'react';
import HomeCard from "./HomeCard";
import MediaQuery from 'react-responsive';

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

var response;
export default class HomeLayout extends Component {
  constructor() {
    super();
    this.state = { results: [], loading: true};
    this.fetch_news = this.fetch_news.bind(this);
  }

  fetch_news()
  {
    if(this.props.guardian_or_ny === true)
    {
      var url='http://jmparekhhw8.us-east-1.elasticbeanstalk.com/guardian/'+this.props.newstype;
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ results: data.response.results, loading: false }));
    }
    else if(this.props.guardian_or_ny === false)
    {
      var url='http://jmparekhhw8.us-east-1.elasticbeanstalk.com/nytimes/'+this.props.newstype;
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ results: data.results, loading: false }));
    }
  }

  componentDidMount()
  {
    this.fetch_news();
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.guardian_or_ny !== this.props.guardian_or_ny)
    {
      this.setState({loading: true});
      this.fetch_news();
    }
  }

  render() {
    let rows = [];
    for(let i=0; i<this.state.results.length && i<10;i++)
    {
      rows.push(<HomeCard allinfo={this.state.results[i]} guardian_or_ny_card={this.props.guardian_or_ny} key={i}/>)
    }
    return(
      <div>
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
        {rows}
        </>
      }
    </MediaQuery>
    <MediaQuery maxWidth={991}>
      {this.state.loading ?
        null:<>
      {rows}
      </>
    }
    </MediaQuery>
    </div>
    );
  }
}
