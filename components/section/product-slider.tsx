import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

function ProductSlider() {
  return (
    <Carousel className="w-full select-none" opts={
      {
        loop: true,

      }
    }>
      <CarouselContent>
        <CarouselItem className="relative">
          <div className="absolute w-full h-full bg-black/30">
            <div className="flex flex-col justify-center items-start h-full ml-20  w-full gap-5">
              <h1 className="text-5xl font-bold text-white">Get upto 30% off</h1>
              <Link href={"/offer/slider"} className="text-white text-lg font-medium px-4 py-2 bg-primary rounded-lg">Get Now</Link>
            </div>
          </div>
          <Image src={'/009furniture-banner-12.jpg'} width={1000} height={500} alt={'image'} className="w-full object-cover" />
        </CarouselItem>

        <CarouselItem className="relative">
          <div className="absolute w-full h-full bg-black/30">
            <div className="flex flex-col justify-center items-start h-full ml-20  w-full gap-5">
              <h1 className="text-5xl font-bold text-white">Get Modern Furnitures</h1>
              <Link href={"/offer/new"} className="text-white text-lg font-medium px-4 py-2 bg-primary rounded-lg">Get Now</Link>
            </div>
          </div>
          <Image src={'/009furniture-banner-11.jpg'} width={1000} height={500} alt={'image'} className="w-full object-cover" />
        </CarouselItem>
        <CarouselItem className="relative">
          <div className="absolute w-full h-full bg-black/30">
            <div className="flex flex-col justify-center items-start h-full ml-20  w-full gap-5">
              <h1 className="text-5xl font-bold text-white">Get free delivery country wide</h1>
              <Link href={"/offer/slider"} className="text-white text-lg font-medium px-4 py-2 bg-primary rounded-lg">Get Now</Link>
            </div>
          </div>
          <Image src={'/009furniture-banner-10.jpg'} width={1000} height={500} alt={'image'} className="w-full object-cover" />
        </CarouselItem>

      </CarouselContent>

    </Carousel>
  )
}

export default ProductSlider