import { useRef, useState, useEffect, useCallback } from 'react';
import { ImageItem } from 'pages/gallery';

const NUMBER_PER_PAGE = 6;

const useInfinityScroll = (data: ImageItem[], category: string) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLDivElement | null>(null);

  const images = data.filter(item => item.dir.includes(category));

  // indexing
  const openImage = useCallback((index: number) => setCurrentIndex(index), []);
  const closeImage = () => setCurrentIndex(-1);
  const increaseIndex = () =>
    setCurrentIndex(
      currentIndex === count * NUMBER_PER_PAGE - 1 ? 0 : currentIndex + 1,
    );
  const decreaseIndex = () =>
    setCurrentIndex(
      currentIndex === 0 ? count * NUMBER_PER_PAGE - 1 : currentIndex - 1,
    );

  // observer
  const observer = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;

    setCount(count => count + 1);
    observer.disconnect();
  });

  useEffect(() => {
    if (
      !ref.current ||
      ref.current.children.length == 0 ||
      count * NUMBER_PER_PAGE >= images.length
    )
      return;

    observer.observe(ref.current.children[ref.current.children.length - 1]);
  }, [count, category]);

  useEffect(() => setCount(1), [category]);

  return {
    images: images.slice(0, count * NUMBER_PER_PAGE),
    ref,
    currentIndex,
    actions: {
      openImage,
      closeImage,
      increaseIndex,
      decreaseIndex,
    },
  };
};

export default useInfinityScroll;
