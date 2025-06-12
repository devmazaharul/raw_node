const EventEmitter = require('events');

class OrderProcessor extends EventEmitter {
    constructor() {
        super();
        console.log("OrderProcessor initialized.");
    }

    processOrder(orderId, item, quantity) {
        console.log(`Processing Order ID: ${orderId} for ${quantity} x ${item}`);
        this.emit('orderReceived', orderId, item, quantity);

        setTimeout(() => {
            if (Math.random() > 0.1) {
                this.emit('orderCompleted', orderId, Date.now());
            } else {
                this.emit('orderFailed', orderId, new Error('Payment gateway error.'));
            }
        }, 1000);
    }

    logFirstOrder(orderId, item, quantity) {
        console.log(`*** Initial Log: New order received: ${orderId} - ${item} (${quantity})`);
    }
}

const processor = new OrderProcessor();

processor.on('orderReceived', (orderId, item, quantity) => {
    console.log(`-> (L1) Event: Order ${orderId} received: ${item} (x${quantity})`);
});

processor.on('orderReceived', (orderId) => {
    console.log(`-> (L2) Event: Updating status for order ${orderId} on dashboard...`);
});

processor.on('orderCompleted', (orderId, timestamp) => {
    console.log(`-> (L3) Event: Order ${orderId} successfully completed! Time: ${new Date(timestamp).toLocaleTimeString()}`);
    console.log(`   Generating invoice for ${orderId}.`);
});

processor.on('orderFailed', (orderId, error) => {
    console.error(`-> (L4) Event: Order ${orderId} failed! Reason: ${error.message}`);
    console.error(`   Logging failure and sending email to user.`);
});

processor.on('error', (err) => {
    console.error(`❌ Global error from EventEmitter: ${err.message}`);
});

processor.once('orderReceived', (orderId, item, quantity) => {
    console.log(`-> (L5 - Once) This is for the first order: ${orderId}, ${item}, ${quantity}`);
    processor.logFirstOrder(orderId, item, quantity);
});

const temporaryListener = (msg) => {
    console.log(`This is a temporary message: ${msg}`);
};
processor.on('tempMessage', temporaryListener);
processor.emit('tempMessage', 'First temporary message');

processor.removeListener('tempMessage', temporaryListener);
processor.emit('tempMessage', 'Second temporary message');

processor.processOrder('ORD001', 'Laptop', 1);
processor.processOrder('ORD002', 'Mouse', 2);
processor.processOrder('ORD003', 'Keyboard', 1);
