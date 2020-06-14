import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import Badge from 'react-bootstrap/Badge';
import { MdShare } from 'react-icons/md';
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
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function convertdate_format(inputDate)
{
	var year = inputDate.substring(0, 4);
	var month = inputDate.substring(5, 7);
	var day = inputDate.substring(8, 10);
	return year + '-' + month + '-' + day;
}

function badgevariant(inputSection)
{
  inputSection = inputSection.toLowerCase();
  if(inputSection === 'world')
    return 'badge_world';
  else if(inputSection === 'politics')
    return 'badge_politics';
  else if(inputSection === 'business')
    return 'badge_business';
  else if(inputSection === 'technology')
    return 'badge_technology';
  else if(inputSection === 'sport' || inputSection === 'sports')
    return 'badge_sports';
  else if(inputSection === '')
    return 'bagde_null';
  else
    return 'badge_other';
}

const twit_array = ['CSCI_571_NewsApp'];
const fbhashtag = '#CSCI_571_NewsApp';

function ShareModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  return (
    <>
    <MdShare onClick={handleShow}/>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h4>{props.title}</h4>
      </Modal.Header>
      <Modal.Body>
      <div className='share_via_text'><h5>Share Via</h5></div>
      <div className='share_buttons'>
      <Container fluid>
      <Row>
        <Col lg={4} xs={4}><FacebookShareButton url={props.shareUrl} quote={props.title} hashtag={fbhashtag}>
          <FacebookIcon size={55} round={true} />
        </FacebookShareButton></Col>
        <Col lg={4} xs={4}><TwitterShareButton url={props.shareUrl} quote={props.title} hashtags={twit_array}>
          <TwitterIcon size={55} round={true} />
        </TwitterShareButton></Col>
        <Col lg={4} xs={4}><EmailShareButton url={props.shareUrl} subject={fbhashtag} separator={" "}>
          <EmailIcon size={55} round={true} />
        </EmailShareButton></Col>
        </Row>
        </Container>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default class HomeCard extends React.Component{
  constructor() {
		super();
		this.state = { displayModal: true};
	}

	displayModal = () => {
	    this.setState({
	        displayModal: !this.state.displayModal
	    })
	}
  handleClick(evt)
  {
    evt.preventDefault();
  }
  render(){
    var article = this.props.allinfo;
    var title;
    var imageURL;
    var section;
    var section_map;
    var date_art;
    var webURL;
    var id;
    if(this.props.guar_or_ny === 'guardian')
    {
      if(article !== undefined)
      {
        if(article['webTitle'] !== undefined)
          title = article['webTitle'];
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
        if(article['sectionId'] !== undefined)
        {
          section = article['sectionId'];
          section_map = badgevariant(section);
          section = section.toUpperCase();
          if(section === 'SPORT')
            section = 'SPORTS';
        }
        if(article['webPublicationDate'] !== undefined)
          date_art = convertdate_format(article['webPublicationDate']);

        webURL = article['webUrl'];
        id = '/article?guid='+article['id']+'?';
      }
    }
    else
    {
      if(article !== undefined)
      {
        if(article['headline'] !== undefined)
          title = article['headline']['main'];
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
        if(article['news_desk'] !== undefined)
        {
          section = article['news_desk'];
          section_map = badgevariant(section);
          section = section.toUpperCase();
          if(section === 'SPORT')
            section = 'SPORTS';
        }
        if(article['pub_date'] !== undefined)
          date_art = convertdate_format(article['pub_date']);

        webURL = article['web_url'];
        id = '/article?nyid='+webURL;
      }
    }
    if ( this.state.displayModal )
    {
      return(
        <Link className='scard_link' to={id}><div className='scard'>
          <h5 style={{fontWeight:'bold',fontSize:'105%'}}><i>{title}</i>&nbsp;&nbsp;<span onClick={this.handleClick}><ShareModal title={title} shareUrl={webURL}/></span></h5>
          <div>
            <img src={imageURL} className='scard_image'/>
          </div>
          <div className='scard_content'>
            <span className='scard_date'>{date_art}</span><span className='scard_badge'><Badge bsPrefix={section_map}>{section}</Badge></span>
          </div>
        </div></Link>
      );
    }
      return(
        <div>
          {this.displayModal}
				</div>
    );
  }
}
