import Link from "next/link"
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
const AddtoCartMobileview = ({ salePrice, filterPrice, proQty, setProQty, addedToCart }: { addedToCart: any, salePrice: any, filterPrice: any, proQty: any, setProQty: any }) => {

    return (
        <div className="fixed sm:bottom-[5.4rem] rounded-2xl  mx-auto  bottom-[6rem] px-5 left-2 right-2 md:hidden backdrop-blur-sm bg-opacity-95 bg-slate-100  h-16 py-1 items-center z-30">
            <div className="flex justify-start overflow-x-auto no-scrollbar translate-y-1/4">
                {/* <div className="mt-auto">
                    <div className="text-red-500 mr-3 leading-none flex justify-between items-center">
                        <span className="text-[10px] mr-1">AED </span>
                        <span className="font-semibold">{salePrice}</span>
                    </div>
                    <div className="text-life text-xs my-auto ">
                        <span >
                            <del>  <span className="text-[10px] mr-1 sm:inline-block hidden">AED</span></del>
                            <del> <span>{parseFloat(filterPrice).toFixed(2)}</span></del>
                        </span>
                    </div>
                </div> */}
                <div className="flex h-8 mt-auto max-[300px]:hidden w-1/2">
                    <Button variant={"ghost"} className="!px-1 h-[28px] w-[28px] rounded-none" onClick={() => proQty !== 1 ? setProQty((preQty: number) => preQty - 1) : null}>
                        <Icon type="plusIcon" size={"xs"}/>
                    </Button>
                    <input type="text" value={proQty} min="1" max="20" className=" rounded rounded-r-none bg-slate-100 w-6 border-none text-center text-sm text-gray-500 " />
                    <Button size={"lg"} className="!px-1 h-[28px] w-[28px] rounded-none" onClick={() => proQty >= 1 ? setProQty((preQty: number) => preQty + 1) : null}>
                    <Icon type="minusIcon" size={"xs"}/>

                    </Button>
                </div>

                <Button size={"sm"} className="w-full" onClick={() => addedToCart()} iconLeft={
                    <svg className="inline-block  w-5 h-5 my-auto fill-white" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 4 7 C 3.449219 7 3 7.449219 3 8 C 3 8.550781 3.449219 9 4 9 L 6.21875 9 L 8.84375 19.5 C 9.066406 20.390625 9.863281 21 10.78125 21 L 23.25 21 C 24.152344 21 24.917969 20.402344 25.15625 19.53125 L 27.75 10 L 25.65625 10 L 23.25 19 L 10.78125 19 L 8.15625 8.5 C 7.933594 7.609375 7.136719 7 6.21875 7 Z M 22 21 C 20.355469 21 19 22.355469 19 24 C 19 25.644531 20.355469 27 22 27 C 23.644531 27 25 25.644531 25 24 C 25 22.355469 23.644531 21 22 21 Z M 13 21 C 11.355469 21 10 22.355469 10 24 C 10 25.644531 11.355469 27 13 27 C 14.644531 27 16 25.644531 16 24 C 16 22.355469 14.644531 21 13 21 Z M 16 7 L 16 10 L 13 10 L 13 12 L 16 12 L 16 15 L 18 15 L 18 12 L 21 12 L 21 10 L 18 10 L 18 7 Z M 13 23 C 13.5625 23 14 23.4375 14 24 C 14 24.5625 13.5625 25 13 25 C 12.4375 25 12 24.5625 12 24 C 12 23.4375 12.4375 23 13 23 Z M 22 23 C 22.5625 23 23 23.4375 23 24 C 23 24.5625 22.5625 25 22 25 C 21.4375 25 21 24.5625 21 24 C 21 23.4375 21.4375 23 22 23 Z"></path></g></svg>}>
                    Add to Cart
                </Button>
            </div>


        </div>
    )
}

export default AddtoCartMobileview