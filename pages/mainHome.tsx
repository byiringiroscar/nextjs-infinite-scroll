import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

const posts = [
    { id: 1, title: 'post 1' },
    { id: 2, title: 'post 2' },
    { id: 3, title: 'post 3' },
    { id: 4, title: 'post 4' },
    { id: 5, title: 'post 5' },
    { id: 6, title: 'post 6' },
    { id: 7, title: 'post 7' },
    { id: 8, title: 'post 8' },
    { id: 9, title: 'post 9' },
    { id: 10, title: 'post 10'}
  ]
  
  // mock database fetch
  const fetchPost = async (page: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return posts.slice((page - 1) * 2, page * 2)
  }
  
  const MainHome = () => {
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
      ['query'],
      async ({ pageParam = 1 }) => {
        const response = await fetchPost(pageParam);
        return response;
      },
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
        initialData: {
          pages: [posts.slice(0, 2)],
          pageParams: [1],
        },
      }
    );
  
    return (
      <div>
        Posts:
        {data?.pages.map((page, i) => (
          <div key={i}>
            {page.map((post) => (
              <div key={post.id}>{post.title}</div>
            ))}
          </div>
        ))}
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage
            ? 'Loading more...'
            : (data?.pages.length ?? 0) < 3
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    );
  };
  
  export default MainHome;