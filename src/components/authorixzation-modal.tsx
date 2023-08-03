import React, { useEffect } from "react";
import ModalContainer from "./ui/modal-container";
import {
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useTimer } from "use-timer";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Input } from "./ui/input";
import Image from "next/image";

import OtpInput from "react-otp-input";
import { useModal } from "./ui/modalcontext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography, typographyVariants } from "./ui/typography";
import { Icon } from "./ui/icons";
import { cn } from "@/lib/utils";

const AuthModal = () => {
  const [isPhoneNumberValid, setPhoneNumberValidState] = useState<any>("");
  const [signInUsing, signInSet] = useState({ value: "", type: "" });
  const [isEmailValid, setEmailValidState] = useState<any>(null);
  const [otpPageVisibility, setOtpPageVisibility] = useState(false);
  const [state, setState] = useState("");
  const [countDownVisible, setCountDownVisible] = useState(false);
  const handleChange = (state: string) => setState(state);
  const [phoneNumberforOTP, setPhoneNumberforOtp] = useState("");
  const [LoginSignUpPageVisibility, setLoginSignUpPageVisibility] =
    useState(true);
  const { pathname } = useRouter();
  const [selectedCountryData, setSelectedCountryData] = useState<any>(null);
  console.log(pathname);

  const {
    setSheetOpen,
    setaddNewAddress,
    setaddnewAddressFormVisibility,
    setnotValidOTPPageVisib,
    isSheetOpen,
    setLocationModal,
    setFormData,
    formData,
    isFixedModal,
  } = useModal();

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 59,
    timerType: "DECREMENTAL",
  });

  async function otpIsValid(otpValue: string) {
    if (signInUsing.type === "Phone") {
      await signIn("credentials", {
        phone: phoneNumberforOTP,
        code: otpValue,
        isPhone: "true",
        redirect: false,
      }).then(async (res) => {
        if (res?.ok) {
          setaddNewAddress(true);
          setaddnewAddressFormVisibility(false);
          setLocationModal(false);
          setSheetOpen(false);
        } else {
          setnotValidOTPPageVisib(true);
        }
      });
    } else {
      await signIn("credentials", {
        email: phoneNumberforOTP,
        code: otpValue,
        isPhone: "false",
        redirect: false,
      }).then(async (res) => {
        if (res?.ok) {
          setaddNewAddress(true);
          setaddnewAddressFormVisibility(false);
          setLocationModal(false);
          setSheetOpen(false);
        } else {
          setnotValidOTPPageVisib(true);
        }
      });
      setPhoneNumberValidState(false);
      setEmailValidState(false);
    }
  }

  function sendOTPtoPhoneNo(pHNumber: string, type: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw;
    if (type === "Phone") {
      raw = JSON.stringify({
        phone: pHNumber,
      });
    } else if (type === "Email") {
      raw = JSON.stringify({
        email: pHNumber,
      });
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    setPhoneNumberforOtp(pHNumber);
    const res = fetch(
      "https://prodapp.lifepharmacy.com/api/auth/request-otp",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error while fetching search data", error));
  }

  const [phoneNumberValidTimeout, setPhoneNumberValidTimeout] =
    useState<any>(null);

  function isValidCredentials(value: string) {
    setPhoneNumberValidState("loading");
    clearTimeout(phoneNumberValidTimeout);
    const timeout = setTimeout(() => {
      if (value != null) {
        if (isValidPhoneNumber(value)) {
          setPhoneNumberValidState("success");
          setFormData({ ...formData, phone: value });
          signInSet({ type: "Phone", value: value });
        } else {
          setPhoneNumberValidState("failed");
        }
      }
    }, 400);
    setPhoneNumberValidTimeout(timeout);
  }

  function isValidEmail(value: string): void {
    setEmailValidState("loading");
    clearTimeout(phoneNumberValidTimeout);
    const timeout = setTimeout(() => {
      if (value !== "") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setEmailValidState("success");
          signInSet({ type: "Email", value: value });
        } else {
          setEmailValidState("failed");
        }
      } else {
        setEmailValidState("failed");
      }
    }, 400);
    setPhoneNumberValidTimeout(timeout);
  }

  function startTimer() {
    start();
    setCountDownVisible(true);
  }
  const stopTimer = () => {
    setCountDownVisible(false);
    reset();
    return 0;
  };

  function isValidPhoneNoInput(SetOtpVisb: boolean) {
    if (SetOtpVisb) {
      setLoginSignUpPageVisibility(false);
      setOtpPageVisibility(true);
      setState("");
      startTimer();

      sendOTPtoPhoneNo(signInUsing.value, signInUsing.type);
    } else {
      setLoginSignUpPageVisibility(true);
      setOtpPageVisibility(false);
      stopTimer();
      setPhoneNumberValidState(false)
    }
  }

  const [countriesData, setCountriesData] = useState<any>(null);
  useEffect(() => {
    fetch(
      "https://restcountries.com/v2/region/Asia?fields=name,alpha2Code,callingCodes"
    )
      .then((res) => res.json())
      .then((countriesData) => {
        setCountriesData(countriesData);
        const selectedCountriesDatas = countriesData.filter(
          (countryData: any) => countryData.alpha2Code === "AE"
        );
        setSelectedCountryData(selectedCountriesDatas);
      });
  }, []);
  const [countriesDrawerState, setCountriesDrawerState] = useState(false);

  return (
    <>
      <ModalContainer
        size={"lg"}
        showModal={isSheetOpen}
        setCloseModal={
          isFixedModal && pathname === "/checkout" ? () => {} : setSheetOpen
        }
      >
        <div className=" flex justify-between border-b-2 border-muted pb-3 font-semibold ">
          <Typography size={"xl"} bold={"bold"}>
            Login or Sign up
          </Typography>
          <div className="cursor-pointer">
            <Icon
              onClick={() => {
                isFixedModal ? () => {} : setSheetOpen(false);
              }}
              type="crossIcon"
              size="lg"
            />
          </div>
        </div>
        {LoginSignUpPageVisibility ? (
          <form className="sm:space-y-2 space-y-0 pb-2" action="#">
            <div className="mt-3 flex-1">
              <Tabs value="phone" className="border-none">
                <TabsHeader className="bg-slate-100">
                  <Tab key="phone" value="phone" className="z-20">
                    <Typography bold={"semibold"}>Using Phone</Typography>
                  </Tab>
                  <Tab key="email" value="email">
                    <Typography bold={"semibold"}>Using Email</Typography>
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel key="phoneinput" value="phone">
                    <div>
                      <Typography
                        bold={"semibold"}
                        size={"lg"}
                        requiredField={true}
                      >
                        Enter Your Mobile Number
                      </Typography>
               
              

                        <Input
                        buttonLeft={
                          <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setCountriesDrawerState(true);
                          }}
                          variant={"normal"}
                          className="rounded-r-none"
                        >
                          {selectedCountryData ? (
                            <>
                              {" "}
                              <Image
                                src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData[0].alpha2Code.toLowerCase()}.svg`}
                                width="50"
                                height="50"
                                className="sm:w-8 sm:h-8 h-7 w-7"
                                alt={countriesData[0].name}
                              />
                              <Typography
                                className="pl-2"
                                bold={"bold"}
                                size={"lg"}
                              >
                                {" "}
                                +{selectedCountryData[0].callingCodes}
                              </Typography>
                              <Icon
                                type="chevronBottomIcon"
                                className="text-black"
                              />
                            </>
                          ) : null}
                        </Button>
                        }
                          className={cn(
                            typographyVariants({
                              bold: "bold",
                              size: "lg",
                            }),
                            "rounded-l-none"
                          )}
                          onChange={(e) =>
                            isValidCredentials(
                              "+" +
                                selectedCountryData[0].callingCodes +
                                e.target.value
                            )
                          }
                          iconRight={
                            isPhoneNumberValid === "loading" ? (
                              <Icon
                                variant={"inputLoadingIcon"}
                                className={typographyVariants({
                                  variant: "lifeText",
                                })}
                                size={"sm"}
                                type="loadingIcon"
                              />
                            ) : isPhoneNumberValid === "success" ? (
                              <Icon
                                type="checkIcon"
                                variant={"inputIconRight"}
                                className="text-green-500"
                              />
                            ) : isPhoneNumberValid === "failed" ? (
                              <Icon
                                type="errorIcon"
                                className="text-red-500"
                                variant={"inputIconRight"}
                              />
                            ) : null
                          }
                        />
                  
                    </div>
                  </TabPanel>
                  <TabPanel key="emailInput" value="email">
                    <div>
                      <Typography
                        bold={"semibold"}
                        size={"lg"}
                        requiredField={true}
                      >
                        Enter Your Email Address
                      </Typography>

                      <Input
                        className={typographyVariants({
                          bold: "bold",
                          size: "lg",
                        })}
                        iconRight={
                          isEmailValid === "loading" ? (
                            <Icon
                              variant={"inputLoadingIcon"}
                              className={typographyVariants({
                                variant: "lifeText",
                              })}
                              size={"sm"}
                              type="loadingIcon"
                            />
                          ) : isEmailValid === "success" ? (
                            <Icon
                              type="checkIcon"
                              variant={"inputIconRight"}
                              className="text-green-500"
                            />
                          ) : isEmailValid === "failed" ? (
                            <Icon
                              type="errorIcon"
                              className="text-red-500"
                              variant={"inputIconRight"}
                            />
                          ) : null
                        }
                        iconLeft={true}
                        iconSize={"lg"}
                        iconLeftType="mailIcon"
                        onChange={(e) => {
                          isValidEmail(e.target.value);
                        }}
                      />
                    </div>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>
            <div className="space-y-2">
              <Typography size={"sm"}>
                By continuing, I agree to the{" "}
                <Link
                  href={"/"}
                  className={typographyVariants({
                    variant: "primary",
                    size: "sm",
                  })}
                >
                  Terms of Use
                </Link>{" "}
                &{" "}
                <Link
                  href={"/"}
                  className={typographyVariants({
                    variant: "primary",
                    size: "sm",
                  })}
                >
                  Privacy Policy
                </Link>{" "}
              </Typography>

              <div className="flex space-x-2">
                {isFixedModal && pathname === "/checkout" ? (
                  <Link
                    href="/cart"
                    onClick={() => setSheetOpen(false)}
                    className={
                      "w-2/3 sm:1/3 sm:text-base text-sm " +
                      buttonVariants({ variant: "outline", size: "default" })
                    }
                  >
                    Back To Cart
                  </Link>
                ) : null}
                <Button
                  disableBtn={
                    isPhoneNumberValid === "success" ||
                    isEmailValid === "success"
                      ? false
                      : true
                  }
                  className="w-full"
                  onClick={() => {
                    isValidPhoneNoInput(true);
                  }}
                >
                  PROCEED
                </Button>
              </div>
            </div>
          </form>
        ) : null}
        {otpPageVisibility ? (
          <div className="py-2 space-y-1" id="otpPage">
            <Typography bold={"semibold"} variant={"primary"} size={"xl"}>
              OTP Code
            </Typography>
            {/* <label className="block mb-2 font-medium text-gray-900 sm:text-base text-xs">
              Please check your {signInUsing.type} and enter the OTP code{" "}
              <span className="text-red-500">*</span>
            </label> */}
            <Typography type="p" requiredField={true}>
              Please check your {signInUsing.type} and enter the OTP code{" "}
            </Typography>
            <form className="space-y-6" action="#">
              <OtpInput
                value={state}
                onChange={handleChange}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                numInputs={4}
                inputStyle={{
                  width: "100%",
                  fontSize: "1.5rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                }}
                renderSeparator={<span className="w-[7rem] "> </span>}
                renderInput={(props: any) => (
                  <Input {...props} className="h-14" />
                )}
              />
              <div>
                {countDownVisible ? (
                  <div className="flex justify-between" id="seconds-count">
                    <Typography size={"sm"}>Didn't Receive Code?</Typography>{" "}
                    <Typography size={"sm"}>
                      Request again in {time >= 0 ? time : stopTimer()} seconds
                    </Typography>{" "}
                  </div>
                ) : (
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      isValidPhoneNoInput(true);
                    }}
                    type="button"
                    size={"sm"}
                  >
                    RESEND OTP
                  </Button>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    isValidPhoneNoInput(false);
                  }}
                  variant={"outline"}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    otpIsValid(state);
                  }}
                  className="w-full"
                  disabled={state.length === 4 ? false : true}
                >
                  PROCEED
                </Button>
              </div>
            </form>
          </div>
        ) : null}
      </ModalContainer>

      <ModalContainer
        showModal={countriesDrawerState}
        setCloseModal={setCountriesDrawerState}
        size={"lg"}
      >
        <div className="pb-2">
          <Typography bold={"bold"} size={"xl"}>
            Select a Country
          </Typography>
        </div>
        <Command className="rounded-lg border shadow-md ">
          <CommandInput placeholder="Search for Countries..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {selectedCountryData ? (
                <CommandItem className="bg-green-100 items-center flex justify-between pr-5">
                  <div
                    className="flex space-x-3 items-center cursor-pointer"
                    onClick={() => {
                      setCountriesDrawerState(false);
                    }}
                  >
                    <Image
                      src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData[0].alpha2Code.toLowerCase()}.svg`}
                      width="50"
                      height="50"
                      className="w-8 h-8"
                      alt={selectedCountryData[0].name}
                    />
                    <Typography>{selectedCountryData[0].name}</Typography>
                    <Typography size={"sm"} bold={"semibold"}>
                      (+{selectedCountryData[0].callingCodes})
                    </Typography>
                  </div>
                  <Icon type="checkIcon" className="text-green-500" />
                </CommandItem>
              ) : null}
              {countriesData
                ? countriesData.map((countr: any) => (
                    <CommandItem
                      className={` ${
                        selectedCountryData &&
                        selectedCountryData[0].name === countr.name
                          ? "hidden"
                          : ""
                      } `}
                    >
                      <div
                        className="space-x-3 items-center flex pr-5 cursor-pointer"
                        onClick={() => {
                          setSelectedCountryData([countr]);
                          setCountriesDrawerState(false);
                        }}
                      >
                        <Image
                          src={`https://hatscripts.github.io/circle-flags/flags/${countr.alpha2Code.toLowerCase()}.svg`}
                          width="50"
                          height="50"
                          className="w-8 h-8"
                          alt={countr.name}
                        />

                        <Typography> {countr.name}</Typography>
                        <Typography size={"sm"} bold={"semibold"}>
                          (+{countr.callingCodes})
                        </Typography>
                      </div>
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </ModalContainer>
    </>
  );
};

export default AuthModal;
