import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Navbar />
			<div className="pt-14">
				<div>Body</div>
			</div>
		</>
	);
}

export default App;
