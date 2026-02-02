import { Route, Routes } from 'react-router';
import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import StoryPage from '@/pages/StoryPage';
import FaqPage from '@/pages/FaqPage';

function App() {
	return (
		<>
			<Navbar />

			<main className="pt-14">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/collections/:category"
						element={<CategoryPage />}
					/>
					<Route path="/story" element={<StoryPage />} />
					<Route path="/faq" element={<FaqPage />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
