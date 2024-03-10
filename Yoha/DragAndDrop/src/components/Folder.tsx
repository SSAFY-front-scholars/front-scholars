import React, { useState, useRef, useEffect, ReactNode } from "react";
import "../css/Folder.css";

interface FolderProps {
  children: ReactNode[]; // 아이템들
  title: string; // 폴더 제목
  direction: number; // 폴더 리스팅 방향
}

const Folder: React.FC<FolderProps> = ({ children, title, direction }) => {
  const [dir, setDir] = useState(direction); // 폴더 리스팅 방향 저장
  const changeDirBtn = useRef<HTMLButtonElement>(null); // 폴더 리스팅 방향 변경 버튼
  const folderListingRef = useRef<HTMLDivElement>(null); // 폴더 리스팅 body

  useEffect(() => {
    if (dir === 0) {
      // 0 = 수직 방향
      folderListingRef.current?.style.setProperty("flex-direction", "column");
    } else {
      // 1 = 수평 방향
      folderListingRef.current?.style.setProperty("flex-direction", "row");
    }
  }, [dir]);

  return (
    <div className="folder_container">
      <div className="folder_top">
        <div className="folder_title">{title}</div>
        <button
          className="folder_direction_button"
          ref={changeDirBtn}
          onClick={() => {
            if (dir === 0) setDir(1);
            else setDir(0);
          }}
        >
          {dir === 0 ? "수평으로 변경" : "수직으로 변경"}
        </button>
      </div>
      <div className="folder_body" ref={folderListingRef}>
        {children.map((c: ReactNode, i: number) => {
          return <>{c}</>;
        })}
      </div>
    </div>
  );
};

export default Folder;
