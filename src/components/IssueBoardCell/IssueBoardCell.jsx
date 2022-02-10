import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import './IssueBoardCell.css';

export default function IssueBoardCell ({ index, issue, status }) {
    const dispatch = useDispatch();

    return (
        <Draggable key = { issue.id } draggableId = { issue.id } index = { index }>
            {(provided, snapshot) => {
                return(
                    <div 
                        ref = {provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                    >
                        <div className = "cell-container">
                            <div className = "cell" >
                                <Link to =  "/current-issue" className = "cell-link" onClick={() =>  dispatch({type: "SET_ISSUE", payload: {issue, status}})}>
                                    <p>{issue.title}</p>
                                    <div className = "cell-footer">
                                        <div className = "cell-footer__status">
                                            <div className = {`cell-footer__priority cell-footer__priority_${issue.priority}`}></div>
                                            <p className="cell-footer__storyPoints">{issue.storyPoints}</p>
                                        </div>
                                        <p className="cell-id">{issue.id}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}