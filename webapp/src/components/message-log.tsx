import React, {RefObject, useEffect, useState} from 'react';
import './message-log.css'
import {useWebsocket} from "../websocket/web-socket-context";

export const MessageLog: React.FC<any> = (): React.ReactElement => {
    const {recentMessage} = useWebsocket()
    const [messages, setMessages] = useState<string[]>([])
    const listRootRef = React.createRef();
    let bottomElem: RefObject<any>;

    useEffect(() => {
        setMessages((messages) => {
            const newVar = [recentMessage?.data, ...messages];
            newVar.length = Math.min(15, newVar.length);
            return newVar;
        })
        if(bottomElem && bottomElem.current) bottomElem.current.scrollIntoView();
    }, [recentMessage])

    return (<div className="message-log">
        {
            messages.map((value, index) => {
                    bottomElem = React.createRef();
                    return (

                        <p key={`message_${index}`}>{value}</p>
                    );
                }
            )
        }
    </div>)
}
