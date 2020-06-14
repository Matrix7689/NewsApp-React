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
import MediaQuery from 'react-responsive';
import Truncate from 'react-truncate';

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
    var desc;
    var webURL;
		var id;
    if(this.props.guardian_or_ny_card === true)
    {
      if(article !== undefined)
      {
        title = article['webTitle'];
        try{
  				var imagelen = article['blocks']['main']['elements']['0']['assets'].length;
          imageURL = article['blocks']['main']['elements']['0']['assets'][imagelen-1]['file'];
        }
        catch(err)
        {
          imageURL = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
        }
        if(article['sectionId'] !== undefined)
        {
          section = article['sectionId'];
          section_map = badgevariant(section);
          section = section.toUpperCase();
        }
        if(section === 'SPORT')
          section = 'SPORTS';
        if(article['webPublicationDate'] !== undefined)
          date_art = convertdate_format(article['webPublicationDate']);
        if(article['blocks'] !== undefined)
        {
          desc = article['blocks']['body']['0']['bodyTextSummary'];
          //if(desc.length > 390)
            //desc = desc.substring(0,390) + "...";
        }
        webURL = article['webUrl'];
  			id = '/article?guid='+article['id']+'?';
      }
    }
    else if(this.props.guardian_or_ny_card === false)
    {
      if(article !== undefined)
      {
        title = article['title'];
        var image_found = false;
        try{
          for(var k=0; k<article['multimedia'].length; k++)
          {
            if(article['multimedia'][k]['width'] > 2000)
            {
              imageURL = article['multimedia'][k]['url'];
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
        if(article['section'] !== undefined)
        {
          section = article['section'];
          section_map = badgevariant(section);
          section = section.toUpperCase();
        }
        if(section === 'SPORT')
          section = 'SPORTS';
        if(article['published_date'] !== undefined)
          date_art = convertdate_format(article['published_date']);
        if(article['abstract'] !== undefined)
        {
          desc = article['abstract'];
          //if(desc.length > 390)
            //desc = desc.substring(0,390) + "...";
        }
        webURL = article['url'];
        id = '/article?nyid='+webURL;
      }
    }
		if ( this.state.displayModal )
		{
		 return(
       <div className= 'hcard'>
			 <Link className='hcard_link' to={id}>
       <Container fluid>
       <Row>
       <MediaQuery minWidth={992}>
				 <Col lg={3} style={{padding:'5px',paddingRight:'25px'}}>
           <img src={imageURL} className='hcard_image'/>
         </Col>
       </MediaQuery>

       <MediaQuery maxWidth={991}>
        <Col lg={3} style={{padding:'5px'}}>
          <img src={imageURL} className='hcard_image'/>
        </Col>
       </MediaQuery>

				 <Col lg={9} style={{padding:'5px'}}>
			     <h5 style={{fontWeight:'600'}}><i>{title}</i><span onClick={this.handleClick}><ShareModal title={title} shareUrl={webURL}/></span></h5>
	         <div style={{marginRight:'0.25%'}}><Truncate lines={3} ellipsis="...">
                {desc}
            </Truncate></div><br/><br/>
	            <Container fluid>
              <Row>
	               <Col xs={6} style={{textAlign: 'left',padding:'0px',paddingBottom:'10px',fontStyle: 'italic',fontWeight:'550'}}>{date_art}</Col>
                 <Col xs={6} style={{textAlign: 'right',padding:'0px',paddingBottom:'10px'}}><Badge bsPrefix={section_map}>{section}</Badge></Col>
              </Row>
              </Container>
         </Col>
         </Row>
    	 </Container>
       </Link>
       </div>
		 );
	 	}
      return(
				<div>
          {this.displayModal}
				</div>
    );
  }
}
