export default function Message({ message }) {
    if (message.type === 'join') return <p>{`${message.username} joined the chat`}</p>
    if (message.type == 'leave') return <p>{`${message.username} leave the chat`}</p>
    if (message.type === 'chat') return <p>{`${message.username}: ${message.message}`}</p>
}