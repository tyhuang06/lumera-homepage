import { useTranslation } from 'react-i18next';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ContentListBlock, type ListBlock } from '@/components/ContentBlocks';
import { Seo } from '@/components/Seo';

const FAQ_KEYS = ['q1', 'q2', 'q3'] as const;

type AnswerBlock = string | ListBlock;

export default function FaqPage() {
	const { t } = useTranslation();

	return (
		<>
			<Seo title={t('seo.faq.title')} description={t('seo.faq.description')} />

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
													return <ContentListBlock key={i} block={block} />;
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
