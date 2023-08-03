import { Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { RadioGroup } from '@headlessui/react'
const TransitionComp = ({ setTransition, children }: { setTransition: any, children: any }) => {

    const [isShowing, setIsShowing] = useState(setTransition)

    return (
        <Transition appear

            show={isShowing}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">

            <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                {children}
            </Transition.Child>

        </Transition>
    )
}

const LgSearchMenuTransition = ({ children }: { children: any }) => {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            {children}
        </Transition>
    )
}

export { TransitionComp, LgSearchMenuTransition }