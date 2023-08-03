import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { TransitionComp } from "./ui/transition";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ModalContainer from "./ui/modal-container";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import { SelectLangBadge } from "./ui/badge";

interface compProps {
  setModalState: any;
  modalState: boolean;
  currentLanguage: any;
  currentCountry: any;
  countries: any;
  languages: any;
  lang: any;
}

const LanguageChangeModal: FC<compProps> = ({
  setModalState,
  modalState,
  currentLanguage,
  currentCountry,
  countries,
  languages,
  lang,
}) => {
  const router = useRouter();
  const [IsLanguageChangeClicked, languageChangeClicked] = useState(false);
  const [IsCountryChangeClicked, CountryChangeClicked] = useState(true);
  const [selected, setSelected] = useState("");
  const [selectedCountryPath, setSelectedCountryPath] = useState("");

  function closeModal() {
    setModalState(false);
  }

  function languageOnClicked(path: any) {
    closeModal();
    router.push("", router.asPath, {
      locale: `${selectedCountryPath}-${path}`,
    });
    toast.info("Language & Country changed successfully");
  }

  const countryProps = (
    <div className="space-y-2">
      {countries.map((contr: any) => (
        <Button
          variant={"productsListBtn"}
          onClick={() => {
            countryClicked(contr.path);
          }}
          iconRight={<Icon type="chevronRightIcon" className="ml-auto " />}
        >
          <div className="flex items-center justify-start space-x-4 ">
            <div className="md:h-10 md:w-10 w-7 h-7 rounded-full my-auto">
              <Image
                src={contr.flag}
                height="20"
                width="20"
                className="h-full w-full"
                alt=""
              />
            </div>
            <Typography bold={"bold"} size={"lg"} lineClamp={"one"}>
              {" "}
              {contr.country}
            </Typography>
            {contr.path === currentCountry.path ? (
              <SelectLangBadge selectLang={currentLanguage.name} />
            ) : null}
          </div>
        </Button>
      ))}
    </div>
  );

  const languageProps = (
    <RadioGroup value={selected} onChange={setSelected}>
      <div className="space-y-2">
        {languages.map((plan: any) => (
          <RadioGroup.Option
            onClick={() => {
              languageOnClicked(plan.path);
            }}
            key={plan.name}
            value={plan.name}
            className={({ active, checked }) =>
              `
${checked ? "bg-emerald-200 bg-opacity-75 " : "bg-white"}
relative flex cursor-pointer rounded-lg px-5 md:py-4 py-2 border-2 focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className=" md:text-sm text-[10px]">
                    <RadioGroup.Label
                      as="p"
                      className={`font-medium  ${
                        checked ? "" : "text-gray-900"
                      }`}
                    >
                      {plan.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={`inline ${
                        checked ? "text-sky-100" : "text-gray-500"
                      }`}
                    ></RadioGroup.Description>
                  </div>
                </div>
                {checked && (
                  <span className=" text-emerald-500">
                    <Icon type="checkIcon" />
                  </span>
                )}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );

  function languageBackClicked() {
    CountryChangeClicked(true);
    languageChangeClicked(false);
  }
  function countryClicked(path: string) {
    if (path === lang[0]) {
      setSelected(currentLanguage.name);
    } else {
      setSelected("");
    }
    CountryChangeClicked(false);
    languageChangeClicked(true);
    setSelectedCountryPath(path);
  }
  return (
    <>
      <ModalContainer showModal={modalState} setCloseModal={closeModal}>
        <div className="flex justify-between  my-auto items-center pb-4 w-full">
          {!IsCountryChangeClicked ? (
            <Button
              variant={"closeBtn"}
              className="mr-auto ml-0"
              onClick={() => {
                languageBackClicked();
              }}
            >
       
              <Icon type="chevronLeftIcon" />
            </Button>
          ) : null}

          <Typography bold={"bold"} size={"lg"}>
            {" "}
            Select Your Preference
          </Typography>
          <Button
            variant={"closeBtn"}
            onClick={() => {
              closeModal();
            }}
          >
            <Icon type="crossIcon" />
          </Button>
        </div>

        {IsCountryChangeClicked ? (
          <TransitionComp setTransition={IsCountryChangeClicked}>
            {countryProps}
          </TransitionComp>
        ) : null}

        {IsLanguageChangeClicked ? (
          <TransitionComp setTransition={IsLanguageChangeClicked}>
            {languageProps}
          </TransitionComp>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default LanguageChangeModal;
