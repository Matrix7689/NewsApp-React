import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import MediaQuery from 'react-responsive';

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class ArticlePage extends React.Component{
  constructor() {
    super();
    this.state = { results: [], guar_or_ny: null, loading: true};
    this.fetch_one_article = this.fetch_one_article.bind(this);
  }

  fetch_one_article()
  {
      var injectquery = this.props.location.search;

      if(injectquery.substring(0,5) === '?guid')
      {
        this.setState({ guar_or_ny: 'guardian'});
        injectquery = injectquery.substring(6,);
        var searchquery='http://jmparekhhw8.us-east-1.elasticbeanstalk.com/guardian/article?id='+injectquery;
        fetch(searchquery)
          .then(response => response.json())
          .then(data => this.setState({ results: data.response.content, loading: false }));
      }
      else
      {
        this.setState({ guar_or_ny: 'nytimes'});
        injectquery = injectquery.substring(6,);
        var searchquery='http://jmparekhhw8.us-east-1.elasticbeanstalk.com/nytimes/article?id='+injectquery;
        fetch(searchquery)
          .then(response => response.json())
          .then(data => this.setState({ results: data.response.docs, loading: false }));
      }
  }

  componentDidMount()
  {
    this.fetch_one_article();
  }

  render(){
      return (
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
            <ArticleCard allinfo={this.state.results} guar_or_ny={this.state.guar_or_ny}/>
          </>
        }
        </MediaQuery>
        <MediaQuery maxWidth={991}>
          {this.state.loading ?
            null:<>
            <ArticleCard allinfo={this.state.results} guar_or_ny={this.state.guar_or_ny}/>
          </>
        }
        </MediaQuery>
      </div>
      );
    }
}
