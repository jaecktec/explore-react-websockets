import React, {useEffect, useState} from 'react';
import './message-log.css'
import {useWebsocket} from "../websocket/web-socket-context";

export const MessageLog: React.FC<any> = (): React.ReactElement => {
    const {recentMessage} = useWebsocket()
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        setMessages((messages) => {
            const newVar = [recentMessage?.data, ...messages];
            newVar.length = Math.min(15, newVar.length);
            return newVar;
        })
    }, [recentMessage])

    return (<div className="message-log">
        {
            messages.map((value, index) => {
                    return (

                        <p key={`message_${index}`}>{value}</p>
                    );
                }
            )
        }
    </div>)
}
