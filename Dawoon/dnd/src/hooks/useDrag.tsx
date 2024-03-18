import React, { ReactElement, useEffect, useRef, useState } from 'react';

const useDrag = () => {
  const [item, setItem] = useState<ReactElement[]>([]);
  const dragRef = useRef<EventTarget | null>();
  const ref = useRef<HTMLDivElement[]>([]);

  const addItem = (callback: (func: (el: HTMLDivElement) => void) => ReactElement) => {
    setItem((item) => [
      ...item,
      callback((el: HTMLDivElement) => {
        ref.current[ref.current.length] = el;
      }),
    ]);
  };

  const insertItem = (source: number, index: number) => {
    if (source == -1 || index == -1) return;
    if (source == index) return;
    if (source + 1 == index) return;
    if (source > index) {
      ref.current = [
        ...ref.current.slice(0, index),
        ...ref.current.splice(source, 1),
        ...ref.current.slice(index),
      ];
      setItem((item) => [...item.slice(0, index), ...item.splice(source, 1), ...item.slice(index)]);
    } else {
      ref.current = [
        ...ref.current.slice(0, source),
        ...ref.current.slice(source + 1, index),
        ...ref.current.splice(source, 1),
        ...ref.current.slice(index - 1),
      ];
      setItem((item) => [
        ...item.slice(0, source),
        ...item.slice(source + 1, index),
        ...item.splice(source, 1),
        ...item.slice(index - 1),
      ]);
    }
  };

  const setDragAnimation = (el: HTMLDivElement, active: boolean) => {
    if (active) {
      el.style.opacity = '0.75';
      el.style.boxShadow = '0 0 8px rgb(200, 200, 200)';
      el.style.transform = `scale(${1 + 12 / el.getBoundingClientRect().width})`;
    } else {
      el.style.opacity = '';
      el.style.boxShadow = '';
      el.style.transform = '';
    }
  };

  useEffect(() => {
    const ghotsImage = new Image();
    ghotsImage.src = 'data:image/png;base64,';

    const handleDragStart = (e: DragEvent) => {
      dragRef.current = e.target;
      e.dataTransfer?.setDragImage(ghotsImage, 0, 0);
      if (dragRef.current instanceof HTMLDivElement) {
        setDragAnimation(dragRef.current, true);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      const source = ref.current.findIndex((el) => el == dragRef.current);
      const target = ref.current.findIndex((el) => el == e.target);

      if (source === target) return;

      if (e.target instanceof HTMLDivElement) {
        const rect = e.target.getBoundingClientRect();
        if ((e.clientY - rect.top) / rect.height >= 0.5) {
          insertItem(source, target + 1);
        } else {
          insertItem(source, target);
        }
      }
    };

    const handleDragEnd = (e: DragEvent) => {
      if (dragRef.current instanceof HTMLDivElement) {
        setDragAnimation(dragRef.current, false);
      }
      dragRef.current = null;
    };

    ref.current.forEach((el) => {
      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('dragend', handleDragEnd);
      el.style.transition = 'all 50ms ease';
    });

    return () => {
      ref.current.forEach((el) => {
        el.removeEventListener('dragstart', handleDragStart);
        el.removeEventListener('dragover', handleDragOver);
        el.removeEventListener('dragend', handleDragEnd);
      });
    };
  }, [item]);

  return { addItem, item };
};

export default useDrag;
