"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Orders() {
  const { register, handleSubmit, } = useForm({
    defaultValues: {
      firstName: "",
      category: "",
      aboutYou: "",
    },
    // resolver: zodResolver(schema),
  });
const [data, setData] = useState("");
  return (
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <h1 className='text-3xl'>This is test file</h1>
      <input {...register("firstName")} placeholder="First name" />
      <select {...register("category", { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <textarea {...register("aboutYou")} placeholder="About you" />
      <p>{data}</p>
      <input type="submit" />
    </form>
  )
}

