import DefaultBanner from '@/components/DefaultBanner'
import React from 'react'
import AboutPageFakes from "@/fakeDatas/AboutPageFakes"
import ImpactSection from "@/components/sections/impact.jsx";
import Testimonials from '@/components/sections/Testimonials.jsx';
import HomePageFakes from "@/fakeDatas/HomePageFakes"; 
import Founders from "@/components/sections/founders.jsx";


const page = () => {
  const { bannerData: { backgroundImage, FakeTitle } } = AboutPageFakes;

  return (
    <>
      <section className='w-[100%] flex flex-col items-center'>
        <div>
          <DefaultBanner title={FakeTitle} backgroundImage={backgroundImage} />
        </div>
        <div className='flex flex-col'>
        <div>
          <ImpactSection ImpactData={HomePageFakes.ImpactData} />
        </div>
        <div>
          <Testimonials testimonialsData={AboutPageFakes.testimonialsData} />
        </div>
        <div>
           <Founders foundersData={AboutPageFakes.foundersData}/>
        </div>
        </div>
      </section>
    </>
  )
}

export default page


