import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './IssuePage.css';
import '../components/IssueBoardCell/IssueBoardCell.css'

export default function IssuePage () {
    const currentIssue = useSelector(state => state.currentIssue);

    const dispatch = useDispatch();

    useEffect(()=> dispatch({type: "SET_BREADCRUMBS", payload: [{ id: 1, text: "Issue Boards", url: "/" }, { id: 2, text: `#${currentIssue.issue.id} ${currentIssue.issue.title}`, url: "" }] }), [])

    return (
        <div className = "issue">
            <h3 className = "issue__title">{currentIssue.issue.id} {currentIssue.issue.title}</h3>
            <div className = "issue__container">
                <div className = {`cell-footer__priority cell-footer__priority_${currentIssue.issue.priority}`}></div>
                <p className = "issue__storyPoints">{currentIssue.issue.storyPoints}</p>
                <p className = "issue__status">{currentIssue.status}</p>
                <Link to = "/edit-issue" className = "issue__editButton">edit</Link>
            </div>
            <p className = "issue__description">{currentIssue.issue.description}</p>
        </div> 
    );  
}