import { Menu } from "@headlessui/react";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "./ui/input";
import { typographyVariants } from "./ui/typography";
import { LgSearchMenuTransition } from "./ui/transition";
import { cn } from "@/lib/utils";
import LgSearchSuggestions from "./lg-search-suggestions";
import { useModal } from "./ui/modalcontext";
import { Icon, iconVariants } from "./ui/icons";

export default function LgSearch({
  SearchLoadingState,
  searchSuggestions,
  searchButtonOnClick,
  searchData,
  queryData,
  isArabic,
  searchButtonOnMouseEnter,
}: {
  SearchLoadingState: any;
  queryData: any;
  searchSuggestions: any;
  searchData: any;
  isArabic: any;
  searchButtonOnMouseEnter: any;
  searchButtonOnClick: any;
}) {
  const { t } = useLanguage();

  const { searchBoxClear } = useModal();

  return (
    <Menu as="div" className="w-full relative">
      {({ open }) => (
        <>
          <Menu.Button className="w-full">
            <Input
              type="text"
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
                ) : open && (
                  <Icon
                    variant={"inputIconRight"}
                    onClick={() => searchBoxClear()}
                    type="crossIcon"
                  />
                )
              }
              onClick={() => searchButtonOnClick(true)}
              onChange={(e) => {
                searchButtonOnMouseEnter((e.target as HTMLInputElement).value);
              }}
              className={cn(
                typographyVariants({ size: "sm", bold: "light" }),
                `${open ? "rounded-2xl rounded-b-none" : "rounded-full"}`
              )}
              ref={(input) => input && input.focus()}
              onKeyDown={(e) =>
                e.key === "Enter"
                  ? searchSuggestions(
                      (e.target as HTMLInputElement).value,
                      false,
                      "search"
                    )
                  : null
              }
              defaultValue={queryData}
              id="lg-searchbox"
              placeholder={t.navbar.searchbox_text}
            />
          </Menu.Button>
          <LgSearchMenuTransition>
            <Menu.Items className="absolute right-0 z-30  left-0 bg-white rounded-lg rounded-t-none border-t w-full">
              <LgSearchSuggestions
                searchSuggestions={searchSuggestions}
                searchData={searchData}
              />
            </Menu.Items>
          </LgSearchMenuTransition>
        </>
      )}
    </Menu>
  );
}
