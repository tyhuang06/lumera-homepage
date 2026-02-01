import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<div className="pt-14 pl-4">
				<div>Images</div>
			</div>
			<Footer />
		</>
	);
}

export default App;
