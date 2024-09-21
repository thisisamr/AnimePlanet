# Anime Showcase - Next.js 14 with Server Actions, Infinite Scrolling & Animations

## Overview

This project is a React-based anime showcase website built with **Next.js 14**. It features **Server Actions** for efficient server-side logic, **Infinite Scrolling** to seamlessly load more content, and **Framer Motion** animations to deliver a smooth user experience.

## Features

- **Server Actions (Next.js 14)**: Optimized for fetching and handling data directly from the server, improving performance and scalability.
- **Infinite Scrolling**: Continuously loads anime content as users scroll down the page, providing a seamless and endless browsing experience.
- **Framer Motion Animations**: Smooth transitions and animations are used to create dynamic and engaging UI components.

---

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/anime-showcase.git
   ```

2. Navigate to the project folder:

   ```bash
   cd anime-showcase
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The app should now be running on `http://localhost:3000`.

---

## Key Concepts

### 1. Server Actions (Next.js 14)

**Next.js 14** introduces **Server Actions** as a new way to handle server-side data fetching and actions. Unlike traditional API routes, Server Actions allow you to execute server-side logic directly from the component, reducing the need for REST APIs or GraphQL for simple interactions.

#### Example Usage:

```tsx
"use server";

export async function fetchAnimeList(page: number) {
  const res = await fetch(`/api/anime?page=${page}`);
  const data = await res.json();
  return data;
}
```

This example demonstrates fetching an anime list from an API endpoint using Server Actions, which will execute this action on the server-side.

### 2. Infinite Scrolling

Infinite scrolling dynamically loads more content when the user reaches the end of the current content. In this project, we use a combination of **React hooks** and **Intersection Observer** to detect when the user has scrolled near the bottom of the page and fetch more anime data.

#### Example:

```tsx
import { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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
      const newAnime = await fetchAnimeList(page);
      setAnimeList((prevList) => [...prevList, ...newAnime]);
    }
    loadMoreAnime();
  }, [page]);

  return (
    <div>
      {animeList.map((anime, index) => (
        <AnimeCard key={index} anime={anime} />
      ))}
      <div ref={loaderRef}>Loading more...</div>
    </div>
  );
};
```

Another easy option is to use an awesome package called `react-intersection-observer`

```typescript
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";
let p = 2;
function LoadMore() {
  const { ref, inView } = useInView();
  const [d, setD] = useState<ReactNode[]>([]);
  useEffect(() => {
    if (inView) {
      fetch_anime(p).then((res) => {
        setD([...d, ...res]);
        p++;
      });
    }
  }, [inView]);
  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {d}
      </section>
      <section className="flex justify-center items-center w-full">
        <div>
          <Image
            ref={ref}
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
}

export default LoadMore;
```

### 3. Framer Motion Animations

**Framer Motion** is a powerful library used to create animations. In this project, animations are used to create smooth transitions for cards and other UI elements, providing a more engaging and interactive user experience.

#### Example:

```tsx
import { motion } from "framer-motion";

const AnimeCard = ({ anime }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="card">
      <h2>{anime.title}</h2>
      <p>{anime.description}</p>
    </div>
  </motion.div>
);
```

This example shows how the `AnimeCard` component fades into view as the user scrolls down, using the `whileInView` prop to trigger the animation.

---

## Folder Structure

```bash
.
├───app
│   ├── action.tsx          # Server actions or data handling
│   ├── favicon.ico         # Website favicon
│   ├── globals.css         # Global styles for the app
│   ├── layout.tsx          # Layout component for consistent page structure
│   ├── page.tsx            # Main page file
├───components
│   ├── AnimeCard.tsx       # Component displaying an anime card
│   ├── Footer.tsx          # Footer component
│   ├── MotionDev.tsx       # Component for motion-based animations
│   ├── Hero.tsx            # Hero section component
│   ├── InfiniteScroll.tsx  # Infinite scrolling logic
└───public
    └── images              # Static assets like images

```

---

## Technologies Used

- **Next.js 14**: Full-stack React framework for server-side rendering and static generation.
- **Framer Motion**: Animations for UI elements.
- **Intersection Observer API**: For detecting scroll position and triggering infinite scroll.
- **Server Actions**: A Next.js 14 feature for executing server-side logic directly from components.

---

## Contributing

Feel free to fork the repository and make contributions! If you find any issues or improvements, submit a pull request.

---

## License

This project is licensed under the MIT License.

---

This `README.md` explains the core technologies, features, and how to set up the project. You can add additional sections as needed for more advanced topics or specific usage instructions.
