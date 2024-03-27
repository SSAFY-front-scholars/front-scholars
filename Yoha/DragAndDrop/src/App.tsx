import React, { RefObject, useEffect, useRef, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import Item from "./components/Item";
import useDnd from "./utils/useDnd";

function App() {
  //------------------------------------------------------------------------------- ver.2
  const refs = useRef<HTMLDivElement[]>([]);
  return <div className="w- bg-black h-100">hello</div>;

  //------------------------------------------------------------------------------- ver.1
  /*const [itemList, setItemList] = useState<string[]>([
    // 리스트 item
    "1번 Item",
    "2번 Item",
    "3번 Item",
    "4번 Item",
    "5번 Item",
  ]);
  const [fromIdx, setFromIdx] = useState<number>(-1);

  // fromIdx 의 item 드래그 시작
  const onDragStartHandler = (idx: number): void => {
    console.log(`${idx} 번째 item drag 시작`);
    setFromIdx(idx);
  };

  // fromIdx 의 item 드래그 종료
  const onDragEndHandler = (): void => {
    console.log(`${fromIdx} 번째 item drag 종료`);
    setFromIdx(-1);
  };

  // toIdx 의 item 위로 fromIdx 의 item 이 진입
  const onDragOverHandler = (toIdx: number): void => {
    // 드래그 중인 item 이 없거나 from 이 to 와 같다면 무시
    if (fromIdx === null || fromIdx === toIdx) return;

    console.log(`${fromIdx} 번째 item ${toIdx} 위치로 이동`);

    const newList = [...itemList];
    const from = itemList[fromIdx];
    newList.splice(fromIdx, 1); // fromIdx 의 item 빼내기
    newList.splice(toIdx, 0, from); // toIdx 자리에 fromIdx 의 item 넣기

    setItemList(newList); // 새로운 리스트로 state 갱신
    setFromIdx(toIdx);
  };

  return (
    <div className="App">
      <h1>Yoha DND</h1>
      <Folder title="1번 폴더" direction={0}>
        {itemList.map((item, idx) => {
          return (
            <Item
              idx={idx}
              onDragStartHandler={onDragStartHandler}
              onDragOverHandler={onDragOverHandler}
              onDragEndHandler={onDragEndHandler}
            >
              {item}
            </Item>
          );
        })}
      </Folder>
    </div>
  );*/
}

export default App;
