import React from 'react'
import { Separator } from '../ui/separator'

import Link from 'next/link'
import { FcElectricalSensor } from 'react-icons/fc'
import Image from 'next/image'

export default function Footer() {
  return (
    <section className='flex flex-col gap-5 mt-10'>
      <div className='flex flex-col md:flex-row gap-5 justify-between items-start mt-10'>
        <div className='flex gap-2 flex-col justify-center items-start'>
          <Link href="/" className="font-bold text-2xl  flex flex-row"><span className="text-primary mr-1">Unique</span>Design<span><FcElectricalSensor className="w-6 h-6" /></span></Link>
          <div className='flex gap-1 flex-col justify-center items-start '>
            <p>Find a location nearestyou</p>
            <Link className='text-primary' href={'/'}>See Our Stores</Link>
            <p> (08) 8942 1299</p>
            <p> helpline@yourdomain.com</p>
          </div>

        </div>

        <div className='flex gap-2 flex-col justify-center items-start '>
          <h1 className='capitalize font-medium text-xl'>Helps</h1>
          <div className='flex gap-1 flex-col justify-center items-start '>
            <Link href={'/'}>Returns</Link>
            <Link href={'/'}>Shipping</Link>
            <Link href={'/'}>Terms & Conditions</Link>
            <Link href={'/'}>FAQs</Link>
            <Link href={'/'}>Privacy Policy</Link>
          </div>
        </div>

        <div className='flex gap-2 flex-col justify-center items-start '>
          <h1 className='capitalize font-medium text-xl'>Quick Links</h1>
          <div className='flex gap-1 flex-col justify-center items-start '>
            <Link href={'/'}>Our Story</Link>
            <Link href={'/'}>Contact US</Link>
            <Link href={'/'}>Account</Link>
            <Link href={'/'}>Cart</Link>
            <Link href={'/'}>wishlist</Link>
          </div>
        </div>
        <div>
          <h1 className='capitalize font-medium text-xl'>Payments</h1>
          <div className='flex gap-1 flex-col justify-center items-start '>
            <Link href={"https://stripe.com/"}>
              <Image src={"/stripe.png"} width={100} height={100} alt='stripe icons' />
            </Link>

          </div>
        </div>

      </div>
      <Separator />
      <div> @copyright 2022</div>
    </section>
  )
}
