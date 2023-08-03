import Link from "next/link";
import { Icon, IconProps } from "./ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface featuresSectiondataProps {
  title: string;
  para: string;
  IconType: IconProps["type"];
}

const featuresSectiondata: featuresSectiondataProps[] = [
  {
    title: "Free Delivery",
    para: " For all orders over AED 29",
    IconType: "giftsIcon",
  },
  {
    title: "Easy Returns",
    para: "For all orders over AED 29",
    IconType: "returnsIcon",
  },
  {
    title: "Secure payments",
    para: "For all orders over AED 29",
    IconType: "secureIcon",
  },
  { title: "24/7 Support", para: "Dedicated Support", IconType: "callIcon" },
];

const FeatureSection = () => {
  return (
    <ul className="md:flex hidden col-span-3  flex-col ml-auto  rounded-lg h-full w-full space-y-2">
      {featuresSectiondata.map((item) => (
        <div className="border border-slate-200 flex items-center space-x-4 py-2 px-3 bg-slate-100 h-full max-h-20">
          <div className="rounded-full bg-blue-700 text-white p-2">
            <Icon type={item.IconType} size={"lg"} />
          </div>
          <div>
            <h5 className="text-life lg:text-sm  whitespace-nowrap">
              {item.title}
            </h5>
            <div className="text-[10px] whitespace-nowrap text-gray-400 lg:text-xs my-1">
              {item.para}
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
};

const IconWrapper = ({ children }: { children: any }) => {
  return <div className="rounded-full bg-blue-700 text-white">{children}</div>;
};

const CategoriesSection = ({categoriesData}:{categoriesData:any}) =>{
    return (
        <div className=" overflow-hidden no-scrollbar whitespace-nowrap text-ellipsis pt-3">
        {categoriesData
          ? categoriesData.map((cat: any) => (
              <Link
                href={`/products?categories=${cat.slug}`}
                className={cn(
                  buttonVariants({
                    variant: "categoryBtn",
                    size: "xs",
                  }),
                  "mr-2"
                )}
              >
                {cat.name}
              </Link>
            ))
          : null}
      </div>
    )
}

export { FeatureSection, IconWrapper, CategoriesSection };
