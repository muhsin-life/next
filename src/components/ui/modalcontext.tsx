import { useSession } from "next-auth/react";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import getSearchDataSuggsetions from "@/lib/getSearchData";
type ModalContextState = {
  locationModalState: boolean;
  setLocationModalState: Dispatch<SetStateAction<boolean>>;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  setaddNewAddress: Dispatch<SetStateAction<boolean>>;
  setaddnewAddressFormVisibility: Dispatch<SetStateAction<boolean>>;
  setnotValidOTPPageVisib: Dispatch<SetStateAction<boolean>>;
  isSheetOpen: boolean;
  locationModal: boolean;
  setLocationModal: Dispatch<SetStateAction<boolean>>;
  notValidOTPPageVisib: boolean;
  addNewAddress: boolean;
  setAddressDataIndex: Dispatch<SetStateAction<number>>;
  AddressDataIndex: any;
  availableAddresses: boolean;
  setavailableAddresses: Dispatch<SetStateAction<boolean>>;
  isPhoneNumberValid: boolean;
  setPhoneNumberValidState: Dispatch<SetStateAction<boolean>>;
  signInSet: Dispatch<SetStateAction<string>>;
  isValidCredentials: (value: string) => void;
  setFormData: any;
  formData: any;
  formDatahandleChange: any;
  isFixedModal: boolean;
  searchButtonOnClick: (isOpen: boolean) => void;
  searchData: any;
  setModalFixedState: Dispatch<SetStateAction<boolean>>;
  SearchLoadingState: boolean;
  queryData: string;
  searchButtonOnMouseEnter: any;
  smScreenSearchBox: any;
  setSmScreenSearchBox: Dispatch<SetStateAction<boolean>>;
  setQueryData: Dispatch<SetStateAction<string>>;
  searchBoxClear: any;
  searchClosebtn: boolean;
};

const ModalContext = createContext<ModalContextState | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: any }) => {
  const { data: session } = useSession();

  const [locationModalState, setLocationModalState] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [addNewAddress, setaddNewAddress] = useState(false);
  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] =
    useState(false);
  const [notValidOTPPageVisib, setnotValidOTPPageVisib] = useState(false);
  const [availableAddresses, setavailableAddresses] = useState(true);
  const [isPhoneNumberValid, setPhoneNumberValidState] = useState(false);
  const [AddressDataIndex, setAddressDataIndex] = useState<any>(null);
  const [signInUsing, signInSet] = useState("");
  const [isFixedModal, setModalFixedState] = useState(false);
  const [queryData, setQueryData] = useState("");
  const [searchClosebtn, setVisibility] = useState(false);
  const [searchTimer, setSearchTimer] = useState<any>(null);
  const [SearchLoadingState, setSearchLoadingState] = useState(false);
  const [smScreenSearchBox, setSmScreenSearchBox] = useState(false);

  const [searchData, setData] = useState({
    results: [
      {
        hits: [
          {
            title: "",
            images: {
              featured_image:
                "https://www.life-me.com/wp-content/themes/LifePharmacy/assets/images/life-pharmacy-logo-white.png",
            },
            query: "",
            slug: "",
          },
        ],
      },
    ],
  });

  const searchButtonOnClick = (isOpen: boolean) => {
    if (window.innerWidth > 767) {
      // const lgScreenSearchBox = document.getElementById("lg-screen-search") as HTMLInputElement
      // if (isOpen) {
      //   // document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.remove("hidden");
      //   lgScreenSearchBox.classList.remove("rounded-full");
      //   lgScreenSearchBox.classList.add("rounded-b-none", "rounded-3xl");
      // }
    } else {
      setSmScreenSearchBox(true);
    }
    searchButtonOnMouseEnter(queryData);
  };
  var addressId = session
    ? session.token.addresses.length != 0
      ? session.token.addresses[session.token.addresses.length - 1]?.id + 1
      : 12345 + 1
    : "";

  const searchBoxClear = () => {
    (document.getElementById("sm-searchbox") as HTMLInputElement).value = "";
    setQueryData("");
    searchButtonOnMouseEnter("");
    setVisibility(false);
  };

  const getSearchData = (query: string) => {
    setSearchLoadingState(true);
    getSearchDataSuggsetions(query).then((res) => {
      setData(res);
      setSearchLoadingState(false);
    });
  };

  function searchButtonOnMouseEnter(query: string) {
    setQueryData(query);

    clearTimeout(searchTimer);

    const newTimer = setTimeout(() => {
      getSearchData(query);
    }, 600);

    setSearchTimer(newTimer);

    if (query != "") {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }

  const [formData, setFormData] = useState({
    id: addressId,
    entity_id: 1462724,
    name: "",
    phone: "",
    longitude: "55.272887000000000",
    latitude: "25.219370000000000",
    type: "Home",
    country: "United Arab Emirates",
    state: "",
    city: "",
    area: "Satwa",
    street_address: "",
    building: "",
    flat_number: "",
    suitable_timing: "0",
    created_at: "2023-03-16T08:09:22.000000Z",
    updated_at: "2023-03-16T08:09:22.000000Z",
    google_address: "Al Satwa - Dubai - United Arab Emirates",
    additional_info: "",
    belongs_to: "user",
    deleted_at: null,
    is_validated: 1,
  });

  useEffect(() => {
    setAddressDataIndex(session?.token.addresses[0]);
  }, [session]);

  const formDatahandleChange = (e: any): void => {
    const { name, value } = e.target;

    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValidCredentials = (value: string) => {
    if (value != null) {
      if (isValidPhoneNumber(value)) {
        setPhoneNumberValidState(true);
        setFormData({ ...formData, phone: value });
        signInSet("Phone");
      } else {
        setPhoneNumberValidState(false);
      }
    }
  };

  const contextValue: ModalContextState = {
    locationModalState,
    setLocationModalState,
    setSheetOpen,
    setaddNewAddress,
    setaddnewAddressFormVisibility,
    setnotValidOTPPageVisib,
    isSheetOpen,
    locationModal,
    setLocationModal,
    notValidOTPPageVisib,
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses,
    isPhoneNumberValid,
    setPhoneNumberValidState,
    signInSet,
    isValidCredentials,
    setFormData,
    formData,
    formDatahandleChange,
    isFixedModal,
    setModalFixedState,
    searchButtonOnClick,
    searchData,
    SearchLoadingState,
    queryData,
    searchButtonOnMouseEnter,
    smScreenSearchBox,
    setSmScreenSearchBox,
    setQueryData,
    searchBoxClear,
    searchClosebtn,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
