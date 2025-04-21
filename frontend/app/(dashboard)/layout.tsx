'use client';
import * as React from 'react';
import { usePathname, useParams } from 'next/navigation';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function Layout(props: { children: React.ReactNode }) {
const pathname = usePathname();
  const params = useParams(); 

  return (
    <DashboardLayout>
      <PageContainer title="">{props.children}</PageContainer>
    </DashboardLayout>
  );
}  
