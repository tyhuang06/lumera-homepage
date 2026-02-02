import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import i18n from 'i18next';

const LANGUAGES = [
	{ code: 'zh-Hant', label: '繁體中文' },
	{ code: 'en', label: 'English' },
];

export function LanguageSwitcher() {
	const current = i18n.language;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					aria-label="Change language"
					className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
				>
					<Globe className="h-4 w-4" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{LANGUAGES.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => {
							i18n.changeLanguage(lang.code);
							localStorage.setItem('lang', lang.code);
						}}
						className={current === lang.code ? 'font-medium' : ''}
					>
						{lang.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
