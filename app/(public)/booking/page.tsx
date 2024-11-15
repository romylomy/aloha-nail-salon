import { AddDealRoutes } from '@/constants/index';
import { redirect } from 'next/navigation';
import React from 'react';

export default function AddPage() {
  redirect(AddDealRoutes.PRODUCT_INFO);
}