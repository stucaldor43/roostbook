import React from 'react';
import './../../stylesheets/components/Comments/styles.css';

const Comments = ({comments}) => {
    const commentItems = comments.map((comment) => (
        <li className="userComment">
            <div>
                <div><a href="" className="userComment-username">{comment.username}</a></div>
                <div className="userComment-date">{comment.date}</div>
            </div>
            <p className="userComment-text">{comment.text}</p>
        </li>
    ));
    
    return (
        <ul className="commentList">
            {commentItems}
        </ul>
    );
}

export default Comments;