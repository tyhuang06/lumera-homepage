import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default function FaqPage() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('seo.faq.title')}</title>
				<meta name="description" content={t('seo.faq.description')} />
			</Helmet>

			<main className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="font-didot text-3xl tracking-wide">
					{t('faq.title')}
				</h1>

				<Accordion type="single" collapsible className="mt-10">
					{['q1', 'q2', 'q3'].map((key) => (
						<AccordionItem key={key} value={key}>
							<AccordionTrigger>
								{t(`faq.${key}.question`)}
							</AccordionTrigger>
							<AccordionContent>
								{t(`faq.${key}.answer`)}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</main>
		</>
	);
}
