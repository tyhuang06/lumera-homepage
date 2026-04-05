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

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-3xl px-6 py-16">
					<h1 className="font-cormorant text-4xl font-light tracking-wide text-charcoal mb-10">
						{t('faq.title')}
					</h1>

					<Accordion type="single" collapsible className="mt-4">
						{FAQ_KEYS.map((key) => {
							const answer = t(`faq.${key}.answer`, {
								returnObjects: true,
							}) as AnswerBlock[];

							return (
								<AccordionItem key={key} value={key}>
									<AccordionTrigger className="text-left">
										{t(`faq.${key}.question`)}
									</AccordionTrigger>

									<AccordionContent>
										<div className="space-y-4">
											{answer.map((block, i) => {
												if (typeof block === 'string') {
													return (
														<p key={i} className="text-sm text-muted-foreground">
															{block}
														</p>
													);
												}

												if (block.type === 'list') {
													return (
														<ul key={i} className="space-y-2">
															{block.items.map((item, j) => (
																<li key={j} className="flex gap-3 text-sm text-muted-foreground">
																	<span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
																	{item}
																</li>
															))}
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
				</div>
			</main>
		</>
	);
}
