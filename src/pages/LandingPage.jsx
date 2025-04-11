import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"




const LandingPage = () => {


  return (
    <>
      <div className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
        <section className="text-center">
          <h1 className="flex flex-col justify-center items-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">Get Your Dream Job
            <span className="flex items-center gap-2 sm:gap-6">and get <img src="/logo.png" alt="logo" className="h-14 sm:h-24 lg:h-32" />
            </span>
          </h1>

          <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
            Explore thousands of job listings or find a perfect candidate
          </p>

        </section>
        <div className="flex justify-center gap-6">
          <Link to='/jobs'>
            <Button variant='blue' size='xl'>Find Jobs</Button>
          </Link>
          <Link to='/post-job'>
            <Button variant='destructive' size='xl'>Post A Job</Button>
          </Link>
        </div>

        {/* carousel */}
        <Carousel
          className="w-full py-10"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}

        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {
              companies.map(({ name, id, path }) => {
                return <CarouselItem key={id} className="basis-1/3 sm:basis-1/6">
                  <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
                </CarouselItem>

              })
            }
          </CarouselContent>
        </Carousel>

        {/* banner */}
        <img src="/banner.jpeg" alt="banner" className="w-full" />

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* cards */}
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              Search and apply for jobs, track applications and more.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              Post jobs, manage applications and find the best candidate.
            </CardContent>
          </Card>

        </section>

        {/* Accordion */}
        <Accordion type="single" collapsible>
         {faqs.map((i,idx)=>{
         return <AccordionItem key={idx} value={`item-${idx+1}`}>
            <AccordionTrigger>{i.question}</AccordionTrigger>
            <AccordionContent>
             {i.answer}
            </AccordionContent>
          </AccordionItem>})}
        </Accordion>

      </div>
    </>
  )
}

export default LandingPage
