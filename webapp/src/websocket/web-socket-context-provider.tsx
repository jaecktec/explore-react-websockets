import React, {ReactElement} from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import {WebSocketContext, WebSocketContextState} from "./web-socket-context";

interface WebSocketContextProviderParams {
    children: ReactElement
}

class WebSocketContextProvider extends React.Component<WebSocketContextProviderParams> {

    state: WebSocketContextState = {
        connected: false,
        recentMessage: null
    }

    ws = null;

    componentDidMount() {
        const wsUrl = "ws://localhost:8081/ws"
        const ws = new ReconnectingWebSocket(wsUrl)
        ws.onopen = (e) => {
            this.setState({
                ...this.state,
                connected: true
            })
        };

        ws.onmessage = (m) => {
            this.setState({
                ...this.state,
                recentMessage: m
            })
        };

        ws.onclose = (m) => {
            this.setState({
                ...this.state,
                connected: false
            });
        };
    }

    render() {
        return (
            <WebSocketContext.Provider value={{
                ...this.state
            }}>
                {this.props.children}
            </WebSocketContext.Provider>
        );
    }
}

export {WebSocketContextProvider};
