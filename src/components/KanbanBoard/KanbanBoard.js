import React, {Component} from 'react';
import './KanbanBoard.css';
import List from './List';

export default class KanbanBoard extends Component {
    constructor(props) {
        super(props);

        if(localStorage.getItem('lists')) {
            const rawLS = localStorage.getItem('lists');
            const parsedLS = JSON.parse(rawLS);
            this.state = { lists: parsedLS }
          } else {
            this.state = {
              lists: [
                {
                  title: 'Derrick',
                  id: 0,
                  cards: [{
                    taskText: 'default task card 1',
                    listNumber: 0,
                    timeId: 0
                  }, 
                  {
                    taskText: 'default task card 2',
                    listNumber: 0,
                    timeId: 1
                  }]
                },
                {
                  title: 'Maxwell',
                  id: 1,
                  cards: [{
                    taskText: 'default task card 1',
                    listNumber: 1,
                    timeId: 2
                  }, 
                  {
                    taskText: 'default task card 2',
                    listNumber: 1,
                    timeId: 3
                  }]
                },
                {
                  title: 'Zaza',
                  id: 2,
                  cards: [{
                    taskText: 'default task card 1',
                    listNumber: 2,
                    timeId: 4
                  }, 
                  {
                    taskText: 'default task card 2',
                    listNumber: 2,
                    timeId: 5
                  }]
                },
                {
                  title: 'Sam',
                  id: 3,
                  cards: [{
                    taskText: 'default task card 1',
                    listNumber: 3,
                    timeId: 6
                  }, 
                  {
                    taskText: 'default task card 2',
                    listNumber: 3,
                    timeId: 7
                  }]
                }
              ]
            }

            localStorage.setItem('lists', JSON.stringify(this.state.lists))
        }
    }

    //get id of item being dragged and list where it's coming from
  onDragStart = (e, fromList) => {
    console.log(`what a drag!`)
    const dragInfo = {
      taskId: e.currentTarget.id,
      fromList: fromList
    }
  
    localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
  }

  onDragOver = (e) => {
    e.preventDefault();
  }
}
