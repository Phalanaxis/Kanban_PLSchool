import React from 'react';
import IssueBoardCell from '../IssueBoardCell/IssueBoardCell';
import { Droppable } from 'react-beautiful-dnd';

import './BoardColumn.css';

export default function BoardColumn({ index, filteredIssue }){
    return (
    <div className = "issue-table">
        <div>
            <div>
                <div className = "issue-table__header"><h2 className = "issue-table__title">{filteredIssue.status}</h2></div>
            </div>
        </div>
        <div className = "issue-table__body">
            <Droppable droppableId = { filteredIssue.status }>
                {(provided, snapshot) => {
                    return (
                        <div 
                            {...provided.droppableProps}
                            ref = {provided.innerRef}
                            style = {{
                                backgroundColor: snapshot.isDraggingOver ? "gray" : "#F6F8F9",
                                height: '100%',
                                borderRadius: '6px',
                            }}
                        >
                            {provided.placeholder}
                            {filteredIssue.issues.map((issue, index) => (<IssueBoardCell key = { index } index = { index } issue = { issue } status = { filteredIssue.status }/>))}
                        </div>
                    )
                }}      
            </Droppable>
        </div>
    </div>
    )
}