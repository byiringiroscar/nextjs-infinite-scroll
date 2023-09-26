'use client'
import { useInfiniteQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainHome from './mainHome';
import React from 'react';


const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainHome />
    </QueryClientProvider>
  )
}




















