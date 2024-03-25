import React, { useEffect, useRef, useState } from 'react';

interface DropProps extends React.ComponentProps<'div'> {
  children: React.ReactElement[];
}

const setDragAnimation = (el: HTMLElement, active: boolean) => {
  if (active) {
    el.style.opacity = '0.75';
    el.style.pointerEvents = 'none';
    el.style.boxShadow = '0 0 8px rgb(200, 200, 200)';
    el.style.transform = `scale(${1 + 12 / el.getBoundingClientRect().width})`;
  } else {
    el.style.opacity = '';
    el.style.pointerEvents = '';
    el.style.boxShadow = '';
    el.style.transform = '';
  }
};

const Drop: React.FC<DropProps> = (props: DropProps) => {
  const [item, setItem] = useState<React.ReactElement[]>([]);
  const refDrag = useRef<HTMLElement | null>(null);
  const refs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const insertItem = (source: number, index: number) => {
      if (source === -1 || index === -1) return;
      if (source === index) return;
      if (source + 1 === index) return;
      if (source > index) {
        refs.current = [
          ...refs.current.slice(0, index),
          ...refs.current.splice(source, 1),
          ...refs.current.slice(index),
        ];
        setItem((item) => [
          ...item.slice(0, index),
          ...item.splice(source, 1),
          ...item.slice(index),
        ]);
      } else {
        refs.current = [
          ...refs.current.slice(0, source),
          ...refs.current.slice(source + 1, index),
          ...refs.current.splice(source, 1),
          ...refs.current.slice(index - 1),
        ];
        setItem((item) => [
          ...item.slice(0, source),
          ...item.slice(source + 1, index),
          ...item.splice(source, 1),
          ...item.slice(index - 1),
        ]);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.target instanceof HTMLDivElement) {
        refDrag.current = e.target;
        setDragAnimation(refDrag.current, true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (!refDrag.current) return;
      const source = refs.current.findIndex((el) => el === refDrag.current);
      const target = refs.current.findIndex((el) => el === e.target);

      if (source === target) return;

      if (e.target instanceof HTMLDivElement) {
        const rect = e.target.getBoundingClientRect();
        if ((e.clientX - rect.left) / rect.width >= 0.5) {
          insertItem(source, target + 1);
        } else {
          insertItem(source, target);
        }
        refDrag.current.style.transform = '';
      }
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (refDrag.current === null) return;
      const source = refs.current.findIndex((el) => el === refDrag.current);

      const rect = refDrag.current.getBoundingClientRect();

      refDrag.current.style.transition = '';
      refDrag.current.style.transform = `scale(${1 + 12 / rect.width}) translate(${
        e.pageX - (refDrag.current.offsetLeft + refDrag.current.offsetWidth / 2)
      }px, ${e.pageY - (refDrag.current.offsetTop + refDrag.current.offsetHeight / 2)}px)`;
      return;
      refs.current.every((el, index) => {
        if (el.offsetLeft > e.pageX) {
          console.log(source, index);
          insertItem(source, index);
          return false;
        }
        return true;
        console.log(index, el.offsetLeft, el.offsetTop);
        //console.log(index, rect.x, rect.y);
        return true;
      });
      //console.log(e.pageX, e.pageY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button !== 0 || refDrag.current === null) return;
      refDrag.current.style.transition = 'all 200ms ease';
      setDragAnimation(refDrag.current!, false);
      refDrag.current = null;
    };

    refs.current = [];
    setItem(
      props.children.map((child, index) => {
        const clone = React.cloneElement(child, {
          ref: (ref: HTMLDivElement) => {
            refs.current[index] = ref;
            ref.style.transition = 'all 200ms ease';
            ref.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mousemove', handleWindowMouseMove);
            ref.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
          },
        });
        return clone;
      }),
    );

    return () => {
      refs.current.forEach((el) => {
        el.style.transition = '';
        el.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleWindowMouseMove);
        el.addEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      });
    };
  }, [props.children]);

  return <>{item}</>;
};

export default Drop;
