import React, { Component } from 'react';

class ChildCounters extends Component {
    state = { 
        
    }
    render() {
        return (
            <div>#{this.props.value}
            <p>Ovo je iz state-a {this.props.value}</p>
            </div>
        );
    }
}

export default ChildCounter;