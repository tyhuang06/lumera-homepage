import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import i18n from 'i18next';

export function LanguageSwitcher() {
	const current = i18n.language;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					aria-label="Change language"
					className="
                        flex items-center gap-1
                        text-muted-foreground
                        hover:text-foreground
                        transition
                    "
				>
					<Globe className="h-4 w-4" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="min-w-100px">
				<DropdownMenuItem
					onClick={() => {
						i18n.changeLanguage('en');
						localStorage.setItem('lang', 'en');
					}}
					className={current === 'en' ? 'font-medium' : ''}
				>
					English
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => {
						i18n.changeLanguage('zh-Hant');
						localStorage.setItem('lang', 'zh-Hant');
					}}
					className={current === 'zh-Hant' ? 'font-medium' : ''}
				>
					繁體中文
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
