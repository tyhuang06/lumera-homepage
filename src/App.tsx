import './App.css';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Navbar } from './components/Navbar';

function App() {
	return (
		<>
			<Navbar />

			<Gallery />

			{/* <main className="pt-14">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/collections/:category"
						element={<CollectionPage />}
					/>
				</Routes>
			</main> */}

			<Footer />
		</>
	);
}

export default App;
