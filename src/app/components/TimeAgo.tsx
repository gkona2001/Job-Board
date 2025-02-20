import ReactTimeago from "react-timeago"

export function TimeAgo({createdAt}:{createdAt:string}) {
    return (
        <div>
            <ReactTimeago date={createdAt}/>
        </div>
    )
}