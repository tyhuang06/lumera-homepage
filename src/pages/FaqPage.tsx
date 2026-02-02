import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_KEYS = ['q1', 'q2', 'q3'] as const;

type AnswerBlock =
	| string
	| {
			type: 'list';
			items: string[];
	  };

export default function FaqPage() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('seo.faq.title')}</title>
				<meta name="description" content={t('seo.faq.description')} />
			</Helmet>

			<main className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="text-3xl tracking-wide">{t('faq.title')}</h1>

				<Accordion type="single" collapsible className="mt-10">
					{FAQ_KEYS.map((key) => {
						const answer = t(`faq.${key}.answer`, {
							returnObjects: true,
						}) as AnswerBlock[];

						return (
							<AccordionItem key={key} value={key}>
								<AccordionTrigger>
									{t(`faq.${key}.question`)}
								</AccordionTrigger>

								<AccordionContent>
									<div className="space-y-4">
										{answer.map((block, i) => {
											if (typeof block === 'string') {
												return (
													<p
														key={i}
														className="text-sm text-muted-foreground"
													>
														{block}
													</p>
												);
											}

											if (block.type === 'list') {
												return (
													<ul
														key={i}
														className="ml-4 list-disc space-y-2 text-sm text-muted-foreground"
													>
														{block.items.map(
															(item, j) => (
																<li key={j}>
																	{item}
																</li>
															)
														)}
													</ul>
												);
											}

											return null;
										})}
									</div>
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</main>
		</>
	);
}
