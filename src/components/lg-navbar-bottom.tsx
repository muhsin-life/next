import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useLanguage } from "@/hooks/useLanguage"
import { Typography, typographyVariants } from "./ui/typography"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { useModal } from "./ui/modalcontext"
const LgNavbarBottom = ({ locationOnClickHandle }: { locationOnClickHandle: any }) => {
  const { data: session } = useSession()
  const { t } = useLanguage()
  const { AddressDataIndex } = useModal()

  const displayAddress = () => {
    if (session && session.token.addresses.length > 0) {
      return AddressDataIndex?.google_address
    }
    else {
      return "Dubai, United Arab Emirates"
    }
  }

  return (
    <>
      <div className="bg-life-2 items-center ">
        <div className="  justify-between py-1 container-page text-white flex" >
          <Link href={"/super-summer-savers"} className={cn("flex justify-start space-x-3 items-center", typographyVariants({ variant: "secondary" }))}>
            <Typography size={"sm"} lineClamp={"one"}>{t.navbar.highest_rated_phar}</Typography>
            <span className=" ml-2">|</span>
            <Image src={"https://www.lifepharmacy.com/images/app-rating.svg"} className="w-20 h-5 my-auto" height={30} width={30} alt={"app-rating"} />
            <span className="mr-2">|</span>
            <Typography size={"sm"} lineClamp={"one"}>Download Now</Typography>
          </Link>
          <div className="flex items-center">
            <Typography lineClamp={"one"} size={"sm"}  className="max-w-[30rem]">{t.navbar.deliver_to}  {displayAddress()} </Typography>
            <Button onClick={() => { locationOnClickHandle() }} iconLeft={true} iconType="locationPinIcon" variant="white" size={"sm"}>CHANGE</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LgNavbarBottom