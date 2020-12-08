import React from 'react';
import './App.css';
import LeaderBoard from './Component/LeaderBoard';
import 'h8k-components';

const title = "SPA - LeaderBoard";

function App() {
	return (
		<div className="App">
			<h8k-navbar header={title}></h8k-navbar>
			<LeaderBoard />
		</div>
	);
}

export default App;
