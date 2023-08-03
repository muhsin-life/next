import { SingleProductData } from "./single-product-data";
import React, { useState, useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./accordion-radix";
import { BrandsButton } from "./Button";

import { useRouter } from "next/router";
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import getCategoryData from "@/lib/getCategoryData";
import { useLanguage } from "@/hooks/useLanguage";
import { ProductsSkeleton } from "./productsSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import * as Slider from "@radix-ui/react-slider";
import getBrandProductData from "@/lib/getBrandProductData";
import Link from "next/link";
import { Button } from "./ui/button";
const ProductsPageData = ({
  filterPath,
  categoryData,
  brandsData,
  isSearchPage,
  selectedBrands,
  menuData,
  isBrandsPage,
}: {
  isSearchPage: boolean;
  selectedBrands: any;
  categoryData: any;
  brandsData: any;
  filterPath: any;
  menuData: any;
  isBrandsPage: boolean;
}) => {
  const { query } = useRouter();

  const [noOfProducts, setNoOfProducts] = useState(40);
  const [animateSpin, setAnimateSpin] = useState(false);
  const [showMoreProductsbtn, setShowMoreProductsbtn] = useState(true);
  const [preSelectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [catData, setCatData] = useState({
    data: [{}],
  });
  const [brandFiltersAppliedStatus, setBrandFiltersAppliedStatus] =
    useState(false);

  // const [activeElementIndx, setActiveElementIndx] = useState(query.singleCategory? null: 0)
  const [isRowView, setIsRowView] = useState(false);
  const [rangeSliderValue, setRangeSliderValue] = useState([50]);

  var brandsSelected: string[] = [];

  const [productFilterApplied, setProductsFilterApplied] = useState(false);

  const skeletonArray = Array(12).fill(<ProductsSkeleton />);

  const filters = [
    { name: "popularity", text: "Most Popular" },
    { name: "most-rated", text: "Most Rated" },
    { name: "price-asc", text: "Price: Low to High" },
    { name: "price-desc", text: "Price: High to Low" },
  ];

  const [selectedFilter, setFilter] = useState(filters[0]);
  const { locale } = useLanguage();

  const [data, setData] = useState<any>([]);

  function slugify(text: string) {
    return text.toLowerCase().replace(/[\/\s&]+/g, "-");
  }

  function generatePath(grand_p: string, parent: string, child: string) {
    return `/category/${slugify(grand_p)}/${parent}/${slugify(child)}`;
  }

  const addBrand = (value: string) => {
    brandsSelected = [...brandsSelected, ...preSelectedBrands];
    brandsSelected?.push(value);

    if (brandsSelected.length > 1) {
      // routerPathReplace(currentBrandsRoute, `&brands=${brandsSelected.toString()}`)
    } else {
      // router.push(router.asPath + `&brands=${brandsSelected}`)
    }
  };

  const removeBrand = (value: string) => {
    brandsSelected = [...brandsSelected, ...preSelectedBrands];
    brandsSelected = brandsSelected.filter((brand) => brand !== value);
    setSelectedBrands(brandsSelected);
  };

  function typeGenerate(type: string) {
    switch (type) {
      case "Category":
        return "categories";
      case "Collection":
        return "collections";
    }
    return "";
  }

  const rangeSliderValueChange = (newValue: number[]) => {
    setRangeSliderValue(newValue);
  };
  const filterSet = (
    indx: number,
    type: string,
    value: any,
    isRemoveele: boolean
  ) => {
    debugger;
    if (type === "brands") {
      if (isRemoveele) {
        removeBrand(value);
      } else {
        setSelectedBrands((brands) => [...brands, value]);
        addBrand(value);
      }
      value = brandsSelected.toString();
    } else {
      setFilter(filters[indx]);
    }

    setProductsFilterApplied(true);
    fetchData(
      typeGenerate(menuData[0]),
      0,
      false,
      (type === "order_by" ? `&${type}=${value}` : "") +
        (type === "brands" && brandsSelected.length > 0
          ? `&${type}=${value}`
          : "")
    );
  };

  function fetchData(
    queryData: any,
    noOfProducts: number,
    loadMoreData: boolean,
    filterPaths: string
  ) {
    debugger;
    if (!isBrandsPage) {
      getProductsDataByCat(
        filterPath + filterPaths,
        noOfProducts,
        queryData === null ? true : false,
        locale
      ).then((proData: any) => {
        debugger;
        if (loadMoreData) {
          setData((prevContent: any) => [
            ...prevContent,
            ...proData.data.products,
          ]);
          setAnimateSpin(false);
          if (proData.data.products.length != 40) {
            setShowMoreProductsbtn(false);
          }
        } else {
          setData(proData.data.products);
          setBrandFiltersAppliedStatus(true);

          setProductsFilterApplied(false);
        }
      });
    } else {
      getBrandProductData(
        query.brand,
        query.singleCategory ? query.singleCategory : "",
        filterPath,
        noOfProducts,
        locale
      ).then((brandsProductsData: any) => {
        if (loadMoreData) {
          setData((prevContent: any) => [
            ...prevContent,
            ...brandsProductsData.data.products,
          ]);
          setAnimateSpin(false);
          if (brandsProductsData.data.products != 40) {
            setShowMoreProductsbtn(false);
          }
        } else {
          setData(brandsProductsData.data.products);
          setProductsFilterApplied(false);
        }
      });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user-preference-view-type") === "row") {
      setIsRowView(true);
    }

    getCategoryData().then((cat_data) => {
      setCatData(cat_data);
    });
  }, []);

  function loadMoreProducts() {
    setAnimateSpin(true);
    fetchData(typeGenerate(menuData[0]), noOfProducts, true, "");
    setNoOfProducts((c) => c + 40);
  }
  const setUserPreference = (typeOfView: string) => {
    if (typeOfView === "row") {
      setIsRowView(true);
    } else {
      setIsRowView(false);
    }
    localStorage.setItem("user-preference-view-type", typeOfView);
  };
  return (
    <div className=" max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]">
      {!isSearchPage ? (
        <div className="flex justify-between py-3">
          <div className="h-fit my-auto">
            <p className="sm:text-sm text-xs">
              Showing{" "}
              <span className="text-black">{categoryData.products.length}</span>{" "}
              of{" "}
              <span className="text-black ">
                {data.length === 0
                  ? categoryData.products.total_count
                    ? categoryData.products.total_count
                    : noOfProducts
                  : data.length}
              </span>{" "}
              Products
            </p>
          </div>
          <div className=" items-center md:flex hidden">
            <div className="relative inline-block text-left group/sort-menu">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="categoryBtn"
                    size="sm"
                    className="h-fit  "
                  >
                    {selectedFilter.text}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" forceMount>
                  {filters.map((filter: any, indx: number) => (
                    <DropdownMenuItem
                      onClick={() =>
                        filterSet(indx, "order_by", filters[indx].name, false)
                      }
                    >
                      <span>{filter.text}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="ml-5">
              <input
                type="radio"
                checked={!isRowView}
                id="grid-view"
                name="col-type"
                className="hidden peer"
              />
              <label
                onClick={() => setUserPreference("col")}
                htmlFor="grid-view"
                className="cursor-pointer -m-2  p-2 mr-2 text-gray-400 hover:text-gray-500 sm:ml-7 peer-checked:text-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z" />
                </svg>
              </label>
            </div>

            <input
              type="radio"
              checked={isRowView}
              id="list-view"
              name="col-type"
              className="hidden peer"
            />
            <label
              onClick={() => setUserPreference("row")}
              htmlFor="list-view"
              className="-m-2 cursor-pointer p-2 text-gray-400 hover:text-gray-500 peer-checked:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
                />
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                <path
                  fill-rule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
                />
              </svg>
            </label>
          </div>
        </div>
      ) : null}

      <div aria-labelledby="products-heading" className="pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {!isSearchPage && !isBrandsPage ? (
            <form className="hidden lg:block divide-y top-40">
              {catData.data[1] ? (
                <>
                  <div></div>
                  <Accordion.Root
                    className=""
                    type="single"
                    defaultValue="item-1"
                    collapsible
                  >
                    <AccordionItem className="py-2" value="item-1">
                      <AccordionTrigger className="font-bold">
                        Category
                      </AccordionTrigger>
                      {catData.data.map((item: any) => (
                        <AccordionContent className="">
                          <Accordion.Root
                            className="ml-2"
                            type="single"
                            collapsible
                          >
                            <AccordionItem className="" value="item-1">
                              <AccordionTrigger className=" text-gray-600">
                                {item.name}
                              </AccordionTrigger>
                              {item.children.map((child: any) => (
                                <AccordionContent className="">
                                  <Accordion.Root
                                    className="ml-2"
                                    type="single"
                                    collapsible
                                  >
                                    <AccordionItem className="" value="item-1">
                                      <AccordionTrigger className="">
                                        {child.name}
                                      </AccordionTrigger>
                                      {child.sections.map((sec_data: any) => (
                                        <AccordionContent className="ml-2">
                                          <a
                                            className="text-blue-500 block my-1"
                                            href={generatePath(
                                              item.name,
                                              child.slug,
                                              sec_data.name
                                            )}
                                          >
                                            {sec_data.name}
                                          </a>
                                        </AccordionContent>
                                      ))}
                                    </AccordionItem>
                                  </Accordion.Root>
                                </AccordionContent>
                              ))}
                            </AccordionItem>
                          </Accordion.Root>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  </Accordion.Root>
                  {brandsData ? (
                    <Accordion.Root
                      className=""
                      type="single"
                      defaultValue="item-1"
                      collapsible
                    >
                      <AccordionItem className="py-2" value="item-1">
                        <AccordionTrigger className="font-bold">
                          Brands
                        </AccordionTrigger>
                        <AccordionContent className="">
                          {brandsData.map((brand: any) =>
                            brand.featured === true ? (
                              <BrandsButton
                                selectedBrands={selectedBrands}
                                brandName={brand.name}
                                filterSet={filterSet}
                              />
                            ) : null
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion.Root>
                  ) : null}
                </>
              ) : null}

              <Accordion.Root
                className=""
                type="single"
                defaultValue="item-1"
                collapsible
              >
                <AccordionItem className="py-2" value="item-1">
                  <AccordionTrigger className="font-bold">
                    Price
                  </AccordionTrigger>

                  <AccordionContent className="">
                    <div className="justify-between flex">
                      <div>Range: AED 0 — AED {rangeSliderValue}</div>
                      <button className=" bg-slate-200 hover:bg-slate-300 text-sm w-fit px-2 p-1 rounded-full">
                        Filter
                      </button>
                    </div>
                    <Slider.Root
                      className="relative flex items-center select-none touch-none w-full h-5 mt-5"
                      defaultValue={[0]}
                      onValueChange={rangeSliderValueChange}
                      value={rangeSliderValue}
                      max={10000}
                      step={100}
                    >
                      <Slider.Track className="bg-blackA10 relative grow rounded-full h-[3px]">
                        <Slider.Range className="absolute bg-gray-400 rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb
                        className="block w-5 h-5 bg-gray-700 rounded-[10px] focus:outline-none  "
                        aria-label="Volume"
                      />
                    </Slider.Root>
                  </AccordionContent>
                </AccordionItem>
              </Accordion.Root>
            </form>
          ) : !isSearchPage ? (
            <div className="hidden lg:block space-y-2">
              <h1 className="font-bold">Category</h1>
              {categoryData.categories.map((cat_data: any, indx: number) => (
                <div className="flex justify-between text-gray-800 text-sm">
                  <Link
                    href={`/brand/${query.brand}/${cat_data.slug}`}
                    className={`${
                      query.singleCategory
                        ? query.singleCategory === cat_data.slug
                          ? "text-blue-500"
                          : ""
                        : indx === 0
                        ? "text-blue-500"
                        : ""
                    } hover:text-blue-500`}
                  >
                    {cat_data.name}
                  </Link>
                  <div>{cat_data.count}</div>
                </div>
              ))}
            </div>
          ) : null}
          <div
            className={`${isSearchPage ? " col-span-full py-7" : "col-span-3"}`}
          >
            <div
              className={`grid ${isRowView ? "!grid-cols-1 !gap-0" : ""} ${
                isSearchPage
                  ? "xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 "
                  : "  md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1"
              }  xs:grid-cols-2 grid-cols-1 sm:gap-3 gap-1`}
            >
              {categoryData.products.length > 0 ? (
                categoryData.products.map((pro_data: any) =>
                  productFilterApplied
                    ? skeletonArray.map((sk) => sk)
                    : !brandFiltersAppliedStatus && (
                        <SingleProductData
                          pro_data={pro_data}
                          isRowView={isRowView}
                        />
                      )
                )
              ) : (
                <div className="w-full col-span-3">
                  <h1 className="text-blue-500 text-center py-2">
                    No Products Found
                  </h1>
                </div>
              )}
              {data.length > 0 ? (
                data.map((pro_data: any) =>
                  productFilterApplied ? (
                    skeletonArray.map((sk) => sk)
                  ) : (
                    <SingleProductData
                      pro_data={pro_data}
                      isRowView={isRowView}
                    />
                  )
                )
              ) : (
                <div className="w-full col-span-3">
                  <h1 className="text-blue-500 text-center py-2">
                    No Products Found
                  </h1>
                </div>
              )}
            </div>
            {categoryData.products.length === 40 && showMoreProductsbtn ? (
              <div className="w-full flex justify-center mt-10">
                <button
                  onClick={() => {
                    loadMoreProducts();
                  }}
                  className="border-slate-300 flex items-center border  px-3 py-2  rounded-full hover:bg-[#39f] hover:text-white transition-all duration-300"
                >
                  <div className="mx-3 text-sm  items-center">
                    More Products
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={`w-4 h-4 ${animateSpin ? "animate-spin" : ""}`}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageData;
