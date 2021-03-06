import React, { Component } from 'react';
import ChildCounter from './ChildCounter';

class Counters extends Component {
    state = { 
        counters: [
            { id: 0, value: 0},
            { id: 1, value: 0},
            { id: 2, value: 0},
            { id: 3, value: 0},
        ]
     }
    render() {
        return (
            <div>
                {this.state.counters.map((counter) => (
                        <ChildCounter key={counter.id} value={counter.value}/>
                ))}
            </div>
        );
    }
}

export default Counters;