import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography, typographyVariants } from "./ui/typography";
import { Icon } from "./ui/icons";

const SmMenu = ({
  setSmScreenSearchBox,
  searchButtonOnClick,
  setSheetOpen,
  isSheetOpen,
}: {
  setSheetOpen: any;
  isSheetOpen: any;
  setSmScreenSearchBox: any;
  searchButtonOnClick: any;
}) => {
  const router = useRouter();
  const { pathname } = router;
  const redirect = (url: string) => {
    router.push(url);
  };
  const { data: session } = useSession();

  return (
    <div className="fixed bottom-1 left-2 right-2 md:hidden    backdrop-blur-sm bg-opacity-95 bg-slate-100 dark:bg-slate-700/70  py-4 items-center z-30 rounded-3xl">
      <div className="flex justify-between sm:px-6 px-5">
        <div>
          <button
            onClick={() => redirect("/")}
            className={` ${
              pathname === "/"
                ? "text-blue-500 "
                : typographyVariants({ variant: "paragraph", size: "xs" })
            }`}
          >
            <Icon type={"homeIconMenu"} size={"lg"} className="mx-auto" />

            <Typography size={"xs"}>Home</Typography>
          </button>
        </div>
        <div>
          <button
            onClick={() => redirect("/category-menu/beauty-care")}
            className={` ${
              pathname.includes("category-menu")
                ? "text-blue-500 "
                : typographyVariants({ variant: "paragraph", size: "xs" })
            }`}
          >
            <Icon type={"categoryMenuIcon"} size={"lg"} className="mx-auto" />

            <Typography size={"xs"}>Category</Typography>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setSmScreenSearchBox(true);
              searchButtonOnClick(false);
            }}
            className="active:text-blue-500 text-white bg-primary p-2 rounded-full"
          >
            <Icon type={"searchIcon"} size={"lg"} className="mx-auto" />
          </button>
        </div>
        <div>
          <button
            className={` ${
              pathname.includes("dashboard")
                ? "text-blue-500 "
                : typographyVariants({ variant: "paragraph", size: "xs" })
            }`}
            onClick={() => {
              session ? redirect("/dashboard") : setSheetOpen(true);
            }}
          >
            <Icon type={"accountIcon"} size={"lg"} className="mx-auto" />

            <Typography size={"xs"}>Account</Typography>
          </button>
        </div>
        <div>
          <button
            className={` ${
              pathname.includes("cart")
                ? "text-blue-500 "
                : typographyVariants({ variant: "paragraph", size: "xs" })
            }`}
            onClick={() => redirect("/cart")}
          >
            <Icon type={"cartIconMenu"} size={"lg"} className="mx-auto" />

            <Typography size={"xs"}>Cart</Typography>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmMenu;
