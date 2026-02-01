import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type Props = {
	images: string[];
};

export function ProductGallery({ images }: Props) {
	return (
		<div className="product-gallery relative w-full aspect-square rounded-sm border overflow-hidden">
			<Swiper
				modules={[Pagination]}
				pagination={{ clickable: true }}
				slidesPerView={1}
				className="absolute inset-0 h-full"
			>
				{images.map((src, i) => (
					<SwiperSlide key={i}>
						<img
							src={src}
							loading="lazy"
							className="
                                w-full
                                h-full
                                object-cover
                            "
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
