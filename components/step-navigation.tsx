// Code references https://github.com/jamesqquick/nextjs-multi-page-form-nextjs/blob/starter-code/src/app/page.tsx

'use client';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';
import { AddDealRoutes } from '@/constants/index';
import { IoIosArrowBack } from "react-icons/io";
import {LeftOutlined} from '@ant-design/icons'
const steps = [
  {
    title: 'Step One',
    route: 'step-one',
    link: AddDealRoutes.PRODUCT_INFO,
  },
  {
    title: 'Step Two',
    route: 'step-two',
    link: AddDealRoutes.COUPON_DETAILS,
  },
  {
    title: 'Step Three',
    route: 'step-three',
    link: AddDealRoutes.CONTACT_INFO,
  },
];

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = path.basename(pathname);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(steps.findIndex((step) => step.route === currentPath));
  }, [currentPath]);

  return (
    <div className="lg:mb-12 mt-4 pl-10  min-w-60">
      {/* back button */}
          <Link
        href={steps[currentStep - 1]?.link || steps[0].link}
        className={clsx(
          'mb-4 flex items-center gap-2 rounded-lg px-4 py-2 text-xl transition-colors lg:mb-12 lg:gap-2',
          'bg-gray-100 hover:bg-gray-200 text-gray-600'
        )}
      >
        <LeftOutlined />
        <span>Back</span>
      </Link>

      {/* list of form steps */}
      <div className="relative flex flex-row justify-between ">
        {steps.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            className="group z-20 flex items-center gap-3 text-2xl"
            prefetch={true}
          >
            <span
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full shadow-md shadow-slate-300 border text-sm transition-colors duration-200 lg:h-12 lg:w-12 lg:text-lg',
                {
                  // Active step: teal background and black text
                  ' bg-yellow-500 text-gray-700 border-gray-700 ':
                    currentPath === step.route,
                  // Inactive step: light gray background and black text
                  'border-gray-300 bg-white group-hover:border-4 group-hover:border-gray-700 group-hover:text-yellow-600 text-gray-500':
                    currentPath !== step.route,
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                'hidden text-gray-500 transition-colors duration-200 group-hover:font-semibold group-hover:text-gray-600 lg:block',
                {
                  'font-light': currentPath !== step.route, // Light font for inactive steps
                  'font-semibold text-black': currentPath === step.route, // Bold font for active step
                }
              )}
            >
           -----
            </span>
          </Link>
        ))}
        {/* mobile background dashes */}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed border-gray-300 lg:hidden" />
      </div>
    </div>
  );
}
