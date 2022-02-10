import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DragDropContext } from 'react-beautiful-dnd';

import './IssueBoard.css';

import BoardColumn from '../components/BoardColumn/BoardColumn';

export default function IssueBoard({ findIssue, filteredColumns }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const columns = useSelector(state => state.issues);
    const dispatch = useDispatch();

    const empty = {
        issue: {
            id: '',
            title: '',
            priority: '',
            storyPoints: '',
            description: '',
        }, 
        status: '',
    };

    useEffect(() => dispatch({type: "SET_BREADCRUMBS", payload: [{ id: 1, text: "International", url: "" }, { id: 2, text: "Issue Boards", url: "" }] }), []);
    useEffect(() => dispatch({type: "SET_ISSUE", payload: empty }), []);

    const handleSearchForm = (e) => {
        findIssue(e.search);
    }

    const onDragEnd = (result) => {
        if(!result.destination) return;
        const { source, destination } = result;
        let removed;

        filteredColumns.map((column) => {
            if(column.status == source.droppableId){
                [removed] = column.issues.splice(source.index, 1);
            }
        })

        columns.map((column) => {
            if(column.status == source.droppableId){
              column.issues = column.issues.filter((issue) => issue.id !== result.draggableId);
              dispatch({type: 'ADD_ISSUES', payload: column.issues});
            }
        })

        filteredColumns.map((column) => {
            if(column.status == destination.droppableId){
                column.issues.splice(destination.index, 0, removed);
            }
        })

        columns.map((column) => {
            if(column.status == destination.droppableId){
                column.issues.splice(destination.index, 0, removed);
                dispatch({type: 'ADD_ISSUES', payload: column.issues});
            }
        })
    }

    return (
        <>
            <div className = "issue-board-header">
                <h1>Issue Boards</h1>
                <Link to = "/new-issue" className = "new-issue-button">New Issue</Link>
            </div>
            <form className = "search-line" onSubmit={handleSubmit(handleSearchForm)}>
                <input type = "search" className="search-line__input" placeholder = "Search" {...register('search')}/>
                <button className = "search-line__button" type = "submit">Search</button>
            </form>
            <div className = "issue-boards">
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {filteredColumns.map((filteredIssue, index) => (<BoardColumn key = {index} index = { index } filteredIssue = { filteredIssue }/>))}
                </DragDropContext>
            </div>
        </>       
    );
}
