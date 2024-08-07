import { MutableRefObject } from "react";
import { ReadyState } from "./constants";
export interface QueryParams {
    [key: string]: string | number;
}
export interface Options {
    fromSocketIO?: boolean;
    queryParams?: QueryParams;
    protocols?: string | string[];
    share?: boolean;
    onOpen?: (event: WebSocketEventMap["open"]) => void;
    onClose?: (event: WebSocketEventMap["close"]) => void;
    onMessage?: (event: WebSocketEventMap["message"]) => void;
    onError?: (event: WebSocketEventMap["error"]) => void;
    onReconnectStop?: (numAttempts: number) => void;
    shouldReconnect?: (event: WebSocketEventMap["close"]) => boolean;
    reconnectInterval?: number | ((lastAttemptNumber: number) => number);
    reconnectAttempts?: number;
    filter?: (message: WebSocketEventMap["message"]) => boolean;
    retryOnError?: boolean;
    eventSourceOptions?: EventSourceOnly;
    skipAssert?: boolean;
    heartbeat?: boolean | HeartbeatOptions;
    lastMessageStore?: [
        WebSocketEventMap["message"] | null,
        (message: WebSocketEventMap["message"] | null) => void
    ];
}
export declare type EventSourceOnly = Omit<Options, "eventSourceOptions"> & EventSourceInit;
export declare type HeartbeatOptions = {
    message?: "ping" | "pong" | string | (() => string);
    returnMessage?: "ping" | "pong" | string;
    timeout?: number;
    interval?: number;
};
export interface EventSourceEventHandlers {
    [eventName: string]: (message: EventSourceEventMap["message"]) => void;
}
export interface EventSourceOptions extends EventSourceOnly {
    events?: EventSourceEventHandlers;
}
export declare type ReadyStateState = {
    [url: string]: ReadyState;
};
export declare type WebSocketMessage = string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView;
export declare type SendMessage = (message: WebSocketMessage, keep?: boolean) => void;
export declare type SendJsonMessage = <T = unknown>(jsonMessage: T, keep?: boolean) => void;
export declare type Subscriber<T = WebSocketEventMap["message"]> = {
    setLastMessage: (message: T) => void;
    setReadyState: (readyState: ReadyState) => void;
    optionsRef: MutableRefObject<Options>;
    reconnectCount: MutableRefObject<number>;
    reconnect: MutableRefObject<() => void>;
};
export declare type WebSocketHook<T = unknown, P = WebSocketEventMap["message"] | null> = {
    sendMessage: SendMessage;
    sendJsonMessage: SendJsonMessage;
    lastMessage: P;
    lastJsonMessage: T;
    readyState: ReadyState;
    getWebSocket: () => WebSocketLike | null;
};
export declare type EventSourceHook = Omit<WebSocketHook<EventSourceEventMap["message"]>, "sendMessage" | "sendJsonMessage" | "lastMessage" | "lastJsonMessage" | "getWebSocket"> & {
    lastEvent: EventSourceEventMap["message"] | null;
    getEventSource: () => WebSocketLike | null;
};
export declare type WebSocketLike = WebSocket | EventSource;
