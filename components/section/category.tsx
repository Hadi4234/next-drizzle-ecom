import React from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/server'

async function Category() {
  const category = await db.query.categories.findMany()
  return (
    <section className='flex flex-col justify-center items-start gap-5 my-10'>
      <h1 className='capitalize font-medium text-xl'>Category</h1>
      <Separator />
      <div className='flex gap-5 flex-row justify-center items-center '>
        {
          category.map((item, index) => (
            <Link
              href={`/category/${item.id}`}
              key={index}
              className='flex flex-col gap-1 justify-center items-center'
            >
              <div className='w-48 h-48 bg-primary/10 dark:bg-foreground/50 rounded-full flex justify-center items-center'>
                <Image src={item.image} width={60} height={60} alt={item.name} className='object-contain' />
              </div>
              <h1 className=' capitalize text-xl'>{item.name}</h1>
            </Link>
          ))
        }

      </div>
    </section>
  )
}

export default Category