import { combineReducers } from 'redux';

import issues from './issues';
import currentIssue from './currentIssue';
import filterIssues from './filterIssues';
import breadcrumbs from './breadcrumbs';

export default combineReducers({
    issues,
    currentIssue,
    filterIssues,
    breadcrumbs,
})










