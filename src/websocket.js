import Sockette from 'sockette';

// import { WS_URL } from './../config.json';
import { WS_URL as WS_URL_IOS, WS_URL_ANDROID } from './../config.json';
import { Platform } from 'react-native';
const WS_URL = Platform.OS === 'ios' ? WS_URL_IOS : WS_URL_ANDROID;

let WSService = null;

class WebSocketService {
  constructor() {
    this.websocket = null;
    this.messageListeners = [];
    this.isOpen = false;
    this.onOpenFn = () => {};
  }

  /**
   *  Set up WebSocket connection for a new user and
   *  basic listeners to handle events
   */
  initSocket = () => {
    this.websocket = new Sockette(WS_URL, {
      timeout: 5e3,
      maxAttempts: 3,
      onopen: this.onConnOpen,
      onmessage: this.onMessage,
      onclose: this.onConnClose,
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onerror: e => console.log('Error:', e),
    });
  };

  /**
   *  Show connection status to us in the log
   */
  onConnOpen = e => {
    this.isOpen = true;
    this.onOpenFn();
    console.log('Connected!', e);
  };

  onOpen = fn => {
    this.onOpenFn = fn;
  };

  /**
   *  Log lost connection for now
   */
  onConnClose = e => {
    console.log('Connection closed!', e);
  };

  /**
   *  Used by application to send message to the WebSocket API Gateway
   *  @param routeKey The route key for WebSocket API Gateway
   *  @param message Object
   *  message {
   *    type,
   *    msg,
   *    other data
   *  }
   */
  sendMessage = (routeKey, message) => {
    if (this.websocket && this.isOpen) {
      this.websocket.send(
        JSON.stringify({
          action: routeKey,
          message: message,
        }),
      );
    } else {
      console.log('Websocket connection not found!!');
    }
  };

  close = () => {
    this.websocket.close();
    WSService = null;
  };

  /**
   *  Used by application to register different listeners for
   *  different message types
   *  @param type Message type ['updatePlayers', 'finishGame', 'userList', 'useradd']
   *  @param listener Function to handle message type
   */
  addMessageListener = (type, listener) => {
    if (!type || typeof listener !== 'function') {
      return;
    }

    const id = Symbol('id');
    this.messageListeners.push({
      [id]: true,
      type,
      listener,
    });

    return id;
  };

  /*
   *  Remove messageListener by id
   *  id: Symbol()
   */
  removeMessageListener = id => {
    this.messageListeners = this.messageListeners.filter(
      listener => !listener[id],
    );
  };

  /**
   * Handler that receives the actual messages from the WebSocket API
   * @param data Message body received from WebSocket
   */
  onMessage = data => {
    if (data) {
      try {
        const message = JSON.parse(data.data);
        const typeListeners = this.messageListeners.filter(
          listener => listener.type === message.type,
        );

        typeListeners.forEach(typeListener => {
          if (typeListener && typeof typeListener.listener === 'function') {
            typeListener.listener(message);
          } else {
            console.log('No handler found for message type');
          }
        });
      } catch (e) {
        console.warn('Error in onMessage:', e);
        console.warn('Error in onMessage data:', data);
      }
    }
  };

  static initWSService() {
    if (!WSService) {
      WSService = new WebSocketService();
      WSService.initSocket();
      return WSService;
    }

    return WSService;
  }
}

export const getWSService = WebSocketService.initWSService;
