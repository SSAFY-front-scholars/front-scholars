import { RefObject, useEffect, useState } from "react";

const useDnd = (items: any[]) => {
  // DND State들
  const [dndItems, setDndItems] = useState<RefObject<HTMLElement>[]>([]);
  // DND 이벤트 함수들
  let dragStart = (event: DragEvent) => {
    console.log(event);
    console.log("drag start event");
  };
  let drag = (event: DragEvent) => {
    console.log(event);
    console.log("dragging event");
  };
  let dragEnter = (event: DragEvent) => {
    console.log(event);
    console.log("drag enter event");
  };
  let dragOver = (event: DragEvent) => {
    console.log(event);
    console.log("drag over event");
  };
  let drop = (event: DragEvent) => {
    console.log(event);
    console.log("drop event");
  };
  let dragLeave = (event: DragEvent) => {
    console.log(event);
    console.log("drag leave event");
  };
  let dragEnd = (event: DragEvent) => {
    console.log(event);
    console.log("drag end event");
  };

  // DND 이벤트 등록
  useEffect(() => {
    dndItems.forEach((item, idx) => {
      if (item.current?.draggable) {
        item.current.ondragstart = dragStart;
        item.current.ondrag = drag;
        item.current.ondragenter = dragEnter;
        item.current.ondragover = dragOver;
        item.current.ondrop = drop;
        item.current.ondragleave = dragLeave;
        item.current.ondragend = dragEnd;
      }
    });
  }, [dndItems]);

  // item 추가 기능
  const addItem = (
    item: RefObject<HTMLElement> | RefObject<HTMLElement>[],
    position?: number
  ): void => {
    let newItems: RefObject<HTMLElement>[] = [];
    if (position === undefined) {
      // 위치 지정 x
      if (item instanceof Array) {
        newItems = [...item, ...dndItems];
      } else {
        newItems = [...dndItems];
        newItems.push(item);
      }
    } else {
      // 위치 지정 o
      let newItems: RefObject<HTMLElement>[] = [...dndItems];
      if (item instanceof Array) {
        newItems.splice(position, 0, ...item);
      } else {
        newItems.splice(position, 0, item);
      }
    }
    setDndItems(newItems);
  };

  // item 삭제 기능
  const removeItem = (position: number): void => {
    let newItems: RefObject<HTMLElement>[] = [...dndItems];
    newItems.splice(position, 1);
    setDndItems(newItems);
  };

  // 이벤트 함수 변경 기능
  const setDragStart = (newDragStart: () => any) => {
    dndItems.forEach((item) => {
      if (item.current?.draggable) item.current.ondragstart = newDragStart;
    });
  };
  const setDrag = (newDrag: () => any) => {
    dndItems.forEach((item) => {
      if (item.current?.draggable) item.current.ondrag = newDrag;
    });
  };
  const setDragEnter = (newDragEnter: () => any) => {
    dndItems.forEach((item) => {
      if (item.current?.draggable) item.current.ondragenter = newDragEnter;
    });
  };
  const setDragOver = (newDragOver: () => any) => {
    dndItems.forEach((item) => {
      if (item.current?.draggable) item.current.ondragover = newDragOver;
    });
  };
  const setDrop = (newDrop: () => any) => {
    dndItems.forEach((item) => {
      if (item.current?.draggable) item.current.ondrop = newDrop;
    });
  };
  const setDragLeave = (newDragLeave: () => any) => {
    dndItems.forEach((item) => {
      if (item.current?.draggable) item.current.ondragleave = newDragLeave;
    });
  };
  const setDragEnd = (newDragEnd: () => any) => {
    dndItems.forEach((item) => {
      if (item.current?.draggable) item.current.ondragend = newDragEnd;
    });
  };

  return {
    setDndItems,
    addItem,
    removeItem,
    setDragStart,
    setDrag,
    setDragEnter,
    setDragOver,
    setDrop,
    setDragLeave,
    setDragEnd,
  };
};

export default useDnd;
