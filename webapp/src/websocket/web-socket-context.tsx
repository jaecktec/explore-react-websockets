import React from "react";

const WebSocketContext: React.Context<any> = React.createContext<any | null>(null);
const useWebsocket = (): Readonly<WebSocketContextState> => React.useContext(WebSocketContext);

export interface WebSocketContextState {
    connected: boolean,
    recentMessage?: MessageEvent | null
}

export {
    WebSocketContext,
    useWebsocket
}
