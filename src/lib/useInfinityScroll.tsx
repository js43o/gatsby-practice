import { useRef, useState, useEffect, useMemo } from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export type ImageItem = {
  image: IGatsbyImageData;
  alt: string;
  id: string;
};

const NUMBER_PER_PAGE = 6;

const useInfinityScroll = (data: ImageItem[]) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(1);

  const observer = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;

    setCount(count => count + 1);
    observer.disconnect();
  });

  useEffect(() => {
    if (
      !ref.current ||
      ref.current.children.length == 0 ||
      count * NUMBER_PER_PAGE >= data.length
    )
      return;

    observer.observe(ref.current.children[ref.current.children.length - 1]);
  }, [count]);

  return {
    images: data.slice(0, count * NUMBER_PER_PAGE),
    ref,
  };
};

export default useInfinityScroll;
