import React, { useEffect, useRef, useState } from 'react';

interface DropProps extends React.ComponentProps<'div'> {
  children: React.ReactElement[];
}

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

const Drop: React.FC<DropProps> = (props: DropProps) => {
  const [item, setItem] = useState<React.ReactElement[]>([]);
  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ghotsImage = new Image();
    ghotsImage.src = 'data:image/png;base64,';

    const handleDragStart = (e: DragEvent) => {
      e.dataTransfer?.setDragImage(ghotsImage, 0, 0);
      if (e.target instanceof HTMLDivElement) setDragAnimation(e.target, true);
    };

    const handleDragEnd = (e: DragEvent) => {
      if (e.target instanceof HTMLDivElement) setDragAnimation(e.target, false);
    };

    refs.current = [];
    setItem(
      props.children.map((child, index) => {
        const clone = React.cloneElement(child, {
          ref: (ref: HTMLDivElement) => {
            refs.current[index] = ref;
            ref.style.transition = 'all 50ms ease';
            ref.addEventListener('dragstart', handleDragStart);
            ref.addEventListener('dragend', handleDragEnd);
          },
        });
        return clone;
      }),
    );

    return () => {
      refs.current.forEach((i) => {
        i.style.transition = '';
        i.removeEventListener('dragstart', handleDragStart);
        i.removeEventListener('dragend', handleDragEnd);
      });
    };
  }, [props.children]);

  return <>{item}</>;
};

export default Drop;
