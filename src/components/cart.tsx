import React, { useEffect, useState } from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SingleCartItem from "./single-cart-item";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Typography, typographyVariants } from "./ui/typography";
import { cn } from "@/lib/utils";
import { Icon } from "./ui/icons";
// { children }: { children: any }
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [domLoaded, setDomLoaded] = useState(false);
  const cartSummery = cartItems.cart.cart_summary;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];

  return (
    <div className="">
      <div className="max-w-[1450px] px-[10px] mx-auto my-5 md:flex block ">
        {domLoaded && cartItemsData.length > 0 ? (
          <>
            <div className="pt-0 md:w-8/12 w-full py-1 rounded-xl mr-3 h-fit">
              <div className="">
                {cartItemsData.map((cartData: any) => (
                  <SingleCartItem item={cartData.items[0]} />
                ))}
              </div>
            </div>
            <div className="  bg-white rounded-lg py-1 px-2  md:w-4/12 w-full space-y-3">
              <div className="border-2 border-muted h-fit flex p-2 rounded-lg shadow-sm mb-3 items-center">
                <div className="mr-2">
                  <Image
                    src={"https://www.lifepharmacy.com/images/return.svg"}
                    height={40}
                    width={40}
                    alt={"delivery"}
                  />
                </div>
                <div className="p-1">
                  <Typography variant={"lifeText"} size={"xs"} bold={"bold"}>
                    RETURN POLICY
                  </Typography>
                  <Typography size={"xs"}>
                    Orders once placed can't be returned or exchanged{" "}
                  </Typography>
                  <Link
                    href={"#"}
                    className={buttonVariants({
                      variant: "primaryLink",
                      size: "xs",
                    })}
                  >
                    Learn More
                  </Link>{" "}
                </div>
              </div>
              <div
                className={cn(
                  typographyVariants({ variant: "lifeText", size: "xs" }),
                  "border-2 border-muted h-fit  p-5 rounded-lg shadow-md  space-y-2"
                )}
              >
                <Typography bold={"bold"}>ORDER SUMMARY</Typography>
                <div className="space-y-2">
                  <div
                    className={cn(
                      typographyVariants({ variant: "lifeText", size: "xs" }),
                      "flex justify-between"
                    )}
                  >
                    <p>Order Total</p>
                    <p>AED {cartSummery.sub_total}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Items Discount</p>
                    <p>- AED {cartSummery.item_discount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Estimated VAT %</p>
                    <p>AED {cartSummery.vat}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>
                      Shipping{"  "}
                      <Link
                        href="#"
                        className={buttonVariants({
                          variant: "primaryLink",
                          size: "xs",
                        })}
                      >
                        Know More
                      </Link>
                    </p>
                    {cartSummery.shipping_fee != 0 ? (
                      <p>{cartSummery.shipping_fee}</p>
                    ) : null}
                    <p> FREE ABOVE 29 AED</p>
                  </div>
                </div>
                <div className="bg-slate-100 w-10/12 mx-auto h-[1px] my-2 "></div>
                <div className="space-y-3">
                  <div className="flex justify-between ">
                    <p>
                      {" "}
                      <Typography bold={"semibold"} size={"sm"}>
                        Total Amount
                      </Typography>{" "}
                      (Inclusive of VAT)
                    </p>
                    <Typography bold={"semibold"} size={"sm"}>
                      {cartSummery.total}
                    </Typography>
                  </div>
                  <div className="flex ">
                    <img
                      src="https://www.lifepharmacy.com/images/payment-method.svg"
                      alt=""
                      className="mx-auto"
                    />
                  </div>
                </div>
              </div>
              <Link
                href={"/checkout"}
                className={"w-full " + buttonVariants({ variant: "outline" })}
              >
                CONTINUE SHOPPING
              </Link>

              <Link
                href={"/checkout"}
                className={"w-full " + buttonVariants({ variant: "default" })}
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </>
        ) : (
          <div className="mx-auto space-y-4 py-5">
            <Icon size={"xl"} type="cartMenuIcon" />
            <Typography variant={"lifeText"} size={"lg"}>
              No products added to the cart
            </Typography>
            <Button size={"lg"} className="w-full">
              RETURN TO SHOP
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
