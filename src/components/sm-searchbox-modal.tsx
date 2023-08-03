import ModalContainer from "./ui/modal-container";
import { Dialog } from "@headlessui/react";
import { FC } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { ProductsSkeleton, SugesstionsSkeleton } from "./skeletons";
import { Icon, iconVariants } from "./ui/icons";
import { Input } from "./ui/input";

interface SmSearchBoxModalProps {
  showModal: any;
  setCloseModal: any;
  isArabic: boolean;
  queryData: string;
  setQueryData: any;
  searchButtonOnMouseEnter: any;
  SearchLoadingState: boolean;
  searchClosebtn: boolean;
  searchData: any;
  searchBoxClear: any;
  searchSuggestions: any;
}

export const SmSearchBoxModal: FC<SmSearchBoxModalProps> = ({
  searchClosebtn,
  showModal,
  setCloseModal,
  isArabic,
  queryData,
  setQueryData,
  searchButtonOnMouseEnter,
  SearchLoadingState,
  searchData,
  searchBoxClear,
  searchSuggestions,
}) => {
  const { t } = useLanguage();

  return (
    <ModalContainer
      showModal={showModal}
      setCloseModal={setCloseModal}
      size={"full"}
      fullModal={true}
      className="!rounded-none"
    >
      <div className="relative  w-full scale-100 transform opacity-100 transition-all ">
        <div className="relative bg-white w-full  p-2 px-3">
          <div className="flex w-full py-2 items-center space-x-4">
            <Icon
              type="chevronLeftIcon"
              className="text-black"
              onClick={() => {
                setCloseModal(false);
              }}
            />

            {/* <div className="flex-1 overflow-hidden rounded-sm  px-1">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={` fill-slate-400 pointer-events-none absolute ${isArabic ? 'right-4 ' : 'left-4'} top-1 w-4 h-6`}>
                                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                                </svg>
                                <input type="text" id="sm-searchbox" defaultValue={queryData} ref={input => input && input.focus()}
                                    className={`placeholder:text-sm border-none bg-gray-100 rounded-full  block w-full  focus:ring-0  py-[5px]    text-slate-900 placeholder:text-slate-500 sm:text-sm sm:leading-6   ${isArabic ? 'pr-12 text-right pl-16' : 'pl-10 text-left pr-16'}`}
                                    placeholder={t.navbar.searchbox_text} onChange={(e) => { searchButtonOnMouseEnter(e.target.value, "", true) }} />

                                {SearchLoadingState ?
                                    <svg fill="none" className={`animate-spin absolute inline ${isArabic ? "left-8" : "right-8"}  inset-y-0 m-auto w-4 h-4 mx-2`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" ><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> : ""}

                                {searchClosebtn ? <button onClick={() => { searchBoxClear() }} type="button"
                                    className={`text-gray-800    text-center   rounded-lg text-sm   absolute top-[5px] ${isArabic ? 'left-2' : "right-2"} `}
                                >

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button> : ""}
                            </div>
                        </div> */}

            <Input
              id="sm-searchbox"
              defaultValue={queryData}
              ref={(input) => input && input.focus()}
              onChange={(e) => {
                searchButtonOnMouseEnter(e.target.value, "", true);
              }}
              placeholder="Search for products..."
              variant={"smallSearch"}
              sizes={"xs"}
              iconLeftType="searchIcon"
              inputLoadingState={SearchLoadingState}
              iconLeft={true}
              iconRight={
                SearchLoadingState ? (
                  <Icon
                    type="loadingIcon"
                    size={"sm"}
                    variant={"inputLoadingIcon"}
                  />
                ) : (
                  <Icon variant={"inputIconRight"} type="crossIcon" onClick={() => searchBoxClear()} />
                )
              }
              rounded={"full"}
              className="border-none"
            />
          </div>

          <div className=" px-3 scale-100 absolute top-15 right-0 left-0 bg-white rounded-t-0 rounded-b-md">
            {searchData.results[1] ? (
              <>
                <div className="mb-2 group-search sticky top-0 bg-white">
                  {searchData?.results[1]?.hits[0] ? (
                    <>
                      <Typography size={"sm"} variant={"primary"}>
                        SUGGESTIONS
                      </Typography>
                      <div className="flex my-2 flex-wrap  group-search">
                        {searchData.results[1].hits
                          .slice(0, 10)
                          .map((sug_data: any) => (
                            <Button
                              size={"xs"}
                              rounded={"full"}
                              onClick={() => {
                                searchSuggestions(
                                  sug_data.query,
                                  false,
                                  "search"
                                );
                              }}
                              variant={"normal"}
                              className="mr-2 mb-2"
                            >
                              {sug_data.query}
                            </Button>
                          ))}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-gray-600 group-search overflow-y-auto search-suggestion-height">
                  <Typography size={"sm"} variant={"primary"}>
                    PRODUCTS
                  </Typography>

                  {searchData.results[0].hits[0] ? (
                    searchData.results[0].hits.map((pro_data: any) => (
                      <>
                          <Button variant={"productsListBtn"}
                          onClick={() => {
                            searchSuggestions(pro_data.slug, false, "products");
                          }}
                          className="p-2 rounded-lg flex  group-search hover:bg-gray-100 w-full h-fit cursor-pointer space-x-3 items-center"
                        >
                          <Image
                            src={
                              pro_data.images
                                ? pro_data.images.featured_image
                                : "/images/default-product-image.png"
                            }
                            height={40}
                            width={40}
                            alt={pro_data.title}
                            className="border-2 rounded border-muted"
                          ></Image>
                          <Typography size={"xs"} variant={"lifeText"}>
                            {pro_data.title}{" "}
                          </Typography>
                        </Button>
                        <hr className=" h-[1px] w-10/12 ml-auto" />
                      </>
                    ))
                  ) : (
                    <div className="mx-auto w-fit p-2 flex flex-col space-y-3">
                      <Image
                        src="/images/no-products-found.png"
                        alt="no-search-results"
                        width={150}
                        height={150}
                      />
                      <Typography size={"sm"} variant={"ghost"}>
                        Oops! Products Not Found
                      </Typography>
                      <Button size={"sm"} iconLeft={true} iconType="chatIcon">
                        {" "}
                        Chat With Us
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div role="status" className="max-w-full animate-pulse">
                <div className="group-search mb-5 pt-4 space-y-2">
                  <Typography size={"sm"} variant={"primary"}>
                    SUGGESTIONS
                  </Typography>
                  <div className="flex  flex-wrap">
                    <SugesstionsSkeleton noOfSuggestions={5} />
                  </div>
                  <div className="group-search text-xs text-gray-600 space-y-3">
                    <Typography size={"sm"} variant={"primary"}>
                      PRODUCTS
                    </Typography>
                    <ProductsSkeleton noOfSuggestions={10} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
