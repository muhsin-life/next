import * as Accordion from '@radix-ui/react-accordion';
import React, { forwardRef, Ref } from "react"
import classNames from 'classnames';
import { Icon } from './ui/icons';

export const AccordionItem = forwardRef<HTMLDivElement, { children: any, className: any, value: any }>(({ children, className, value, ...props }, forwardedRef) => (
    <Accordion.Item
        value={value}
        className={classNames(
            ' mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b ',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </Accordion.Item>
));

export const AccordionTrigger = forwardRef<HTMLButtonElement, { children: any, className: any }>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            className={classNames(
                'text-violet11 hover:bg-mauve2 group flex h-[30px] flex-1 cursor-default items-center justify-between bg-white  text-[15px] leading-none ',
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <Icon type="chevronBottomIcon"
                className="text-violet10  transition-transform duration-300 group-data-[state=open]:rotate-180 w-5 h-5"
                aria-hidden
            />
        </Accordion.Trigger>
    </Accordion.Header>
));

export const AccordionContent = forwardRef<HTMLDivElement, { children: any, className: any }>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={classNames(
            'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        <div className=" ">{children}</div>
    </Accordion.Content>
));