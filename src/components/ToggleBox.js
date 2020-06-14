import React, { Component } from "react";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { IconContext } from "react-icons";
import '../App.css';
import Scroll from 'react-scroll';

var Element = Scroll.Element;
var scroller = Scroll.scroller;
class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}

	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
		if(!opened)
		{
			//setTimeout(function(){window.scrollTo({top: 10000, left: 0, behavior: 'smooth' })}, 1);
			scroller.scrollTo('myScrollToElement', {
			  duration: 750,
			  delay: 10,
			  smooth: true,
			});
		}
		else {
			setTimeout(function(){window.scrollTo({top: 0, left: 0, behavior: 'smooth' })}, 10);
		}
	}

	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

    if(this.props.display_matkar === true)
    {
      return(<div className='expanddesc'>{this.props.info}</div>);
    }

		if (opened){
			title = <IoIosArrowUp/>;
		}else{
			title = <IoIosArrowDown/>;
		}

		return (
			<div className="box">
			<IconContext.Provider value={{ color: "black", size: "1.25em" }}>
				{opened ? <div className='expanddesc'>
					{this.props.info_non}
					</div>:<div className='expanddesc'>
					{this.props.info}
					</div>
				}
				<Element name="myScrollToElement"></Element>
				<br/>
				{opened && (
					<div className="boxContent">
						{children}
					</div>
				)}
        <div className="boxTitle" onClick={this.toggleBox}>
          {title}
        </div>
				</IconContext.Provider>
			</div>
		);
	}
}

export default ToggleBox;
