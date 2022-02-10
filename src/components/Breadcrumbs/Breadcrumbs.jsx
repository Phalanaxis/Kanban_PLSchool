import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Breadcrumbs.css';

export default function Breadcrumbs () {
    const path = useSelector(state => state.breadcrumbs);


    return(
        <>
            <div className='Breadcrumbs'>
                {
                    path.map((element, index) => 
                        (index === path.length - 1)
                            ? <span className = "breadcrumbs__text" key = { element.id }>{ element.text }</span>
                            : <Link to = { element.url } className = "breadcrumbs__link" key = { element.id }>{ element.text }</Link>   
                    )
                }
            </div>
            <Outlet/>
        </>
    )
};