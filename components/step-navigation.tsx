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
  { title: 'Review', route: 'review', link: AddDealRoutes.REVIEW_DEAL },
];

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = path.basename(pathname);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(steps.findIndex((step) => step.route === currentPath));
  }, [currentPath]);

  return (
    <div className="mb-12 mt-4 lg:mb-0 min-w-60">
      {/* back button */}
      <Link
        href={steps[currentStep - 1]?.link || steps[0].link}
        className="mb-4 flex items-center gap-2 text-xl disabled:text-gray-400 lg:mb-12 lg:gap-5"
      >
        Back
      </Link>

      {/* list of form steps */}
      <div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8">
        {steps.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            className="group z-20 flex items-center gap-3 text-2xl"
            prefetch={true}
          >
            <span
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors duration-200 lg:h-12 lg:w-12 lg:text-lg',
                {
                  // Active step: teal background and black text
                  'border-none bg-teal-500 text-white group-hover:border-none group-hover:text-white':
                    currentPath === step.route,
                  // Inactive step: light gray background and black text
                  'border-gray-300 bg-white group-hover:border-gray-400 group-hover:text-gray-600 text-gray-500':
                    currentPath !== step.route,
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                'hidden text-gray-500 transition-colors duration-200 group-hover:text-gray-600 lg:block',
                {
                  'font-light': currentPath !== step.route, // Light font for inactive steps
                  'font-semibold text-black': currentPath === step.route, // Bold font for active step
                }
              )}
            >
              {step.title}
            </span>
          </Link>
        ))}
        {/* mobile background dashes */}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed border-gray-300 lg:hidden" />
      </div>
    </div>
  );
}
