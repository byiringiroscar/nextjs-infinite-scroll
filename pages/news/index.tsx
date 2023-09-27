'use client'
import { useInfiniteQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import NewsHome from './newsHome';

const queryClient = new QueryClient();

const news = [
    { id: 1, title: 'news 1' },
    { id: 2, title: 'news 2' },
    { id: 3, title: 'news 3' },
    { id: 4, title: 'news 4' },
    { id: 5, title: 'news 5' },
    { id: 6, title: 'news 6' },
    { id: 7, title: 'news 7' },
    { id: 8, title: 'news 8' },
    { id: 9, title: 'news 9' },
    { id: 10, title: 'news 10'}
  ]

  const fetchNews = async (page: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return news.slice((page - 1) * 2, page * 2)
  }
  


const News = () => {
    
    return (
        <QueryClientProvider client={queryClient}>
            <NewsHome />
      </QueryClientProvider>
    );
}

export default News;