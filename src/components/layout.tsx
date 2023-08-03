import Navbar from "./navbar"
import Footer from "./footer"
import { Toaster } from 'react-hot-toast'
import React, { useState } from "react"
import { Providers } from "../redux/providers"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FC } from "react"

interface layoutProps {
  children: any
  data: any,
  brands_data: any,
  isArabic: boolean,
  lang: string,
  langData: any
}

export const Layout: FC<layoutProps> = ({ children, data, brands_data, isArabic, lang }) => {

  return (
    <Providers>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        className={"rounded-xl"}
      />
      <section className="py-0" >
        <Navbar data={data} brands_data={brands_data} isArabic={isArabic} lang={lang}  />
        <main>{children}</main>
        <Footer  />
      </section>
    </Providers>
  )
}


