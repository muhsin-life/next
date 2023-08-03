import ModalContainer from "./ui/modal-container";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";

const AddressModal = () => {
  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] =
    useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(true);
  const { data: session } = useSession();

  const {
    setaddNewAddress,
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses,
    isPhoneNumberValid,
    formData,
    formDatahandleChange,
    isValidCredentials,
  } = useModal();

  const addressFormOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    saveAddresstoDb();
  };

  function saveAddresstoDb() {
    debugger;
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(
      "https://prodapp.lifepharmacy.com/api/user/save-address",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          setAddressDataIndex(0);
          setaddNewAddress(false);
          setaddnewAddressFormVisibility(false);
        } else {
          throw new Error("Request failed");
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error while fetching search data", error));
  }

  function setCloseModal() {
    setaddNewAddress(false);
    setaddnewAddressFormVisibility(false);
  }

  return (
    <ModalContainer
      size={"lg"}
      showModal={session && addNewAddress ? true : false}
      setCloseModal={setCloseModal}
    >
      {addNewAddressClick && session?.token.addresses.length === 0 ? (
        <div className=" bg-white rounded-lg shadow  overflow-y-auto no-scrollbar min-h-fit  max-h-[calc(80vh-1rem)] ">
          <div className="px-6 py-3 space-y-6">
            <img
              src="https://www.lifepharmacy.com/images/map.svg"
              alt=""
              className="w-36"
            />

            <div className="py-5">
              <h5 className="text-indigo-800 font-bold pb-1">
                You have no saved Addresses
              </h5>
              <p className="text-gray-400 text-sm py-1">
                Start by adding a new address
              </p>
            </div>
          </div>
          <div className="flex items-center px-5 pb-2 space-x-2 border-t border-gray-200 rounded-b  sticky bottom-0">
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full px-5 py-2.5 text-center text-xs"
              onClick={() => {
                setAddNewAddressClick(false);
                setaddnewAddressFormVisibility(true);
              }}
            >
              ADD NEW ADDRESS
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {addnewAddressFormVisibility ? (
        <div className="relative   rounded-lg  overflow-y-auto no-scrollbar bg-white">
          <div className=" flex ">
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-white bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  "
              onClick={() => {
                // setaddNewAddress(false)
                setaddnewAddressFormVisibility(false);
                setAddNewAddressClick(true);
                setavailableAddresses(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <h3 className="ml-3 text-sm font-bold text-indigo-800  p-1.5">
              Your Address
            </h3>
          </div>

          <div className=" pt-3 pb-4 bg-white">
            <form className="space-y-3 " onSubmit={addressFormOnSubmit}>
              <div>
                <label className="mb-3 block w-fit rounded-full bg-indigo-800 px-3 py-1 text-[10px] font-semibold text-white ">
                  PERSONAL DETAILS
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={formDatahandleChange}
                  onBlur={(e) => {
                    e.target.value === ""
                      ? e.target.classList.add("border-red-500")
                      : e.target.classList.remove("border-red-500");
                  }}
                  className={
                    "focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500      addressFormInputEle"
                  }
                  placeholder="Full Name *"
                  required
                />
              </div>
              <div>
                <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">
                  Enter your mobile number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative border border-gray-300 pl-3 rounded-lg">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={isValidCredentials}
                    international
                    defaultCountry="AE"
                    id="phoneInputOTPAddress"
                    name="phone"
                    required
                  />
                  {isPhoneNumberValid ? (
                    <div className="absolute top-[16px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                      <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                      >
                        {" "}
                        <circle
                          className="checkmark__circle"
                          cx="26"
                          cy="26"
                          r="25"
                          fill="none"
                        />{" "}
                        <path
                          className="checkmark__check"
                          fill="none"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <label className="mb-3 block w-fit rounded-full bg-indigo-800 px-3 py-1 text-[10px] font-semibold text-white">
                  ADDRESS DETAILS
                </label>

                <div className="flex w-1/2">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900    ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </span>

                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={formDatahandleChange}
                    className="focus:outline-none block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  >
                    <option selected value="Home">
                      Home
                    </option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-6 ">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={formDatahandleChange}
                  onBlur={(e) => {
                    e.target.value === ""
                      ? e.target.classList.add("border-red-500")
                      : e.target.classList.remove("border-red-500");
                  }}
                  className={
                    " addressFormInputEle focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"
                  }
                  placeholder="Emirates *"
                  required
                />

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={formDatahandleChange}
                  onBlur={(e) => {
                    e.target.value === ""
                      ? e.target.classList.add("border-red-500")
                      : e.target.classList.remove("border-red-500");
                  }}
                  className={
                    "focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"
                  }
                  placeholder="City *"
                  required
                />
              </div>

              <input
                type="text"
                name="street_address"
                value={formData.street_address}
                onChange={formDatahandleChange}
                onBlur={(e) => {
                  e.target.value === ""
                    ? e.target.classList.add("border-red-500")
                    : e.target.classList.remove("border-red-500");
                }}
                placeholder="Street Address *"
                className={
                  "focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                }
                required
              />

              <div className="flex space-x-6">
                <input
                  name="flat_number"
                  value={formData.flat_number}
                  onChange={formDatahandleChange}
                  type="text"
                  onBlur={(e) => {
                    e.target.value === ""
                      ? e.target.classList.add("border-red-500")
                      : e.target.classList.remove("border-red-500");
                  }}
                  className={
                    "focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  placeholder="Flat / Villa *"
                  required
                />
                <input
                  name="building"
                  value={formData.building}
                  onChange={formDatahandleChange}
                  type="text"
                  onBlur={(e) => {
                    e.target.value === ""
                      ? e.target.classList.add("border-red-500")
                      : e.target.classList.remove("border-red-500");
                  }}
                  className={
                    "focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  placeholder="Building *"
                  required
                />
              </div>

              <div className="flex ">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900    ">
                  Country
                </span>

                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={formDatahandleChange}
                  className="focus:outline-none block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                >
                  <option selected value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>
              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={formDatahandleChange}
                className="w-full border-gray-300 rounded-lg border p-2.5 focus:outline-none text-sm"
                rows={1}
                placeholder="Additional information (eg. Area, Landmark)"
              ></textarea>

              <div className="sticky bottom-2 border-0 rounded-lg">
                <button
                  type="submit"
                  className=" w-full rounded-full bg-blue-500  py-1.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                >
                  SAVE ADDRESS
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {session?.token?.addresses.length > 0 && availableAddresses ? (
        <div className=" overflow-y-auto overflow-x-hidden  no-scrollbar  min-h-fit  max-h-[calc(80vh-1rem)]">
          <div className="w-full flex justify-between pb-2 items-center">
            <Typography size={"lg"} bold={"semibold"} variant={"lifeText"}>
              Address
            </Typography>
            <Button
              size={"sm"}
              onClick={() => {
                setavailableAddresses(false);
                setaddnewAddressFormVisibility(true);
              }}
            >
              Add New Address
            </Button>
          </div>
          <RadioGroup value={AddressDataIndex} onChange={setAddressDataIndex}>
            <div className="space-y-2">
              {session?.token.addresses.map((addr: any, indx: number) => (
                <RadioGroup.Option
                  key={addr.id}
                  value={addr}
                  className={({ active, checked }) =>
                    `border-2 border-slate-200 ${active ? "" : ""}
                  ${checked ? "bg-blue-100 bg-opacity-75 " : "bg-slate-100"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm flex space-x-7">
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? "" : ""}`}
                            >
                              <table className="table-auto">
                                <tbody>
                                  <tr>
                                    <td className="table-data ">
                                      <Typography size={"sm"}>NAME</Typography>
                                    </td>
                                    <td className="table-data">
                                      <Typography size={"sm"} bold={"semibold"}>
                                        {" "}
                                        {addr.name}
                                      </Typography>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-data">
                                      <Typography size={"sm"}>
                                        ADDRESS
                                      </Typography>
                                    </td>
                                    <td className="table-data">
                                      <Typography size={"sm"} bold={"semibold"}>
                                        {" "}
                                        {addr.google_address}
                                      </Typography>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-data">
                                      <Typography size={"sm"}>PHONE</Typography>
                                    </td>
                                    <td className="table-data">
                                      <Typography size={"sm"} bold={"semibold"}>
                                        {" "}
                                        {addr.phone}
                                      </Typography>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              {/* <div className="flex-col flex">
                                <h5 className="  ">ADDRESS:</h5>
                                <h5 className="">PHONE:</h5>
                              </div>
                              <div className="sm:text-sm text-[10px]">
                                <h5 className="font-medium">
                                  {addr.google_address}
                                </h5>
                                <h5 className="font-medium">{addr.phone}</h5>
                              </div> */}
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 t text-green-500 ">
                            <Icon type="checkIcon" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <div className="w-full bg-white pt-5 sticky bottom-0">
            <Button
              className="w-full"
              onClick={() => {
                setaddNewAddress(false);
                setaddnewAddressFormVisibility(false);
              }}
            >
              CONFIRM ADDRESS
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </ModalContainer>
  );
};

export default AddressModal;
