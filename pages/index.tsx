import Head from 'next/head'

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LoginForm from '../component/loginForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  return (

    <div className=" h-screen flex justify-center items-center container px-4 mx-auto">
      <LoginForm />

    </div >
  )
}
