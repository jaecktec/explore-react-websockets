import React from 'react';
import './App.css';
import {ConnectionIndicator} from "./components/connection-indicator";
import {WebSocketContextProvider} from "./websocket/web-socket-context-provider";
import {MessageLog} from "./components/message-log";

function App() {
    return (
        <WebSocketContextProvider>
            <div className="App">
                <header className="App-header">
                    <ConnectionIndicator/>
                </header>
                <div>
                    <MessageLog />
                </div>
            </div>
        </WebSocketContextProvider>
    );
}

export default App;
