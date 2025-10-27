import { connect } from "amqplib";

const run = async () => {
    try {
        const connection = await connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertExchange('test', 'topic', { durable: true });
        const queue = await channel.assertQueue('my-queue', { durable: true });
        await channel.bindQueue(queue.queue, 'test', 'my.command');

        console.log('Consumer запущен. Ожидание сообщений...');

        channel.consume(queue.queue, (msg) => {
            if (!msg) return;
            console.log('Получено сообщение:', msg.content.toString());

        });
    } catch (e) {
        console.error('Ошибка:', e);
    }
}

run();