import Image from "next/image";
import { useEffect } from "react";
import { useState, Fragment } from "react";
import "react-phone-number-input/style.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

import { SmSearchBoxModal } from "./sm-searchbox-modal";
import SmMenu from "./sm-menu";
import { useLanguage } from "@/hooks/useLanguage";
import SmNavbarTop from "./sm-navbar-top";
import NavbarBottom from "./lg-navbar-bottom";
import dynamic from "next/dynamic";
import { useModal } from "./ui/modalcontext";
import SmNavbar from "./sm-navbar";

const LgNavbar = dynamic(() => import("./lg-navbar"), {
  ssr: false,
});

const LanguageChangeModal = dynamic(() => import("./language-change-modal"), {
  ssr: false,
});
const LocationModal = dynamic(() => import("./location-modal"), {
  ssr: false,
});
const AuthModal = dynamic(() => import("./authorixzation-modal"), {
  ssr: false,
});
const InvalidOTPModal = dynamic(() => import("./invalid-otp-modal"), {
  ssr: false,
});
const AddressModal = dynamic(() => import("./address-modal"), {
  ssr: false,
});

interface navbarProps {
  data: any;
  brands_data: any;
  isArabic: boolean;
  lang: string;
}

const Navbar: FC<navbarProps> = ({ data, brands_data, isArabic, lang }) => {
  const { t, countries, languages } = useLanguage();

  //-----------------------------hooks-------------------------------------
  const { data: session } = useSession();

  const { locale } = useLanguage();
  const [overlayVisible, setOverlay] = useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  //default-address

  const router = useRouter();

  //-----------------------------hooks-------------------------------------

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event: any) {}
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const searchSuggestions = (
    searchData: string,
    isMobile: boolean,
    type: string
  ) => {
    debugger;
    if (isMobile) {
      setSmScreenSearchBox(false);
    } else {
      searchButtonOnClick(false);
    }
    if (type === "search") {
      router.push(`/search?term=${searchData}`);
    } else {
      router.push(`/product/${searchData}`);
    }
  };

  const locationOnClickHandle = () => {
    debugger;
    if (session != null) {
      setaddNewAddress(true);

      if (session.token.addresses.length > 0) {
        setavailableAddresses(true);
      } else if (session.token.addresses.length === 0) {
        setAddNewAddressClick(true);
      }
    } else {
      setLocationModalState(true);
    }
  };

  const setModalState = (modalState: any) => {
    setLanguageModal(modalState);
  };
  const {
    locationModalState,
    setLocationModalState,
    setSheetOpen,
    setaddNewAddress,

    setnotValidOTPPageVisib,
    isSheetOpen,

    setLocationModal,
    notValidOTPPageVisib,
    SearchLoadingState,
    setavailableAddresses,
    searchButtonOnClick,
    searchData,queryData,
    searchButtonOnMouseEnter,
    smScreenSearchBox,
    setSmScreenSearchBox,
    setQueryData,
    searchBoxClear,
    searchClosebtn,  } = useModal();

  const parts = locale ? locale?.split("-") : ["ae", "en"];
  return (
    <>
      <SmNavbar
        locationOnClickHandle={locationOnClickHandle} setLanguageModal={setLanguageModal}
      />
      <LgNavbar
        setOverlay={setOverlay}
        data={data}
        brands_data={brands_data}
        locationOnClickHandle={locationOnClickHandle}
        setSheetOpen={setSheetOpen}
        searchData={searchData}
        SearchLoadingState={SearchLoadingState}
        queryData={queryData}
        isArabic={isArabic}
        searchSuggestions={searchSuggestions}
        searchButtonOnMouseEnter={searchButtonOnMouseEnter}
        setLanguageModal={setLanguageModal}
        setLocationModal={setLocationModal}
        searchButtonOnClick={searchButtonOnClick}
      />

      <LocationModal
        showModal={locationModalState}
        setCloseModal={setLocationModalState}
      />

      <InvalidOTPModal
        showModal={notValidOTPPageVisib}
        setCloseModal={setnotValidOTPPageVisib}
      />

      <AddressModal />

      <LanguageChangeModal
        setModalState={setModalState}
        modalState={languageModal}
        currentLanguage={parts[1] === "ar" ? languages[0] : languages[1]}
        currentCountry={parts[0] === "sa" ? countries[1] : countries[0]}
        countries={countries}
        languages={languages}
        lang={parts}
      />

      <SmSearchBoxModal
        showModal={smScreenSearchBox}
        setCloseModal={setSmScreenSearchBox}
        isArabic={isArabic}
        queryData={queryData}
        setQueryData={setQueryData}
        searchButtonOnMouseEnter={searchButtonOnMouseEnter}
        SearchLoadingState={SearchLoadingState}
        searchData={searchData}
        searchBoxClear={searchBoxClear}
        searchSuggestions={searchSuggestions}
        searchClosebtn={searchClosebtn}
      />

      <SmMenu
        searchButtonOnClick={searchButtonOnClick}
        setSmScreenSearchBox={setSmScreenSearchBox}
        isSheetOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      />

      <AuthModal/>

      {overlayVisible ? (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-10" />
      ) : null}
    </>
  );
};

export default Navbar;
