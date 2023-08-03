import { useLanguage } from "@/hooks/useLanguage"
import { useWindowDimensions } from "@/hooks/useWindowDimensions"
import getProductsDataByCat from "@/lib/getProductsDataByCat"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ContentLoader from "react-content-loader"

// const LgNavbarMenu = ({ setOverlay, data, brands_data }: { setOverlay: any, data: any, brands_data: any }) => {

//     return (
//         <div className="w-full bg-white shadow-md">
//             <div className="hidden md:grid grid-cols-12 bg-white max-w-[1440px] mx-auto relative ">

//                 <div onMouseOver={() => {
//                     setOverlay(true)
//                 }} onMouseLeave={() => { setOverlay(false) }} className="group inline-block shop-by-cat lg:col-span-2 col-span-3 min-w-fit">
//                     <button
//                         className="group-hover:bg-blue-500 py-[5px]  group-hover:text-white hover:text-white dropdown BeautyCareele flex justify-between px-2 border-r border-slate-300  items-center w-full bg-blue-50"
//                         id="dropdownDefaultButton" data-dropdown-toggle="dropdown">

//                         <div
//                             className=" flex w-6 h-6 my-2 float-left cursor-pointer items-center justify-center   p-0.5 ">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 group-hover:hidden block" viewBox="0 0 16 16">
//                                 <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
//                             </svg>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 group-hover:block hidden " viewBox="0 0 16 16">
//                                 <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
//                             </svg>
//                         </div>
//                         <div className="text-start text-sm group-1 align-middle flex justify-between whitespace-nowrap">
//                             {t.navbar.shop_by_cat}
//                         </div>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
//                             stroke="currentColor" className="h-6 float-right  w-4 mr-2 group-hover:-rotate-180 transition-transform duration-200">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                         </svg>
//                     </button>

//                     <div className="z-30 absolute border-t border group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0  transition-opacity duration-300 left-0 right-0 bg-white ">
//                         <div className="grid grid-cols-12">
//                             <div className=" xl:col-span-2 col-span-3">
//                                 {data.data.map((item: any, i: number) => (
//                                     <button onMouseOver={() => {
//                                         setSubCatIndex(0)
//                                         setHoverIndex(i)
//                                         data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (item.children.slice(subCatIndex, subCatIndex + 1).map((itm: any) => (
//                                             fetchTopBrandsData(`categories=${itm.slug}`, itm.slug)
//                                         ))))
//                                     }} className={`py-1 border-white border-b  w-full flex justify-between px-2 text-sm items-center bg-slate-200/80  hover:bg-slate-100 duration-200 transition-colors  ${hoverIndex === i ? '!bg-slate-100 font-semibold' : ""}`}>
//                                         <div className="space-x-2 flex items-center">
//                                             <div className="h-[50px] w-[50px]  border-[3px] border-slate-300/50 rounded-full">
//                                                 <Image src={`/images/${slugify(item.name)}.webp`} width={50} height={50} className="rounded-full w-full" alt={item.name} />
//                                             </div>
//                                             <div className={` text-[13px] whitespace-nowrap `} >{item.name}</div>
//                                         </div>
//                                         <ChevronRightIcon className="w-3 h-3" />
//                                     </button>
//                                 ))}
//                             </div>
//                             <div className="col-span-3 xl:col-span-2  bg-white overflow-y-auto overflow-x-hidden h-[415px]">
//                                 {data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (
//                                     item.children.map((itm: any, i: number) => (
//                                         <button onMouseOver={() => {
//                                             setSubCatIndex(i)
//                                             fetchTopBrandsData(`categories=${itm.slug}`, itm.slug)
//                                         }} className={`py-1 border-white border-b flex px-4 whitespace-nowrap justify-between w-full bg-slate-100 hover:bg-white duration-100 transition-colors text-sm items-center ${subCatIndex === i ? 'bg-white font-semibold' : ""}`}>
//                                             <div className="space-x-2 flex items-center" >
//                                                 <div className="h-[50px] w-[50px] border-[3px] border-slate-200 rounded-full">
//                                                     <Image src={itm.sections[0] && itm.sections[0].images.logo ? itm.sections[0].images.logo : "/images/default-product-image.png"} height={50} width={50} alt={itm.name} className="w-full rounded-full" />
//                                                 </div>
//                                                 <h5 className="text-[13px]">{itm.name}</h5>
//                                             </div>
//                                             <ChevronRightIcon className="w-3 h-3" />
//                                         </button>
//                                     ))
//                                 ))}
//                             </div>
//                             <div className="space-y-5 xl:col-span-8 col-span-6  px-4 bg-white max-h-[413px] overflow-y-auto overflow-x-hidden">
//                                 {/* <h3 className="font-semibold text-center ">CATEGORIES</h3> */}
//                                 <div className="grid xl:grid-cols-4 grid-cols-3 gap-4 py-2 relative">
//                                     {data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (
//                                         item.children.slice(subCatIndex, subCatIndex + 1).map((itm: any) => (
//                                             itm.sections.map((sec: any) => (
//                                                 sec.images.logo ?
//                                                     <Link className=" group/catImage lg:flex block  items-center hover:bg-slate-100 p-3 rounded-xl hover:font-bold " href={generatePath(item.name, itm.slug, sec.name)}>
//                                                         <Image src={sec.images.logo} alt={sec.name} width={60} height={60} className="group-hover/catImage:scale-110 duration-200 transition-transform lg:mx-0 mx-auto border-muted border-4 rounded-full max-h-[60px] max-w-[60px]" />
//                                                         <p className=" text-xs lg:ml-3 ml-0 lg:text-left text-center lg:mt-0 mt-3 text-black" style={{ wordBreak: "break-all" }} >{sec.name}</p>
//                                                     </Link>
//                                                     : null
//                                             ))
//                                         ))))}
//                                 </div>
//                                 <div className="sticky bottom-0 bg-white py-3">
//                                     <h3 className="text-lg font-bold text-left mt-2 px-3">TOP BRANDS</h3>
//                                     <div className="grid xl:grid-cols-7 lg:grid-cols-6 gap-3 grid-cols-4 ">
//                                         {singleCatBrandData && !topBrandsLoadingState ?
//                                             singleCatBrandData.slice(0, width > 1280 ? 7 : width > 991 ? 6 : 4).map((brandData: any) => (
//                                                 <Link className="group/brand relative" href={`/brand/${brandData.slug}`}>
//                                                     <Image src={brandData.images.logo ? brandData.images.logo : "/images/default-product-image.png"} height={80} width={80} className="mx-auto group-hover/brand:shadow-xl group-hover/brand:shadow-blue-200 duration-100 transition-shadow shadow rounded-lg" alt="brand-img" />
//                                                     <div className="absolute  left-0 right-0 bottom-0 bg-emerald-200  w-fit mx-auto rounded-tl-lg rounded-tr-lg px-1">
//                                                         <h5 className="text-center text-black text-[11px] whitespace-nowrap">{brandData.name}</h5>
//                                                     </div>
//                                                 </Link>
//                                             ))
//                                             :
//                                             <div className="col-span-full mx-auto">
//                                                 <ContentLoader
//                                                     width={500}
//                                                     height={100}
//                                                     viewBox="0 0 500 100"
//                                                     backgroundColor="#f3f3f3"
//                                                     foregroundColor="#ecebeb"
//                                                 >
//                                                     <circle cx="46" cy="38" r="38" />
//                                                     <rect x="34" y="83" rx="5" ry="5" width="25" height="10" />
//                                                     <rect x="547" y="222" rx="5" ry="5" width="220" height="10" />
//                                                     <rect x="82" y="150" rx="5" ry="5" width="220" height="10" />
//                                                     <circle cx="137" cy="38" r="38" />
//                                                     <rect x="124" y="83" rx="5" ry="5" width="25" height="10" />
//                                                     <circle cx="228" cy="38" r="38" />
//                                                     <rect x="215" y="83" rx="5" ry="5" width="25" height="10" />
//                                                     <circle cx="320" cy="38" r="38" />
//                                                     <rect x="307" y="83" rx="5" ry="5" width="25" height="10" />
//                                                     <circle cx="410" cy="38" r="38" />
//                                                     <rect x="398" y="83" rx="5" ry="5" width="25" height="10" />
//                                                 </ContentLoader>
//                                             </div>
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex space-x-6 ">
//                     <div className="group inline-block mr-2">
//                         <button className="hover:text-blue-500 underline-tra ml-7 py-1 flex">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
//                                 stroke="currentColor" className="w-6 h-6 my-2 float-left mr-3">
//                                 <path strokeLinecap="round" strokeLinejoin="round"
//                                     d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
//                             </svg>
//                             <Link href={"/brands"} className=" text-start mt-2 capitalize whitespace-nowrap">{t.navbar.brands}</Link>
//                         </button>
//                         <ul
//                             className="bg-white shadow-lg transform scale-0 group-hover:scale-100 absolute 
//             z-10 transition duration-150 ease-in-out origin-top hidden group-hover:flex flex-col  px-5  text-black left-0 right-0 border-t border-muted">
//                             <li key={"brands-section"} >
//                                 <div className="grid grid-cols-5 gap-3  mx-auto" id="brands-section">
//                                     {brands_data.data.brands.map((bd: any) => (
//                                         <div className="grid-flow-row mb-5"> <div className={`flex flex-col mr-5`}>
//                                             <Link href={`/brand/${bd.slug}`}>
//                                                 <Image className="mx-auto rounded-full border border-white bg-white shadow-md" width={120} height={120} src={bd.images.logo} alt="" />
//                                                 <h5 className="text-center mt-3">{bd.name}</h5>
//                                             </Link>
//                                         </div></div>
//                                     ))}
//                                 </div>
//                                 <div className="w-full text-center my-5">
//                                     <Link href="/brands" className="text-white px-8 py-2 text-sm mx-auto rounded-full bg-primary">VIEW ALL</Link>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className=" inline-block mr-2">
//                         <button className="hover:text-blue-500 underline-tra py-1 flex">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
//                                 stroke="currentColor" className="w-6 h-6 my-2 mr-3">
//                                 <path strokeLinecap="round" strokeLinejoin="round"
//                                     d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
//                             </svg>
//                             <Link href={"/offers"} className=" text-start mt-2  ">{t.navbar.offers}</Link>
//                         </button>
//                     </div>
//                     <button className="  hover:text-blue-500 underline-tra flex items-center" >
//                         <Link href={"/health_checkup"} className=" text-start h-fit whitespace-nowrap ">{t.navbar.health_packages}</Link>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LgNavbarMenu

import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { animate, motion, motionValue } from "framer-motion"
import { Icon } from "./ui/icons"
import { Typography } from "./ui/typography"
import { BrandsSkeleton } from "./skeletons"
import { buttonVariants } from "./ui/button"
import { ThemeToggle } from "./theme-toggler"
const LgNavbarCategoriesSection = ({ setOverlay, data, brands_data }: { setOverlay: any, data: any, brands_data: any }) => {
    const [hoverIndex, setHoverIndex] = useState<any>(0)
    const [subCatIndex, setSubCatIndex] = useState<any>(0)
    const [topBrandsData, setTopBrandsData] = useState<any>([])
    const [topBrandsLoadingState, setTopBrandsLoadingState] = useState<any>(false)
    const [singleCatBrandData, setSingleCatBrandData] = useState<any>(null)
    const [topBrandsTimer, setTopBrandsTimer] = useState<any>(null)
    const { t, locale } = useLanguage()
    const { width } = useWindowDimensions()
    const [groupHoverState, setGroupHover] = useState(false)
    // const [domLoaded, setdomLoaded] = useState(false)
    const [itemHoverActive, setItemHoverActive] = useState<any>(null)

    const noOfBrands = () => {
        return width > 1280 ? 7 : width > 991 ? 6 : 4
    }

    useEffect(() => {
        // setdomLoaded(true)
        fetchTopBrandsData(`categories=${"facial-skin-care"}`, 'facial-skin-care')
    }, [])

    const fetchTopBrandsData = (filterPath: any, path: any) => {
        const topBrandsDataExists = topBrandsData.some((brandsData: any) => brandsData.type === path)

        if (!topBrandsDataExists) {
            setTopBrandsLoadingState(true)

            clearTimeout(topBrandsTimer)

            const fetchDataTimer = setTimeout(() => {
                getProductsDataByCat(filterPath, 0, false, locale).then(data => {
                    setTopBrandsData([...topBrandsData, { brands: [...data.data.brands], type: path }])
                    // console.log(topBrandsData);

                    setTopBrandsLoadingState(false)

                    setSingleCatBrandData(data.data.brands)
                }
                )
            }, 500)

            setTopBrandsTimer(fetchDataTimer)

        }
        else {
            const singleCat = topBrandsData.filter((brandsData: any) => brandsData.type === path)
            setSingleCatBrandData(singleCat[0].brands)
        }
    }

    function slugify(text: string) {
        return text.toLowerCase().replace(/[\s&/]+/g, '-')
    }

    function generatePath(grand_p: string, parent: string, child: string) {
        return `/category/${slugify(grand_p)}/${parent}/${slugify(child)}`
    }
    const x = motionValue(0)

    animate(x, 0, { duration: 0.1 })

    return (
        <div className='bg-white md:block hidden  shadow dark:bg-slate-900/70'>
            <NavigationMenu.Root className="max-w-[1450px] mx-auto relative flex justify-between">
                <NavigationMenu.List className="center m-0 list-none grid grid-cols-12 items-center ">
                    <NavigationMenu.Item onMouseOver={() => {
                        setOverlay(true)
                        setGroupHover(true)
                    }}
                        onMouseLeave={() => {
                            setOverlay(false)
                            setGroupHover(false)
                        }} className="inline-block xl:col-span-2 col-span-3 min-w-fit group">
                        <NavigationMenu.Trigger className={`${groupHoverState ? "bg-primary text-white dark:bg-slate-600" : ""}  py-[5px] flex justify-between px-2 border-r border-slate-300  items-center w-full bg-blue-50 dark:bg-slate-700`}
                            id="dropdownDefaultButton" data-dropdown-toggle="dropdown">
                            <div
                                className=" flex my-2 items-center justify-center p-0.5 ">
                                <Icon type="hamburgerMenuIcon" className="group-hover:hidden block" />
                                <Icon type="crossIcon" className="group-hover:block hidden" />
                            </div>

                            <Typography size={"sm"}>{t.navbar.shop_by_cat}</Typography>

                            <Icon type="chevronBottomIcon" className="mr-2 group-hover:-rotate-180 transition-transform duration-200" />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content onMouseOver={() => {
                            setOverlay(true)
                            setGroupHover(true)
                        }} onMouseLeave={() => {
                            setGroupHover(false)
                            setOverlay(false)
                        }} className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0  right-0">
                            <div className="grid grid-cols-12">
                                <div className=" xl:col-span-2 col-span-3  h-[415px] overflow-hidden dark:bg-slate-800">
                                    {data.data.map((item: any, i: number) => (
                                        <button onMouseOver={() => {
                                            setSubCatIndex(0)
                                            setHoverIndex(i)
                                            data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (item.children.slice(subCatIndex, subCatIndex + 1).map((itm: any) => (
                                                fetchTopBrandsData(`categories=${itm.slug}`, itm.slug)
                                            ))))
                                            setItemHoverActive(null)
                                        }} className={`relative py-1 w-full flex justify-between px-2 text-sm items-center  `}>
                                            {hoverIndex === i ?
                                                <motion.div
                                                    transition={{ duration: 0.3 }}
                                                    className="bg-slate-100 dark:bg-slate-700/70 absolute left-0 right-0 h-full bottom-0 z-0" layoutId="underline" />
                                                : null}
                                            <div className="space-x-2 flex items-center z-10 overflow-hidden">
                                                <div className="h-[50px] w-[50px]  border-2 border-slate-300/50 rounded-full">
                                                    <Image src={`/images/${slugify(item.name)}.webp`} width={50} height={50} className="rounded-full w-full" alt={item.name} />
                                                </div>
                                                <Typography size={"xs"} whitespace={"nowrap"} textElipssis={"textElipssis"}>{item.name}</Typography>
                                            </div>
                                            <Icon size={"xs"} type="chevronRightIcon" className="z-10" />
                                        </button>
                                    ))}
                                </div>
                                <div className="col-span-3 xl:col-span-2 bg-slate-100 overflow-y-auto overflow-x-hidden h-[415px]  dark:bg-slate-700">
                                    {data.data.slice(hoverIndex, hoverIndex + 1).map((item: any) => (
                                        item.children.map((itm: any, i: number) => (
                                            <button onMouseOver={() => {
                                                setSubCatIndex(i)
                                                fetchTopBrandsData(`categories=${itm.slug}`, itm.slug)
                                                setItemHoverActive(null)
                                            }} className={`relative py-1 flex px-4 justify-between w-full text-sm items-center`}>
                                                {subCatIndex === i ?
                                                    <motion.div transition={{ duration: 0.3 }} className="bg-slate-200 dark:bg-slate-800/70 absolute left-0 right-0 h-full z-0" layoutId="layoutIdunique" />
                                                    : null}
                                                <div className="space-x-2 flex items-center z-10 overflow-hidden" >
                                                    <div className="h-[50px] w-[50px] border-2 border-slate-200 rounded-full">
                                                        <Image src={itm.sections[0] && itm.sections[0].images.logo ? itm.sections[0].images.logo : "/images/default-product-image.png"} height={50} width={50} alt={itm.name} className="w-full rounded-full" />
                                                    </div>
                                                    <Typography size={"xs"} whitespace={"nowrap"} textElipssis={"textElipssis"}>{itm.name}</Typography>
                                                </div>
                                                <Icon size={"xs"} type="chevronRightIcon" className="z-10" />
                                            </button>
                                        ))
                                    ))}
                                </div>
                                <div className=" xl:col-span-8 col-span-6  px-4 bg-white max-h-[413px] dark:bg-slate-800/70">
                                    {/* <h3 className="font-semibold text-center ">CATEGORIES</h3> */}
                                    <div className="grid xl:grid-cols-4 grid-cols-3 gap- py-2 relative overflow-x-hidden overflow-y-auto max-h-[270px]">
                                        {data.data.slice(hoverIndex, hoverIndex + 1).map((item: any, i: number) => (
                                            item.children.slice(subCatIndex, subCatIndex + 1).map((itm: any) => (
                                                itm.sections.map((sec: any, indx: number) => (
                                                    sec.images.logo ?
                                                        <Link onMouseOver={() => setItemHoverActive(indx)} className=" group/catImage relative lg:flex block  items-center p-3 rounded-xl" href={generatePath(item.name, itm.slug, sec.name)}>
                                                            <Image src={sec.images.logo} alt={sec.name} width={50} height={50} className={`z-10 ${itemHoverActive === indx ? "scale-110" : "border-muted"} lg:mx-0 mx-auto  border-4 rounded-full max-h-[60px] max-w-[60px]`} />
                                                            {/* <p className="z-10 text-xs lg:ml-3 ml-0 lg:text-left text-center lg:mt-0 mt-3 text-black" style={{ wordBreak:te "break-all" }} >{sec.name}</p> */}
                                                            <Typography size={"xs"} type="p" whitespace={"nowrap"} textElipssis={"textElipssis"} className="lg:ml-3 ml-0 lg:text-left text-center lg:mt-0 mt-3 z-10" style={{ wordBreak: "break-all" }} >{sec.name}</Typography>
                                                            {itemHoverActive === indx ?
                                                                <motion.div transition={{ duration: 0.3 }} className="bg-slate-200/60 dark:bg-slate-800/70 absolute left-0 right-0 h-full  z-0 rounded-lg" layoutId="itemsLayouts" />
                                                                : null}
                                                        </Link>
                                                        : null
                                                ))
                                            ))))}
                                    </div>
                                    <div className="  py-1 ">
                                        <Typography size={"lg"} bold={"bold"} className="text-left" type="h3">TOP BRANDS</Typography>
                                        <div className="grid xl:grid-cols-7 lg:grid-cols-6 gap-3 grid-cols-4 py-2">
                                            {singleCatBrandData && !topBrandsLoadingState ?
                                                singleCatBrandData.slice(0, noOfBrands()).map((brandData: any) => (
                                                    <Link className="group/brand relative " href={`/brand/${brandData.slug}`}>
                                                        <Image src={brandData.images.logo ? brandData.images.logo : "/images/default-product-image.png"} height={80} width={80} className="mx-auto group-hover/brand:shadow-xl group-hover/brand:shadow-blue-200 duration-100 transition-shadow shadow bg-white rounded-lg" alt="brand-img" />
                                                        <div className="absolute  left-0 right-0 bottom-0 bg-emerald-200  w-fit mx-auto rounded-tl-lg rounded-tr-lg px-1">
                                                            <Typography size={"xs"} type="p" whitespace={"nowrap"} textElipssis={"textElipssis"} alignment={"horizontalCenter"}  >{brandData.name}</Typography>
                                                        </div>
                                                    </Link>))
                                                :
                                                <BrandsSkeleton noOfSuggestions={noOfBrands()} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item className="w-full xl:col-span-1 col-span-2">
                        <NavigationMenu.Trigger onMouseOver={() => setOverlay(true)} onMouseLeave={() => setOverlay(false)} className="w-full group flex  select-none items-center justify-center rounded-[4px] px-3  text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            <Link href={"/brands"} className="flex items-center underline-tra hover:text-blue-500 ">
                                <Icon type="brandsIcon" className="my-2" />
                                <Typography type="h6" className="ml-3" >Brands</Typography>
                            </Link>
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content onMouseOver={() => setOverlay(true)} onMouseLeave={() => setOverlay(false)} className="absolute top-0 left-0 right-0 w-full sm:w-auto">
                            <ul
                                className="">
                                <li key={"brands-section"} >
                                    <div className="grid grid-cols-5 gap-3  mx-auto" id="brands-section">
                                        {brands_data.data.brands.map((bd: any) => (
                                            <Link href={`/brand/${bd.slug}`} className="group/brand">
                                                <Image className="mx-auto rounded-full border border-white bg-white shadow-md group-hover/brand:shadow-xl" width={120} height={120} src={bd.images.logo} alt="" />
                                                <Typography type="h5" className="mt-3" alignment={"horizontalCenter"}>{bd.name}</Typography>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="w-full text-center my-5">
                                        <Link href="/brands" className={buttonVariants({ variant: "default", rounded: "full"})}>VIEW ALL</Link>
                                    </div>
                                </li>
                            </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item className="w-full xl:col-span-1 col-span-2">
                        <NavigationMenu.Link href={"/offers"}
                            className="w-full group flex underline-tra hover:text-blue-500  select-none items-center justify-center rounded-[4px] px-3  font-medium leading-none ">
                            <Icon type="offersIcon" className="my-2" />

                            <Typography type="h6" className="ml-3" >Offers</Typography>

                        </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item className="w-full xl:col-span-1 col-span-2">
                        <NavigationMenu.Link href="/packages"
                            className="w-full group flex  underline-tra hover:text-blue-500 items-center justify-center rounded-[4px] px-3  font-medium leading-none">
                            <Image src={"https://www.lifepharmacy.com/images/appointments.svg"} className="w-5 h-5 my-3" width={24} height={24} alt="appointments" />

                            <Typography type="h6" className="ml-3" >Packages</Typography>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>


                    <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                        <div className="relative top-[100%] h-[17px] w-[17px] rotate-[45deg] rounded-tl-[2px] bg-white" />
                    </NavigationMenu.Indicator>
                </NavigationMenu.List>

                <div className=" absolute top-full left-0 right-0 flex w-full justify-center">
                    <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full mx-auto origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 " />
                </div>

            </NavigationMenu.Root>

        </div>

    );
};



export default LgNavbarCategoriesSection;