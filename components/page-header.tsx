import React from 'react';

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h1 className="text-slate-700 mb-4 text-lg lg:text-4xl font-semibold md:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <div className="text-slate-500 text-xs p-2 bg-red-50  flex justify-center font-light md:text-xl">
          <div className="break-words lg:w-1/2 whitespace-normal">
            {subtitle}
          </div>
        </div>
      )}
    </>
  );
}
