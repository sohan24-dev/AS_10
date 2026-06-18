"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Banner() {
    const slides = [
        {
            img: "https://cdn.pixabay.com/photo/2020/01/19/08/24/justitia-4777072_1280.jpg",
            title: "Justice. Trust. Integrity.",
            desc: "Professional legal guidance built to protect your rights, resolve disputes, and secure your future with confidence.",
        },
        {
            img: "https://cdn.pixabay.com/photo/2018/10/31/11/15/justitia-3785581_1280.jpg",
            title: "Your Rights, Our Responsibility",
            desc: "From consultation to courtroom support, we stand beside you with clear advice and strong representation.",
        },
        {
            img: "https://cdn.pixabay.com/photo/2014/08/28/07/54/justitia-429717__340.jpg",
            title: "Legal Help You Can Trust",
            desc: "Experienced professionals ready to handle your legal challenges with care, strategy, and dedication.",
        },
    ];

    return (
        <section className="relative h-[70vh] min-h-[560px] w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={900}
                autoplay={{
                    delay: 4200,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop
                className="h-full w-full"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative h-full w-full">
                            <Image
                                src={slide.img}
                                alt={slide.title}
                                fill
                                priority={i === 0}
                                sizes="100vw"
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/45" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />

                            <div className="relative z-10 flex h-full items-center">
                                <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
                                    <div className="max-w-2xl text-white">
                                        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                                            <span className="h-2 w-2 rounded-full bg-blue-400" />
                                            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
                                                Legal Excellence
                                            </span>
                                        </div>

                                        <h1 className="text-4xl font-bold leading-[1.08] md:text-6xl lg:text-7xl">
                                            {slide.title}
                                        </h1>

                                        <p className="mt-6 max-w-xl text-base leading-8 text-gray-200 md:text-lg">
                                            {slide.desc}
                                        </p>

                                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                            <button className="rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-950/30 transition hover:bg-blue-700">
                                                Book Consultation
                                            </button>

                                            <button className="rounded-full border border-white/35 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                                                Explore Services
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .swiper-pagination {
                    bottom: 34px !important;
                }

                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.8);
                    opacity: 1;
                    transition: all 0.25s ease;
                }

                .swiper-pagination-bullet-active {
                    width: 30px;
                    border-radius: 999px;
                    background: #2563eb;
                }
            `}</style>
        </section>
    );
}