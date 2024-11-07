"use client";

import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Container from "../container";

const ProgramsDetailed = ({ programs }) => {
    if (!Array.isArray(programs)) {
        return <p>No programs available.</p>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className=" my-12 font-ibm">
            <Container>
                {programs.map((program, index) => (
                    <div key={index} className="mb-8 md:mx-20 mx-8">
                        <h2 className="text-3xl font-bold mb-4">{program.title}</h2>
                        <p className="text-xl mb-5 text-justify">{program.description}</p>
                        <div className="flex flex-col md:flex-row md:items-start md:gap-4">
                            <Slider {...settings} className="w-full mb-4 md:mb-10">
                                {program.images.map((image, imgIndex) => (
                                    <div key={imgIndex} className="px-1">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={300}
                                            height={200}
                                            className="rounded-lg h-[10rem] object-cover"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                ))}
            </Container>
        </section>
    );
};

export default ProgramsDetailed;
