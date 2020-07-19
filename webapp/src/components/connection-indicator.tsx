import React from 'react';
import {useWebsocket} from "../websocket/web-socket-context";

export const ConnectionIndicator: React.FC<any> = (): React.ReactElement => {
    const {connected} = useWebsocket()

    if(connected){
        return <span>connected</span>
    }else {
        return <span>disconnected</span>
    }
}
