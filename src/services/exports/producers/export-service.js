import amqp from 'amqplib';
import process from 'process';

const ExportService = {
    sendMessage: async (queue, message) => {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, {
            durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(message));

        setTimeout(async () => {
            await connection.close();
        }, 1000);
    }
}

export default ExportService;