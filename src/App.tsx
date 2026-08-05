import { Route, Routes } from 'react-router';
import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import IconsPage from './pages/IconsPage';
import GiftingPage from './pages/GiftingPage';
import ProductPage from './pages/ProductPage';
import MaterialsPage from './pages/MaterialsPage';
import StoryPage from '@/pages/StoryPage';
import FaqPage from '@/pages/FaqPage';

function App() {
	return (
		<>
			<ScrollToTop />
			<Navbar />
			<AnnouncementBar />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/icons" element={<IconsPage />} />
					<Route path="/gifting" element={<GiftingPage />} />
					<Route path="/products/:id" element={<ProductPage />} />
					<Route path="/collections/:type" element={<CategoryPage />} />
					<Route path="/story" element={<StoryPage />} />
					<Route path="/materials" element={<MaterialsPage />} />
					<Route path="/faq" element={<FaqPage />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
