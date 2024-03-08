/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from "react";



const DragAndDrop = () => {
    const arr = [
        {
            id: 1,
            emoji: "🐋"
        },
        // {
        //     id: 2,
        //     emoji: "🐬"
        // },
        // {
        //     id: 3,
        //     emoji: "🐳"
        // },
        // {
        //     id: 4,
        //     emoji: "🐟"
        // },
        // {
        //     id: 5,
        //     emoji: "🦐"
        // }
    ];

    const draggingItemId = useRef(null);
    const draggingOverItemId = useRef(null);

    const onDragStart = (e) => { 
        // draggingItemId.current = e.target
        // e.target.classList.add('grabbing');
        console.log("드래그 시작");
    }

    const onDragEnter = (e) => {
        console.log("드래그 엔터");
    }

    const onDragOver = (e) => { 
        e.preventDefault();
        console.log("드래그 오버" + e.target.className);
    }

    const onDragEnd = (e) => { 
        console.log("드래그 종료");
        e.target.classList.remove('grabbing');
    }
    return (        
        <div css={ mainCss }>
            <Container id={1} onDragOver={onDragOver} onDragEnter={onDragEnter}>
                {
                arr.map((itemInfo, idx) => (
                    <Item item={itemInfo} key={itemInfo.id} onDragStart={onDragStart} onDragEnd={onDragEnd} />
                ))
                }
            </Container>
            <Container id={2}>
            </Container>
        </div>
    )
}

const Container = (props) => { 
    return (
        <div className={`container-${props.id}`} css={containerCss} onDragEnter={props.onDragEnter()} onDragOver={props.onDragOver()}>
            { props.children }
        </div>
    )
}

const Item = ({item, onDragStart, onDragEnd}) => { 
    return (
        <button className="draggable" css={itemCss.blue} draggable="true"
            // onDragStart={(e) => onDragStart(e)}
        >
            {item.emoji}
        </button>
    )
}

// ---------------css
const mainCss = css`
    display: flex;
    flex-direction: row;
    gap: 30px;
`
const containerCss = css`
        background-color: gray;
        border-radius: 1rem;
        width: 100px;
        height: 100px;
        `

const itemCss = {
    blue: css({
        color: 'white',
        borderRadius: '1rem',
        backgroundColor: 'blue',
        width: '50px',
        height: '50px',
        textAlign: 'center',
    }),
    red: css({
        
        backgroundColor: 'red',
        borderRadius: '1rem',
        width: '50px',
        height: '50px',
        textAlign: 'center',
    }),

}

export default DragAndDrop;


// 뭐부터할까?!