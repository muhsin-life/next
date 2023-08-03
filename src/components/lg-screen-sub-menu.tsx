import { useLanguage } from "@/hooks/useLanguage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CommandDemo } from "./cmd-cart";
import { Button, buttonVariants } from "./ui/button";
import { Typography, typographyVariants } from "./ui/typography";
import { Icon } from "./ui/icons";
import { useRouter } from "next/router";
import { CartBadge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { SelectedFlagCountry } from "./Button";
import { ThemeToggle } from "./theme-toggler";

const LgScreenSubMenu = ({
  countries,
  setSheetOpen,
  languages,
  setLanguageModal,
  setLocationModal,
}: {
  setSheetOpen: any;
  countries: any;
  languages: any;
  setLanguageModal: any;
  setLocationModal: any;
}) => {
  const { t, locale, selectedLanguage, selectedflag } = useLanguage();
  const [domLoaded, setDomLoaded] = useState(false);
  const { data: session } = useSession();
  const cartItems = useSelector((state: RootState) => state.cart);
  const cartItemsData =
    cartItems.cart.shipment_data && cartItems.cart.shipment_data[0]
      ? cartItems.cart.shipment_data[0].products
      : [];
  const subTotal = cartItems?.cart?.cart_summary?.sub_total;
  const router = useRouter();
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const redirect = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className=" flex justify-between my-auto items-center h-12 w-fit text-white ">
      <ThemeToggle/>

      <SelectedFlagCountry setLanguageModal={setLanguageModal} />

      <button
        onClick={() => {
          session ? redirect("/dashboard") : setSheetOpen(true);
        }}
        className="flex flex-col justify-between pl-5 items-center"
      >
        <Icon type="accountIcon" className="mb-1" size={"lg"} />
        <Typography size={"xs"}>{t.navbar.account}</Typography>
      </button>

      <button
        onClick={() => redirect("/wishlist")}
        className="flex flex-col justify-between pl-5 items-center"
      >
        <Icon type="heartIcon" className="mb-1" size={"lg"} />
        <Typography size={"xs"}>{t.navbar.wishlist}</Typography>
      </button>

      <button className="relative flex flex-col justify-between pl-5 items-center group/cart">
        <Icon
          onClick={() => redirect("/cart")}
          type="cartMenuIcon"
          className="mb-1"
          size={"lg"}
        />
        {domLoaded && cartItemsData && cartItemsData.length > 0 ? (
          <CartBadge message={cartItemsData.length} />
        ) : null}
        <Typography size={"xs"}>{t.navbar.cart}</Typography>

        {domLoaded && cartItemsData && cartItemsData.length > 0 ? (
          <div className="group-hover/cart:scale-100 bg-white  scale-0 absolute w-[25rem] top-[3rem] right-0  rounded-lg px-3 py-2   h-fit  shadow-lg z-30">
            <CommandDemo cartItems={cartItemsData} subTotal={subTotal} />
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default LgScreenSubMenu;
