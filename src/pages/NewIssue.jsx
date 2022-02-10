import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import './NewIssue.css';

export default function NewIssue ({ addNewIssue, action }) {
    const currentIssue = useSelector( state => state.currentIssue);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let link;
    
    if(action == 'add'){
        link = { id: 2, text: "New Issue", url: "/issue" };
    }
    else if(action == 'edit') {
        link = { id: 2, text: "Edit Issue", url: "/edit-issue" }
    }

    useEffect(() => dispatch({type: "SET_BREADCRUMBS", payload: [{ id: 1, text: "Issue Boards", url: "/" }, link ] }), []);


    const handleSubmitForm = (e) => {
        if (e.priority === "0") e.priority = "low";
        if (e.status   === "0"  ) e.status   = "todo";
        addNewIssue({...e, id: currentIssue.issue.id});
        navigate("/");
    }

    return (
        <form className = "newIssue" onSubmit={ handleSubmit(handleSubmitForm) }>
            <input defaultValue = { currentIssue.issue.title } {...register("title", { required: true, maxLength: 100 }) } type = "text" placeholder = "Title *" className = "newIssue__titleInput"/>
            <div className = "newIssue__container">
                <select defaultValue = { currentIssue.issue.priority }  {...register("priority")} className = "newIssue__priority">
                    <option value  = "0" disabled> Priority </option>
                    <option value = "low"> Low </option>
                    <option value = "medium"> Medium </option>
                    <option value = "high"> High </option>
                    <option value = "critical"> Critical </option>
                    <option value = "unknown"> Unknown </option>
                </select>
                <input 
                    defaultValue = { currentIssue.issue.storyPoints } 
                    {...register("storyPoints", { 
                        required: true, 
                        min: 1,
                        max: 10, 
                    }) } type = "text" placeholder = "Story points" className = "newIssue__storyPoints"
                />
                <select defaultValue = { currentIssue.status }  {...register("status")} className = "newIssue__options__status">
                    <option value = "0" disabled> Status </option>
                    <option value = "TO DO"> TO DO </option>
                    <option value = "IN PROGRESS"> IN PROGRESS </option>
                    <option value = "TEST"> TEST </option>
                    <option value = "DONE"> DONE </option>
                </select>
            </div>
            <textarea
                defaultValue = { currentIssue.issue.description }
                {...register("description", { required: true, maxLength: 300 })} 
                placeholder="Description" className="new-issue__text">
            </textarea>
            <button type = "submit" className = "new-issue__button">Save</button>
        </form>
    )
}