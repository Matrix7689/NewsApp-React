import React from "react";
import '../App.css';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import PageWithComments from './PageWithComments';
import ToggleBox from "./ToggleBox";
import Vehicles from "./Vehicles";
import { IconContext } from "react-icons";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediaQuery from 'react-responsive';

import commentBox from 'commentbox.io';
import qs from 'qs';

function convertdate_format(inputDate)
{
	var year = inputDate.substring(0, 4);
	var month = inputDate.substring(5, 7);
	var day = inputDate.substring(8, 10);
	return year + '-' + month + '-' + day;
}

var res_str_more = '';
var res_str_non = '';
function convert_ellipsis(inputStr)
{
	var split_arr = inputStr.split(" ");
	var res_str = "";
	var char_count = 0;
	for(var i=0;i<split_arr.length;i++)
	{
		var temp = split_arr[i];
		if((char_count+temp.length) <= 1190)
		{
			char_count = char_count + temp.length + 1;
			res_str = res_str + temp + " ";
		}
		else
		{
      res_str_non = res_str.substring(0,res_str.length-1);
			res_str = res_str.substring(0,res_str.length-1) + "...";
			break;
		}
	}
  res_str_more = inputStr.substring(char_count,);
	return res_str;
	//return inputStr.toString();
}

const twit_array = ['CSCI_571_NewsApp'];
const fbhashtag = '#CSCI_571_NewsApp';

var my_article;
var my_title;
export default class ArticleCard extends React.Component{
  constructor(props){
    super(props);
    this.state = { bmark_icon: <FaRegBookmark />, my_article: [] };
    this.togglebookmark = this.togglebookmark.bind(this);
    this.isArticleBookmarked = this.isArticleBookmarked.bind(this);
  }

  isArticleBookmarked()
  {
    var fav_arr = JSON.parse(localStorage.getItem("fav_arr"));
    if(fav_arr === null)
    {
      this.setState({ bmark_icon: <FaRegBookmark /> });
      return;
    }
    for(var i=0;i<fav_arr.length;i++)
    {
      if(this.props.guar_or_ny === 'guardian' && my_article !== undefined)
      {
        if(fav_arr[i]['id'] === my_article['id'])
        {
          console.log('its bmarked');
          this.setState({ bmark_icon: <FaBookmark /> });
          return;
        }
      }
      else if(this.props.guar_or_ny === 'nytimes' && my_article !== undefined)
      {
        if(fav_arr[i]['web_url'] === my_article['web_url'])
        {
          console.log('its bmarked');
          this.setState({ bmark_icon: <FaBookmark /> });
          return;
        }
      }
    }
    this.setState({ bmark_icon: <FaRegBookmark /> });
  }

  togglebookmark(evt)
  {
    evt.preventDefault();
    var fav_arr = JSON.parse(localStorage.getItem("fav_arr"));
    if(fav_arr === null)
    {
      fav_arr = [];
      fav_arr.push(my_article);
      localStorage.setItem("fav_arr", JSON.stringify(fav_arr));
      toast('Saving '+my_title, {className: 'bookmark_toast'});
      this.setState({ bmark_icon: <FaBookmark /> });
      return;
    }
    var article_present = false;
    var article_index;
    for(var i=0;i<fav_arr.length;i++)
    {
      if(this.props.guar_or_ny === 'guardian')
      {
        if(fav_arr[i]['id'] === my_article['id'])
        {
          article_present = true;
          article_index = i;
          break;
        }
      }
      else
      {
        if(fav_arr[i]['web_url'] === my_article['web_url'])
        {
          article_present = true;
          article_index = i;
          break;
        }
      }
    }
    if(article_present === true)
    {
      fav_arr.splice(article_index, 1);
      localStorage.setItem("fav_arr", JSON.stringify(fav_arr));
      toast('Removing '+my_title, {className: 'bookmark_toast'});
      this.setState({ bmark_icon: <FaRegBookmark /> });
    }
    else
    {
      fav_arr.push(my_article);
      localStorage.setItem("fav_arr", JSON.stringify(fav_arr));
      toast('Saving '+my_title, {className: 'bookmark_toast'});
      this.setState({ bmark_icon: <FaBookmark /> });
    }
  }

  componentDidMount()
  {
    this.isArticleBookmarked();
  }

  render(){

    var article = this.props.allinfo;
    var title;
    var imageURL;
    var date_art;
    var desc;
    var desc_more;
    var webURL;
    var is_desc_small = false;
    var id;
    if(this.props.guar_or_ny === 'guardian')
    {
      if(article !== undefined)
      {
        my_article = article;
        my_article['jp_source'] = 'guardian';
        title = article['webTitle'];
        my_title = title;
        if(article['blocks'] !== undefined)
        {
          try{
            var imagelen = article['blocks']['main']['elements']['0']['assets'].length;
            imageURL = article['blocks']['main']['elements']['0']['assets'][imagelen-1]['file'];
          }
          catch(err)
          {
            imageURL = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
          }
        }
        date_art = article['webPublicationDate'];
        if(date_art !== undefined)
          date_art = convertdate_format(date_art);
        if(article['blocks'] !== undefined)
        {
          desc = article['blocks']['body']['0']['bodyTextSummary'];
          if(desc.length < 1200)
            is_desc_small = true;
          desc = convert_ellipsis(desc);
          desc_more = res_str_more;
          //desc = desc.substring(0,1200);
          //desc_more = desc.substring(1200,);
        }
        webURL = article['webUrl'];
        id = '/article?guid='+article['id']+'?';
      }
    }
    else
    {
      if(article.length !== 0)
      {
        article = article[0];
        my_article = article;
        my_article['jp_source'] = 'nytimes';
        if(article['headline'] !== undefined)
        {
          title = article['headline']['main'];
          my_title = title;
        }
        var image_found = false;
        try{
          for(var k=0; k<article['multimedia'].length; k++)
          {
            if(article['multimedia'][k]['width'] > 2000)
            {
              imageURL = 'https://www.nytimes.com/'+article['multimedia'][k]['url'];
              image_found = true;
              break;
            }
          }
        }
        catch(err2)
        {
          imageURL = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        }
        if(image_found === false)
          imageURL = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        if(article['pub_date'] !== undefined)
          date_art = convertdate_format(article['pub_date']);
        if(article['abstract'] !== undefined)
        {
          desc = article['abstract'];
          if(desc.length < 1200)
            is_desc_small = true;
          desc = convert_ellipsis(desc);
          desc_more = res_str_more;
          //desc_more = desc.substring(1200,);
          //desc = desc.substring(0,1200);
        }
        webURL = article['web_url'];
        id = '/article?nyid='+webURL;
      }
    }
      return(
        <div>
        <ReactTooltip id='exp_page' effect='solid' className="tooltips" place="top"/>
        <IconContext.Provider value={{ color: "#DD303D",size: "1.5em" }}>
				<div className='expandcard'>
        <Container fluid>
          <Row>
          <Col lg={12} style={{paddingLeft:'10px',paddingRight:'10px'}}>
            <h2 style={{fontWeight:'400'}}><i>{title}</i></h2>
          </Col>
          </Row>
          <Row>
            <Col xs={6} style={{fontSize:'1.2rem',textAlign:'left',paddingRight:'10px',paddingLeft:'10px'}}>
              <i>{date_art}</i>
            </Col>
            <Col xs={6} style={{textAlign:'right',paddingLeft:'0px'}}>
              <span className='expandicons'>
              <MediaQuery minWidth={992}>
                  <FacebookShareButton url={webURL} quote={title} hashtag={fbhashtag}>
                    <FacebookIcon size={32} round={true} data-for="exp_page" data-tip='Facebook'/>
                  </FacebookShareButton>
                  <TwitterShareButton url={webURL} quote={title} hashtags={twit_array}>
                    <TwitterIcon size={32} round={true} data-for="exp_page" data-tip='Twitter'/>
                  </TwitterShareButton>
                  <EmailShareButton url={webURL} subject={fbhashtag} seperator={' '}>
                    <EmailIcon size={32} round={true} data-for="exp_page" data-tip='Email'/>
                  </EmailShareButton>
                  <span style={{paddingLeft: '120px',paddingRight: '20px'}}><span onClick={this.togglebookmark} data-for="exp_page" data-tip='Bookmark' style={{cursor:'pointer'}}>{this.state.bmark_icon}</span></span>
                </MediaQuery>
                <MediaQuery maxWidth={991}>
                  <FacebookShareButton url={webURL} quote={title} hashtag={fbhashtag}>
                    <FacebookIcon size={25} round={true}/>
                  </FacebookShareButton>
                  <TwitterShareButton url={webURL} quote={title} hashtags={twit_array}>
                    <TwitterIcon size={25} round={true}/>
                  </TwitterShareButton>
                  <EmailShareButton url={webURL} subject={fbhashtag} seperator={' '}>
                    <EmailIcon size={25} round={true}/>
                  </EmailShareButton>
                  <span style={{paddingLeft: '10px'}} onClick={this.togglebookmark}>{this.state.bmark_icon}</span>
                </MediaQuery>
              </span>
            </Col>
            </Row>
            <Row style={{paddingLeft:'10px',paddingRight:'10px'}}>
              <img src={imageURL} className='expandimage'/>
              <Container fluid>
              <Row style={{textAlign:'right'}}>
              <Col style={{paddingLeft:'0px',paddingRight:'0px'}}>
                <ToggleBox info_non={res_str_non} info={desc} display_matkar={is_desc_small}>
                  <Vehicles info={desc_more}/>
                </ToggleBox>
                </Col>
              </Row>
              </Container>
            </Row>
          </Container>
  				</div>
          <PageWithComments art_id={id}/>
          </IconContext.Provider>
          <ToastContainer autoClose={3000} transition={Zoom} hideProgressBar={true} position="top-center"/>
        </div>
    );
  }
}
