import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import Badge from 'react-bootstrap/Badge';
import { MdShare } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { IconContext } from "react-icons";
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
//import { ToastContainer, toast, Zoom } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

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
  else if(inputSection === 'guardian')
    return 'badge_guard_fav';
  else if(inputSection === 'nytimes')
    return 'badge_ny_fav';
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
        <Modal.Title><h3>{props.src}</h3><h5>{props.title}</h5></Modal.Title>
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

export default class BookmarkCard extends React.Component{
  constructor(props) {
		super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
		this.state = { displayModal: true, my_article: null, my_title: '', imageURL: '', section: '', date_art: '', webURL: '', id: '', ntype: '', src: ''};
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

  deleteArticle(evt)
  {
    evt.preventDefault();
    var fav_arr = JSON.parse(localStorage.getItem("fav_arr"));
    for(var i=0;i<fav_arr.length;i++)
    {
      if(fav_arr[i]['jp_source'] === 'guardian' && this.state.my_article['jp_source'] === 'guardian')
      {
        if(fav_arr[i]['id'] === this.state.my_article['id'])
        {
          //toast('Removing '+this.state.my_title, {className: 'bookmark_toast'});
          fav_arr.splice(i, 1);
          localStorage.setItem("fav_arr", JSON.stringify(fav_arr));
          this.props.rerenderParentCallback(this.state.my_title);
          break;
        }
      }
      else if(fav_arr[i]['jp_source'] === 'nytimes' && this.state.my_article['jp_source'] === 'nytimes')
      {
        if(fav_arr[i]['web_url'] === this.state.my_article['web_url'])
        {
          //toast('Removing '+this.state.my_title, {className: 'bookmark_toast'});
          fav_arr.splice(i, 1);
          localStorage.setItem("fav_arr", JSON.stringify(fav_arr));
          this.props.rerenderParentCallback(this.state.my_title);
          break;
        }
      }
    }
  }

  fetch_article_data()
  {
    var article = this.props.allinfo;
    var title;
    var imageURL;
    var section;
    var section_map;
    var date_art;
    var webURL;
    var id;
    var ntype;
    var ntype_map;
    if(article['jp_source'] === 'guardian')
    {
      if(article !== undefined)
      {
        if(article['webTitle'] !== undefined)
        {
          title = article['webTitle'];
          this.setState({my_title: title, my_article: article});
        }
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
          ntype = 'guardian';
          ntype_map = badgevariant(ntype);
          ntype = ntype.toUpperCase();
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

        this.setState({imageURL: imageURL});
        this.setState({ntype: ntype});
        this.setState({section: section});
        this.setState({date_art: date_art});
        this.setState({webURL: webURL});
        this.setState({id: id});
        this.setState({src: 'GUARDIAN'});
      }
    }
    else
    {
      if(article !== undefined)
      {
        if(article['headline'] !== undefined)
        {
          title = article['headline']['main'];
          this.setState({my_title: title, my_article: article});
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
        if(article['news_desk'] !== undefined)
        {
          ntype = 'nytimes';
          ntype_map = badgevariant(ntype);
          ntype = ntype.toUpperCase();
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
        this.setState({imageURL: imageURL});
        this.setState({ntype: ntype});
        this.setState({section: section});
        this.setState({date_art: date_art});
        this.setState({webURL: webURL});
        this.setState({id: id});
        this.setState({src: 'NYTIMES'});
      }
    }
  }

  componentDidMount()
  {
    this.fetch_article_data();
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.allinfo !== this.props.allinfo)
      this.fetch_article_data();
  }

  render(){
    if ( this.state.displayModal )
    {
      return(
        <div className='scard'>
        <Link className='scard_link' to={this.state.id}>
        <IconContext.Provider value={{ size: "0.9em" }}>
          <h5 style={{fontWeight:'bold',fontSize:'105%'}}><i>{this.state.my_title}</i>&nbsp;&nbsp;<span onClick={this.handleClick}><ShareModal src={this.state.src} title={this.state.my_title} shareUrl={this.state.webURL}/></span><span onClick={this.handleClick}><IoMdTrash onClick={this.deleteArticle}/></span></h5>
          <div>
            <img src={this.state.imageURL} className='scard_image'/>
          </div>
          <div className='scard_content'>
            <span className='scard_date'>{this.state.date_art}</span><span className='scard_badge'><Badge bsPrefix={badgevariant(this.state.section)}>{this.state.section}</Badge>&nbsp;&nbsp;<Badge bsPrefix={badgevariant(this.state.ntype)}>{this.state.ntype}</Badge></span>
          </div>
          </IconContext.Provider>
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
