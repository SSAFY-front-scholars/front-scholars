/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { ContainerProps, Item, ItemProps } from './interfaces';
import { containerCss, itemCss, mainCss } from './styles';

// 리액트의 이벤트는 SyntheticEvent 이라는 자체 이벤트 시스템(래퍼)를 가지고 있음
// 최상위 루트에서 이벤트를 관리, 기본적으로 모든 이벤트를 관리하며 모든 이벤트를 감지 및 위임함
// 타입에서 React.DragEvent로 제네릭을 HTMLDivElement로 가지는 것도 이 래퍼객체에서 기본 돔 요소를 가지고 바인딩하는 내부 동작을 추상화 해서 생긴 것

const DragAndDropV1: React.FC = () => {
  const ONLY_CONTAINER_ID = 1;
  const [items, setItems] = useState<Item[]>([
    { id: 1, emoji: '🐋', container: ONLY_CONTAINER_ID },
    { id: 2, emoji: '🐬', container: ONLY_CONTAINER_ID },
    { id: 3, emoji: '🐳', container: ONLY_CONTAINER_ID },
    { id: 4, emoji: '🐟', container: ONLY_CONTAINER_ID },
    { id: 5, emoji: '🦐', container: ONLY_CONTAINER_ID },
  ]);

  const [dragOverItemId, setDragOverItemId] = useState<number | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData('draggedItemId', id.toString());
    console.log(
      '드래그 시작, draggedItemId = ' + e.dataTransfer.getData('draggedItemId'),
    );
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDragOverItemId(id);
    console.log('드래그 엔터- dragOverItemId = ' + dragOverItemId);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    console.log('드래그 리브- dragLeaveItemId = ' + dragOverItemId);
    setDragOverItemId(null); // 드래그 중인 아이템이 드롭 타겟을 벗어남
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log('드래그 오버');
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, newContainer: number) => {
    e.preventDefault();
    setDragOverItemId(null);
    const draggedItemId = parseInt(e.dataTransfer.getData('draggedItemId'));

    const target = e.target as HTMLElement; // HTML 요소로 타입 단언해줌
    const targetId = target.getAttribute('id');
    console.log('드랍 - targetId = ' + targetId);

    // getAttribute의 반환 타입이 string | null인데, parseInt에서 null값을 받지 않으므로 유효시 처리하도록 함
    // 또 다른 null 처리법으로 논리적 단축평가 ( targetId || "기본값" ) 이 있지만, 이는 기본값이라는 올바르지 않은 대상을 처리하므로 해당 문제에 적합하지 않음
    if (targetId) {
      //valid할때만 parseInt 평가 진행
      if (draggedItemId === parseInt(targetId)) {
        setItems((items) =>
          items.map((item) =>
            item.id === draggedItemId
              ? { ...item, container: newContainer }
              : item,
          ),
        );
      } else {
        setItems((currentItems) => {
          // 지금껏 타입 선언 vs 타입 단언을 혼재했는데, 정확히 알게됨
          //   let newItems = [...currentItems] as Item[]; // -> 타입 단언: 개발자의 타입에 대한 확신을 알리고, 컴파일러의 타입 추론을 덮어씀
          let newItems: Item[] = [...currentItems];
          const draggedIndex = newItems.findIndex(
            (item) => item.id === draggedItemId,
          );
          const targetIndex = newItems.findIndex(
            (item) => item.id === parseInt(targetId!),
          );

          if (newItems[draggedIndex].container === newContainer) {
            newItems.splice(draggedIndex, 1);
            newItems.splice(targetIndex, 0, currentItems[draggedIndex]);
          }

          return newItems.map((item) =>
            item.id === draggedItemId
              ? { ...item, container: newContainer }
              : item,
          );
        });
      }
    } else {
      console.log('targetIdNumber가 null임');
    }
  };

  const Container: React.FC<ContainerProps> = ({
    id,
    items,
    onDragOver,
    onDrop,
    onDragStart,
    onDragEnter,
    onDragLeave,
  }) => {
    return (
      <div
        className={`container-${id}`}
        css={containerCss}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, id)}
      >
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            dataItemId={item.id}
          />
        ))}
      </div>
    );
  };

  const Item: React.FC<ItemProps> = ({
    item,
    onDragStart,
    onDragEnter,
    onDragLeave,
    dataItemId,
  }) => {
    const isDragOver = dragOverItemId === item.id;

    return (
      <div
        id={dataItemId.toString()}
        className="draggable"
        css={isDragOver ? itemCss.dragOver : itemCss.default} // 드래그 중인 요소에 따라 스타일 변경
        draggable="true"
        onDragStart={(e) => onDragStart(e, item.id)}
        onDragEnter={(e) => onDragEnter(e, item.id)}
        onDragLeave={(e) => onDragLeave(e, item.id)}
      >
        {`${item.emoji} ${item.id}`}
      </div>
    );
  };

  return (
    <div css={mainCss}>
      <Container
        id={ONLY_CONTAINER_ID}
        items={items.filter((item) => item.container === ONLY_CONTAINER_ID)} // 컨테이너 두개 이상을 가정해서 설계
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      />
    </div>
  );
};

export default DragAndDropV1;
