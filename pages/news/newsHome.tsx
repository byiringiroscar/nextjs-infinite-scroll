'use client'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import styles from '../../styles/Home.module.css';


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
    { id: 10, title: 'news 10'},
    { id: 11, title: 'news 11' },
    { id: 12, title: 'news 12' },
    { id: 13, title: 'news 13' },
    { id: 14, title: 'news 14' },
    { id: 15, title: 'news 15' },
    { id: 16, title: 'news 16' },
    { id: 17, title: 'news 17' },
    { id: 18, title: 'news 18' },
    { id: 19, title: 'news 19' },
    { id: 20, title: 'news 20'},
  ]

  const fetchNews = async (page: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return news.slice((page - 1) * 2, page * 2)
  }

const NewsHome = () => {
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['query'],
        async ({ pageParam = 1 }) => {
          const response = await fetchNews(pageParam);
          return response;
        },
        {
          getNextPageParam: (_, pages) => {
            return pages.length + 1;
          },
          initialData: {
            pages: [news.slice(0, 2)],
            pageParams: [1],
          },
        }
      );

      const lastPostRef = useRef<HTMLElement>(null)
      const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
      })
      useEffect(() => {
        if(entry?.isIntersecting) fetchNextPage()
      }, [entry])

      const _news = data?.pages.flatMap((page) => page)
    return (
        <div>
            <div>
        Posts:
        {_news?.map((post, i) => {
            if(i === _news.length -1 )
            return (
                <div className={styles.card} key={post.id} ref={ref}>{post.title}</div>
                )
            return (
                <div className={styles.card} key={post.id}>{post.title}</div>
            )
        })}
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage
            ? 'Loading more...'
            : (data?.pages.length ?? 0) < 3
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
        </div>
    )
}

export default NewsHome;