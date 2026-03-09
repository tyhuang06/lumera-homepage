import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTranslation } from 'react-i18next';

export function CollectionBreadcrumb({ collection }: { collection: string }) {
	const { t } = useTranslation();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">{t(`nav.home`)}</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<BreadcrumbLink href="/">
						{t(`nav.collections`)}
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<span className="text-muted-foreground">
						{t(`collections.${collection}`)}
					</span>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
