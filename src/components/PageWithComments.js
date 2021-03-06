import React from 'react';
import commentBox from 'commentbox.io';

export default class PageWithComments extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('YOUR_project_ID-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.art_id}/>
        );
    }
}
