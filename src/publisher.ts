import { connect } from "amqplib";

const run = async () => {
    try {
        const connection = await connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertExchange('test', 'topic', { durable: true });
        channel.publish('test', 'my.command', Buffer.from('Сообщение!'));
        console.log('Сообщение отправлено!');
    } catch (e) {
        console.error(e);
    }
}

run();