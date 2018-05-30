import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

class Main extends Component
{
    render() {
        return (
            <div class="container">
                <Header/>
                <Lobby/>
            </div>
        );
    }
}

class Header extends Component {
	render() {
		return (
			<nav>
				<h1>CAH</h1>
				<p>Name</p>
			</nav>
		);
	}
}

class Lobby extends Component {
	render() {
		return (
			<div>
				<header>
					<h2>Lobby</h2>
					<button>New Game</button>
				</header>
				<div class="rooms">
					<div class="room">
						<p>Test server</p>
						<p>(status)</p>
						<button>Join</button>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Main />, document.getElementById('app'));