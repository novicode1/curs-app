import { WS_URL } from './../config.json';

export default class Websockets {

    timeout = 250; // Initial timeout duration as a class variable

    state = { isMessageSent: false, socketResponse: '' };

    componentDidMount() {
			/* eslint-disable */
			this.state = { isMessageSent: false, socketResponse: "", receiverMessage: "" };
			receiver.registerReceiver(this.onReceiverMessage, true);
			this.connect();
    }

    //This is an example of client-receiver communication in Chromecast
    //Host app will send the game id through this channel
    //Then receiver will connect to the WebSocket to receive game updates (questions to display, player updates, etc.)
    //When game is finished host will send the message through the same channel to stop receiver showing game
    //When another non-host player is connecting to receiver we will send game-id back for player app to know which game to connect to.
    onReceiverMessage = (customEvent) => {
        console.log(`Recieved from Chromecast`, customEvent);
        this.setState({ receiverMessage: customEvent.data.message })
    }

    connect = () => {
        var ws = new WebSocket(WS_URL);
        let that = this; // cache the this
        var connectInterval;
        var gameLoop;

        ws.onmessage = evt => {
					// listen to data sent from the websocket server
					this.setState({ socketResponse: evt.data })
					console.log(`Recieved from socket`, evt);
        }

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws, socketResponse: `Connected!` });

            that.timeout = 250; // reset timer to 250 on open of websocket connection
            //gameLoop = setInterval(this.gameLoopFunc, 60000);
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            this.setState({ socketResponse: `Reconnecting...` })

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            clearInterval(gameLoop);
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    //This is an example of WebSocket communication between Receiver app on Chromecast and AWS Websocket server.
    //In example the receiver is initiating the messages itself
    //In reality the messages would be initiated by the user apps by submitting answers to the API
    //Then API would retrieve all WebSocket connections from the MondoDB and broadcast the updates to them which will include Receiver app WebSocket connection
    //See: https://forums.aws.amazon.com/thread.jspa?messageID=909331
    gameLoopFunc = () => {
        var msg = new Date().toUTCString();
        const { ws } = this.state;
        if (ws && ws.readyState !== WebSocket.CLOSED) {
            console.log('Sending msg to websocket...', msg);
            ws.send(msg);
        }
    }

    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

}
