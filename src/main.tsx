import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ScrollToTop />
		<App />
	</BrowserRouter>
);
