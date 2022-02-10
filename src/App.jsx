import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import './App.css'

import IssueBoard from './pages/IssueBoard';
import IssuePage from './pages/IssuePage';
import NewIssue from './pages/NewIssue';  
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';   

function App(props) {
    const columns = useSelector(state => state.issues);
    const currentIssue = useSelector(state => state.currentIssue);
    const dispatch = useDispatch();

    function findIssue(searchValue) {
        dispatch({type: 'FIND_ISSUE', payload:  searchValue});
    }

    function addNewIssue({ title, priority, storyPoints, status, description, id }) {
        if(id.length != 3){
          id = nanoid(3);
        }
        
        const newIssue = {id, title, priority, storyPoints, description};
    
        columns.map((column) => {
          if(column.status == status) {
            column.issues = [...column.issues, newIssue];
            dispatch({type: 'ADD_ISSUES', payload: column.issues});
          }
        })
    };

    function deleteIssue(id) {
        columns.map((column) => {
            if(column.status == currentIssue.status){
              column.issues = column.issues.filter((issue) => issue.id !== id);
              dispatch({type: 'ADD_ISSUES', payload: column.issues});
            }
        })
    }

    function editIssue({ title, priority, storyPoints, status, description, id }) {
        deleteIssue(id);
        addNewIssue({ title, priority, storyPoints, status, description, id });
    };

    return (
        <div className = "app">
            <Routes>
                <Route path = "/" element = {<Breadcrumbs/>}>
                    <Route index element = {<IssueBoard findIssue = { findIssue } filteredColumns = { props.issues }/>}/>
                    <Route path = "/new-issue"     element = { <NewIssue addNewIssue = { addNewIssue } action = 'add'/>}/>
                    <Route path = "/current-issue" element = { <IssuePage/> }/>
                    <Route path = "/edit-issue"    element = { <NewIssue addNewIssue = { editIssue } action = 'edit'/>}/>
                </Route>
            </Routes>
        </div>
    );
}

const mapStateToProps = function(state) {
    return {
        ...state,
        issues: state.issues.map((column) => ({
            id: column.id, 
            status: column.status, 
            issues: column.issues.filter(issue => 
                issue.title.toLowerCase().includes(state.filterIssues.toLowerCase()) ||
                issue.id.toLowerCase().includes(state.filterIssues.toLowerCase())
            )
        }))
    }
}

export default connect (mapStateToProps)(App);
