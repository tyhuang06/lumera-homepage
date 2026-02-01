import { Route, Routes } from 'react-router';
import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';

function App() {
	return (
		<>
			<Navbar />

			<main className="pt-8">
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route
						path="/collections/:category"
						element={<CollectionPage />}
					/> */}
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
