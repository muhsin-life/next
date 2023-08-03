import React from 'react'
export const ProductsSkeleton = ({ }) => {
    return (
        <div className={`w-full  mr-4`}>
            <a className="flex flex-col relative w-full bg-white overflow-hidden card translate-3d-none-after card translate-3d-none-after rounded border border-gray-300 ">
                <div className="relative  text-primary-500 pt-[240px] px-[120px] " >
                    <div className="absolute top-0 left-0 h-full w-full"><span className="skeleton-box bg-[#e2e8f0] block h-full"></span></div></div>
                <div className="flex flex-col flex-grow">
                    <div className="pl-4 pr-4 pt-4 mb-4 text-left relative flex-grow">
                        <h3
                            className="text-lg font-bold text-gray-darkest mr-10">
                            <span className="skeleton-box bg-[#e2e8f0] relative h-5 w-1/6 inline-block"></span>
                            <span className="skeleton-box bg-[#e2e8f0] relative h-5 mx-2 w-1/2 inline-block"></span>
                            <span className="skeleton-box bg-[#e2e8f0] relative h-5 w-2/4  inline-block"></span>
                            <span className="skeleton-box bg-[#e2e8f0] relative h-5 w-2/5 mx-2 inline-block"></span>
                        </h3>
                    </div>
                </div>
            </a>
        </div>
    )
}