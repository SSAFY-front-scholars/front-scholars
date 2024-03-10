import React, { ReactNode } from "react";
import "../css/Item.css";

interface ItemProps {
  children?: ReactNode;
  idx: number; // 몇 번째 item
  onDragStartHandler?: (from: number) => void; // 드래그 시작
  onDrag?: () => void; // 드래그 중
  onDragEnter?: () => void; // 해당 item 으로 마우스가 진입
  onDragOverHandler?: (to: number) => void; // 해당 item 위에 마우스가 위치하는 중
  onDropHandler?: () => void; // 해당 item 의 위치에 특정 item 이 drop
  onDragEndHandler?: () => void; // 드래그가 종료되고 마우스 버튼을 놓음
  onDragLeave?: () => void; // 드래그가 종료되고 마우스가 영역을 벗어남
}

const Item: React.FC<ItemProps> = ({
  children,
  idx,
  onDragStartHandler,
  onDragOverHandler,
  onDragEndHandler,
}) => {
  return (
    <div
      className="item_container"
      draggable
      onDragStart={() => {
        if (onDragStartHandler !== undefined) onDragStartHandler(idx);
      }}
      onDragOver={() => {
        if (onDragOverHandler !== undefined) onDragOverHandler(idx);
      }}
      onDragEnd={() => {
        if (onDragEndHandler !== undefined) onDragEndHandler();
      }}
    >
      {children}
    </div>
  );
};

export default Item;
