import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/useLanguage"
import LgScreenSubMenu from "./lg-screen-sub-menu"
import NavbarBottom from "./lg-navbar-bottom"
import LgSearch from "./lg-search"
import LgNavbarCategoriesSection from "./lg-navbar-menu"
import { useModal } from "./ui/modalcontext"
const LgNavbar = ({ setOverlay, data, brands_data, setSheetOpen, setLocationModal, searchButtonOnMouseEnter, SearchLoadingState, queryData, isArabic, searchSuggestions, setLanguageModal, searchButtonOnClick, searchData, locationOnClickHandle }: { setSheetOpen: any, searchData: any, searchButtonOnClick: any, SearchLoadingState: any, setLanguageModal: any, queryData: any, isArabic: boolean, searchSuggestions: any, searchButtonOnMouseEnter: any, setLocationModal: any, locationOnClickHandle: any,setOverlay: any, data: any, brands_data: any }) => {

  const { countries, languages } = useLanguage()
  const { AddressDataIndex } = useModal()

  return (
    <div className="md:block hidden navbar-container bg-life">
      <div className="container-page flex gap-5  sm:py-5 py-3 items-center ">
        <Link href={"/"} className="my-auto block">
          <Image src="https://www.lifepharmacy.com/images/logo-white.svg" alt=""
            className="" width={380} height={250} />
        </Link>
        <LgSearch SearchLoadingState={SearchLoadingState} searchButtonOnClick={searchButtonOnClick} searchButtonOnMouseEnter={searchButtonOnMouseEnter} searchSuggestions={searchSuggestions} searchData={searchData} queryData={queryData} isArabic={isArabic} />
        <LgScreenSubMenu setSheetOpen={setSheetOpen} countries={countries} languages={languages} setLanguageModal={setLanguageModal} setLocationModal={setLocationModal} />
      </div>
      <NavbarBottom locationOnClickHandle={locationOnClickHandle} />
      <LgNavbarCategoriesSection setOverlay={setOverlay} data={data} brands_data={brands_data} />
    </div>
  )
}

export default LgNavbar