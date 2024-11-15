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
      <h1 className="text-slate-500 mb-4 text-4xl font-semibold  md:text-7xl">
        {title}
      </h1>
      {subtitle && (
        <span className="text-slate-500 text-sm font-light  md:text-2xl">
          {subtitle}
        </span>
      )}
    </>
  );
}