import { useCartActions } from "@/hooks/useCartActions";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, buttonVariants } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export const BrandsButton = ({
  selectedBrands,
  brandName,
  filterSet,
}: {
  selectedBrands: string;
  brandName: any;
  filterSet: any;
}) => {
  const [isInverted, setIsInverted] = useState(false);
  const brandsArray = selectedBrands.split(",");

  return (
    <div
      onClick={() => {
        setIsInverted(!isInverted);
        isInverted
          ? filterSet(
              0,
              "brands",
              brandName.toLowerCase().replace(/[\s&]+/g, "-"),
              true
            )
          : filterSet(
              0,
              "brands",
              brandName.toLowerCase().replace(/[\s&]+/g, "-"),
              false
            );
      }}
      className={`${
        brandsArray.includes(brandName.toLowerCase().replace(/[\s&]+/g, "-"))
          ? "!bg-blue-500 !text-white"
          : ""
      } ${
        isInverted ? "!bg-blue-500 !text-white " : " "
      } cursor-pointer text-blue-500 border border-blue-500 px-2 py-1 text-center my-1 mr-2 rounded-full hover:bg-blue-500 hover:text-white inline-block text-xs`}
    >
      {brandName}
    </div>
  );
};

export const ShopNowButton = ({
  classNames,
  children,
  onClick,
}: {
  children: any;
  classNames: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={
        "btn-primary sm:text-base text-sm sm:py-3 py-2 sm:px-7 px-5 " +
        classNames
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const DeliverInstructionsBtn = ({ instr }: { instr: any }) => {
  const [instrSelected, setInstrSelected] = useState(false);
  return (
    <button
      onClick={() => setInstrSelected(!instrSelected)}
      className={`border  p-2 rounded-lg ${
        instrSelected ? " bg-blue-200" : "border-muted"
      }`}
    >
      <Image
        src={instrSelected ? instr.icon_selected : instr.icon_unselected}
        height={50}
        width={50}
        alt="del-ins"
        className="mx-auto"
      />
      <Typography size={"xs"}>{instr.instruction}</Typography>
    </button>
  );
};

export const AddOrEditCartBtn = ({
  proId,
  setLoadingState,
  loadingState,
  isSingleProductPage,
}: {
  proId: string;
  setLoadingState: any;
  loadingState: boolean;
  isSingleProductPage: boolean;
}) => {
  const cartItems = useSelector((state: RootState) => state.cart);

  const [cartItemsAddTimeoutState, setCartItemsAddTimeout] =
    useState<any>(null);
  const [cartItemsUpdateTimeoutState, setCartItemsUpdateAddTimeout] =
    useState<any>(null);
  const [addBtnLoadingState, setAddBtnLoadingState] = useState<boolean>(false);
  const [loadingFinished, setLoadingFinished] = useState<boolean>(false);
  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const [addedToCartClicked, addedToCartState] = useState(false);

  const getProductQuantity = (productId: any) => {
    const productItem = cartItemsData?.find((item: any) =>
      item.items[0].id === productId ? item.items[0].qty : null
    );
    return productItem ? productItem.items[0].qty : 0;
  };

  const { createCart, updateCart } = useCartActions();

  const cartInit: any = {
    action: "",
    data: {
      items: [
        // {
        //     id: "a6c1a3e7-caea-4845-94ca-a49de40f18c0",
        //     qty: 1
        // }
      ],
      address_id: null,
    },
  };

  const clearCartState = () => {
    cartInit.data.items = [];
    cartInit.action = "";
  };

  useEffect(() => {
    setProQty(getProductQuantity(proId));
  }, []);
  const [proQty, setProQty] = useState<any>( 0);

  const addedToCart = () => {
    debugger;
    setProQty(1);
    setLoadingState(true);
    addedToCartState(true);
    setAddBtnLoadingState(true);
    clearTimeout(cartItemsAddTimeoutState);

    const timeout = setTimeout(() => {
      debugger;
      cartInit.data.items.push({ id: proId, qty: 1 });
      createCart(cartInit);
      setTimeout(() => {
        setLoadingState(false);
      }, 2500);
      setAddBtnLoadingState(false);
      setLoadingFinished(true);
      clearCartState();
    }, 800);

    setCartItemsAddTimeout(timeout);
    toast.success(`Item Added to the cart`);
  };

  const itemExists = () => {
    return cartItemsData?.some((item: any) => item.items[0].id === proId);
  };

  const updateCartQuantity = (updatedQty: number) => {
    debugger;
    setProQty(updatedQty);

    setLoadingState(true);
    addedToCartState(true);

    clearTimeout(cartItemsUpdateTimeoutState);

    const timeout = setTimeout(() => {
      debugger;
      cartInit.data.items.push({ id: proId, qty: updatedQty });
      updateCart(cartInit);
      setLoadingState(false);
      clearCartState();
    }, 1500);

    setCartItemsUpdateAddTimeout(timeout);
    toast.success(`Item Added to the cart`);
  };
  return (proQty > 0 && itemExists()) ||
    loadingFinished ||
    isSingleProductPage ? (
    <div className="flex items-center">
      <Button
        onClick={() => {
          proQty > 1 ? updateCartQuantity(proQty - 1) : null;
        }}
        variant={"ghost"}
        className=" !px-1 sm:h-[28px] sm:w-[28px] h-[23px] w-[23px] rounded-none"
      >
        <Icon type={proQty > 1 ? "minusIcon" : "trashIcon"} size={"sm"} />
      </Button>
      <Typography size={"sm"} className="sm:px-3 px-2 flex items-center">
        { isSingleProductPage && proQty ===0 ?1:  proQty}
      </Typography>
      <Button
        disableBtn={loadingState}
        onClick={() => {
          updateCartQuantity(proQty + 1);
        }}
        rounded={"none"}
        className="!px-1 sm:h-[28px] sm:w-[28px] h-[23px] w-[23px]"
      >
        <Icon
          type={"plusIcon"}
          size={"sm"}
          variant={"default"}
          iconIsLoading={loadingState}
          
        />
      </Button>
    </div>
  ) : (
    <Button
      size={"sm"}
      rounded={"sm"}
      iconLeft={true}
      iconType="addToCartIcon"
      isLoading={addBtnLoadingState}
      onClick={() => {
        addedToCart();
      }}
    >
      ADD
    </Button>
  );
};

export const ProductPricesData = ({
  productPrices,
}: {
  productPrices: any;
}) => {
  const { currency } = useLanguage();

  const offerPrice = productPrices[0].price.offer_price;
  const regularPrice = productPrices[0].price.regular_price;
  return (
    <div className="flex justify-between">
      {productPrices ? (
        offerPrice != regularPrice ? (
          <div className="flex space-x-2 items-center">
            <Typography
              bold={"bold"}
              size={"lg"}
              variant={"danger"}
              whitespace={"nowrap"}
            >
              {" "}
              <Typography size={"xs"} type="span">
                {currency}
              </Typography>{" "}
              {offerPrice}
            </Typography>
            <Typography
              size={"sm"}
              bold={"bold"}
              variant={"primary"}
              whitespace={"nowrap"}
              className="line-through"
            >
              {" "}
              <Typography size={"xs"} type="span">
                {currency}
              </Typography>{" "}
              {regularPrice}
            </Typography>
          </div>
        ) : (
          <Typography
            size={"lg"}
            bold={"bold"}
            variant={"primary"}
            whitespace={"nowrap"}
          >
            {" "}
            <Typography size={"xs"} type="span">
              {currency}
            </Typography>{" "}
            {regularPrice}
          </Typography>
        )
      ) : null}
    </div>
  );
};

export const RadioBtnGroup = ({
  id,
  value,
  name,
}: {
  id: string;
  value: string;
  name: string;
}) => {
  return (
    <>
      <input type="radio" className="hidden peer" id={id} name={name} />
      <label
        htmlFor={id}
        className={cn(
          buttonVariants({ variant: "primaryRadioCheck" }),
          "mb-2 mr-2"
        )}
      >
        {value}
      </label>
    </>
  );
};

// export const SmNavbarMenuBtn = ({
//   btnName,
//   redirectLink,
//   ...props
// }: {
//   btnName: string;
//   redirectLink: string;
// }) => {
//   const router = useRouter();

//   const { pathname } = router;

//   const getMenuIcons = (btnName: string) => {
//     switch (btnName) {
//       case "Cart":
//         return "cartIconMenu";
//       case "Account":
//         return "accountIcon";
//       case "Category":
//         return "categoryMenuIcon";
//       case "Home":
//         return "homeIconMenu";
//     }
//   };

//   return (
//     <button {...props}
//       className={` ${
//         pathname.includes(redirectLink) ? "text-blue-500 " : "text-gray-500"
//       }`}

//     >
//       {/* <BsCart className="sm:w-8 sm:h-8 w-6 h-6 mx-auto my-auto" /> */}
//       <Icon type={getMenuIcons(btnName)} size={"lg"} className="mx-auto"/>
//       <Typography size={"xs"}>{btnName}</Typography>
//     </button>
//   );
// };

export const SelectedFlagCountry = ({
  setLanguageModal,
}: {
  setLanguageModal: any;
}) => {
  const { selectedLanguage, selectedflag } = useLanguage();

  return (
    <button
      onClick={() => {
        setLanguageModal(true);
      }}
      className="flex flex-col justify-between md:pl-5 pl-0"
    >
      <Image
        src={selectedflag}
        className="w-10 h-8 rounded-2xl"
        height={100}
        width={100}
        alt="selectedFlag"
      />
      <Typography size={"sm"}>{selectedLanguage}</Typography>
    </button>
  );
};

