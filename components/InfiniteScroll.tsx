"use client";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { fetch_anime } from "@/app/action";

const LoadMore = () => {
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState<ReactNode[]>([]); // Specify the type here
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  useEffect(() => {
    async function loadMoreAnime() {
      const newAnime = await fetch_anime(page);
      setAnimeList([...animeList, ...newAnime]);
    }
    loadMoreAnime();
  }, [page]);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {animeList}
        <div ref={loaderRef}>Loading more...</div>
      </div>
      <section className="flex justify-center items-center w-full">
        <div>
          <Image
            ref={loaderRef}
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
};
export default LoadMore;
