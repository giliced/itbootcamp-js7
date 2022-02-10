import React, { Component } from 'react';//importuje se react(po defaultu) i komponenta koja mora biti unutar { }


class Counter extends Component { //Counter naziv proizvoljan
    state = { 
        counter: 0,
        imageURL: 'https://picsum.photos/200',
        tags: ["tag1", "tag2", "tag3"]
    }

    // constructor() {
    //     super();
    //     console.log('Consructor', this);
    //     this.formatCount = this.formatCount.bind(this)
    // }


    handleIncrement = () => {
        console.log('handleIncrement')

        this.setState({counter: this.state.counter + 1})
    }

    handleDecrement = () => {
        console.log('handleDecrement');
        this.setState({counter: this.state.counter - 1})
    }

    styles = {
        fontSize: "10px",
        fontWeight: "bold"
    }

    // formatCount() {

    //     //destructuring
    //     const { counter } = this.state
    //     console.log(counter)

    // }


    addClass = () => {
        return this.state.counter === 0 ? "warning" : "success"
    }

    formatCount = () => {
        const {counter} = this.state

        return counter === 0 ? "Zero" : counter
    }


    render() { //sluzi za vracanje vrednosti
        return (
            <div >
                <h2 style={this.styles}>Pozdrav iz Child komponente</h2>
                <p style={{ fontSize: 30 }}>Ja sam paragraf</p>

                <img src={this.state.imageURL} />

                <button onClick={this.handleDecrement}>-</button>

                {/*<p>Count: {this.state.counter}</p>*/}
                <p className={this.addClass()}>Nas counter je: {this.formatCount()} </p>
                <button onClick={this.handleIncrement}>+</button>

                <h1>Tagovi</h1>

                {
                    this.state.tags.map((tag, index) => (
                        <p key={index}> # {tag}</p>
                    ))
                }

            </div>  
        );
    }
}

export default Counter;