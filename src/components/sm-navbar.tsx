import { SetStateAction } from "react";
import SmNavbarTop from "./sm-navbar-top";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { Typography } from "./ui/typography";
import { Input } from "./ui/input";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useModal } from "./ui/modalcontext";
import { Button } from "./ui/button";
import { SelectedFlagCountry } from "./Button";

const SmNavbar = ({
  locationOnClickHandle,
  setLanguageModal
}: {
  locationOnClickHandle: any;
  setLanguageModal:any
}) => {
  const { t, selectedLanguage, selectedflag } = useLanguage();
  const { data: session } = useSession();
  const { AddressDataIndex, searchButtonOnClick } = useModal();

  const displayAddress = () => {
    if (session && session.token.addresses.length > 0) {
      return AddressDataIndex?.google_address;
    } else {
      return "Dubai, United Arab Emirates";
    }
  };
  return (
    <div className="navbar-container bg-white border-b border-muted md:hidden block dark:bg-slate-800">
      <SmNavbarTop />
      <div className="container-page">
        <div className="flex space-x-4 items-center py-1">
          <Link href={"/"}>
            <Image
              className=" w-7"
              src="https://www.lifepharmacy.com/images/life.svg"
              alt="life-logo"
              width={70}
              height={70}
            />
          </Link>
          <Input
            onClick={() => {
              searchButtonOnClick(true);
            }}
            className="h-searchButtonOnClick"
            sizes={"sm"}
            iconLeft={true}
            iconLeftType="searchIcon"
            placeholder="Search for products..."
          />
          <div className="flex flex-col justify-between">
       
             <SelectedFlagCountry setLanguageModal={setLanguageModal} />

          </div>
        </div>
      </div>

      <div className="flex  bg-life text-white py-1 justify-between items-center container-page">
        <div className="flex space-x-2">
          <Typography size={"xs"} lineClamp={"one"}>
            {t.navbar.deliver_to}:
          </Typography>
          <Typography size={"xs"} lineClamp={"one"} className="w-1/2">
            {displayAddress()}
          </Typography>
        </div>
        <Button
          onClick={() => {
            locationOnClickHandle();
          }}
          iconLeft={true}
          iconType="locationPinIcon"
          variant="white"
          size={"xs"}
        >
          CHANGE
        </Button>
      </div>
    </div>
  );
};

export default SmNavbar;
