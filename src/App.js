import React, { Component } from 'react';
import { Route, Switch, Link, NavLink, withRouter } from 'react-router-dom';
import './App.css';
import Home from './components/HomePage';
import World from './components/WorldPage';
import Politics from './components/PoliticsPage';
import Business from './components/BusinessPage';
import Tech from './components/TechPage';
import Sports from './components/SportsPage';
import Search from './components/SearchPage';
import Article from './components/ArticlePage';
import Favorite from './components/FavoritePage';
import Error from './components/ErrorPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import IphoneSwitch from "react-switch";
import AsyncSelect from 'react-select/lib/Async';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { IconContext } from "react-icons";
//import _ from "lodash";
import MediaQuery from 'react-responsive';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactTooltipHome from 'react-tooltip';


class Register extends Component {
  constructor() {
    super();
    if(JSON.parse(localStorage.getItem("s_value")) === null)
      localStorage.setItem("s_value", 'true');
    this.state = {checked: JSON.parse(localStorage.getItem("s_value")), inputValue: ""};
    this.ISwitchhandleChange = this.ISwitchhandleChange.bind(this);

  }

  inSearchPage = () => {
    if(window.location.href.includes('/search'))
      return true;
    return false;
  }

  displaySwitch = () => {
    if(window.location.href.includes('/search'))
      return false;
    if(window.location.href.includes('/article'))
      return false;
    if(window.location.href.includes('/favorites'))
      return false;
    return true;
  }

  displayRegBookmark = () => {
    if(window.location.href.includes('/favorites'))
      return true;
    return false;
  }

  handleInputChange = (newValue) => {
    this.setState({ newValue });
    return newValue;
  };

  ISwitchhandleChange(checked) {
    this.setState({ checked });
    var svalue;
    if(checked === true)
      svalue = 'true';
    else{
      svalue='false';
    }
    localStorage.setItem("s_value", svalue);
    //window.location.reload(true);
  }

  async fetchOptions(inputValue)
  {
    if(!inputValue)
      return [];

    let queryUrl = 'https://jmparekh.cognitiveservices.azure.com/bing/v7.0/suggestions?q='+inputValue;
      const response = await fetch(queryUrl, {
          headers: {
            'Ocp-Apim-Subscription-Key': '667604a798274043a1a27047b75a5bc2'
          }
        }
      );

    let drop_options = [{value: inputValue,label: inputValue}];
    const result = await response.json();

    if(result.suggestionGroups !== null)
    {
      result.suggestionGroups[0].searchSuggestions.map( (suggestion) => {
        drop_options.push({value: suggestion.displayText,label: suggestion.displayText})
      })
      return drop_options;
    }
  }

  handleSearchChange = (optdata) => {
    this.setState({
      inputValue: optdata.value
    },() => {
      if(this.state.checked === true)
      {
        this.props.history.push('/search?guq='+ optdata.value);
      }
      else {
        this.props.history.push('/search?nyq='+ optdata.value);
      }
    })
  }

  componentDidMount()
  {
    if(this.state.checked !== JSON.parse(localStorage.getItem("s_value")))
      this.ISwitchhandleChange();
  }

  render() {
    return (
      <div>
        <IconContext.Provider value={{ color: "white", size: "1.25em" }}>
        <Navbar bg="primary" variant="dark" className="mynavbar" expand='lg'>
        <MediaQuery minWidth={992}>
        <div style={{width: '20%'}}>
        { this.inSearchPage() ?
        <AsyncSelect
            loadOptions={this.fetchOptions}
            noOptionsMessage = {() => "No Match"}
            onInputChange={this.handleInputChange}
            onChange={this.handleSearchChange}
            placeholder='Enter keyword ..'
          />:<AsyncSelect
            loadOptions={this.fetchOptions}
            noOptionsMessage = {() => "No Match"}
            onInputChange={this.handleInputChange}
            onChange={this.handleSearchChange}
            placeholder='Enter keyword ..'
            value={''}
          />
        }
        </div>
        </MediaQuery>
        <MediaQuery maxWidth={991}>
        <div style={{width: '80%'}}>
        { this.inSearchPage() ?
        <AsyncSelect
            loadOptions={this.fetchOptions}
            noOptionsMessage = {() => "No Match"}
            onInputChange={this.handleInputChange}
            onChange={this.handleSearchChange}
            placeholder='Enter keyword ..'
          />:<AsyncSelect
            loadOptions={this.fetchOptions}
            noOptionsMessage = {() => "No Match"}
            onInputChange={this.handleInputChange}
            onChange={this.handleSearchChange}
            placeholder='Enter keyword ..'
            value={''}
          />
        }
        </div>
        </MediaQuery>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" activeClassName={"active"} className="nav-link" exact={true}>Home</NavLink>
          <NavLink to="/world" activeClassName={"active"} className="nav-link">World</NavLink>
          <NavLink to="/politics" activeClassName={"active"} className="nav-link">Politics</NavLink>
          <NavLink to="/business" activeClassName={"active"} className="nav-link">Business</NavLink>
          <NavLink to="/technology" activeClassName={"active"} className="nav-link">Technology</NavLink>
          <NavLink to="/sports" activeClassName={"active"} className="nav-link">Sports</NavLink>
        </Nav>
        { this.displayRegBookmark() ?
          <>
          <MediaQuery minWidth={992}>
            <ReactTooltipHome effect='solid' className="tooltips" place="bottom"></ReactTooltipHome>
            <Link to='/favorites' data-tip='Bookmark' style={{marginRight:'15px',cursor:'default'}}><FaBookmark /></Link>
          </MediaQuery>
          <MediaQuery maxWidth={991}>
            <Link to='/favorites' style={{paddingRight:'5px',cursor:'default'}}><FaBookmark /></Link>
          </MediaQuery>
          </>:<>
          <MediaQuery minWidth={992}>
            <ReactTooltipHome effect='solid' className="tooltips" place="bottom"></ReactTooltipHome>
            <Link to='/favorites' data-tip='Bookmark' style={{marginRight:'15px',cursor:'default'}}><FaRegBookmark /></Link>
          </MediaQuery>
          <MediaQuery maxWidth={991}>
            <Link to='/favorites' style={{paddingRight:'5px',cursor:'default'}}><FaRegBookmark /></Link>
          </MediaQuery>
          </>
        }
          { this.displaySwitch() ?
            <>
            <div className='full_switch'>
            <MediaQuery minWidth={992}>
              <Row style={{paddingTop:'5px'}}>
              <Col lg={4} style={{paddingLeft:'20px',color:'white',fontSize:'18px'}}>NYTimes</Col>
              <Col lg={4} style={{paddingLeft:'24px'}}>
              <IphoneSwitch
                checked={this.state.checked}
                onChange={this.ISwitchhandleChange}
                offColor="#DDDDDD"
                onColor="#2693e6"
                onHandleColor="#ffffff"
                handleDiameter={25}
                uncheckedIcon={false}
                checkedIcon={false}
                height={25}
                width={53}
                className="react-switch"
                id="material-switch"
              />
              </Col>
              <Col lg={4} style={{padding:'0px',paddingLeft:'5px',color:'white',fontSize:'18px'}}>Guardian</Col>
              </Row>
            </MediaQuery>
            <MediaQuery maxWidth={991}>
              <div className='switch_titles_small_ny'>NYTimes</div>
              <div>
              <IphoneSwitch
                checked={this.state.checked}
                onChange={this.ISwitchhandleChange}
                offColor="#DDDDDD"
                onColor="#2693e6"
                onHandleColor="#ffffff"
                handleDiameter={25}
                uncheckedIcon={false}
                checkedIcon={false}
                height={25}
                width={53}
                className="react-switch"
                id="material-switch"
              />
              </div>
              <div className='switch_titles_small'>Guardian</div>
            </MediaQuery>
          </div>
          </>: null
        }
          </Navbar.Collapse>
        </Navbar>
        </IconContext.Provider>
      <main>
        <Switch>
          <Route exact path='/' render={(props) => <Home guardian_or_ny_app={this.state.checked} isAuthed={true} />}/>
          <Route exact path='/world' render={(props) => <World guardian_or_ny_app={this.state.checked} isAuthed={true} />}/>
          <Route exact path='/politics' render={(props) => <Politics guardian_or_ny_app={this.state.checked} isAuthed={true} />}/>
          <Route exact path='/business' render={(props) => <Business guardian_or_ny_app={this.state.checked} isAuthed={true} />}/>
          <Route exact path='/technology' render={(props) => <Tech guardian_or_ny_app={this.state.checked} isAuthed={true} />}/>
          <Route exact path='/sports' render={(props) => <Sports guardian_or_ny_app={this.state.checked} isAuthed={true} />}/>
          <Route exact path='/search' component={Search}/>
          <Route exact path='/article' component={Article}/>
          <Route exact path='/favorites' component={Favorite}/>
          <Route component={Error} />
        </Switch>
      </main>
      </div>
    );
  }
}
export default withRouter(Register)
