// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// export default function socketConection({username}) {
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         const newSocket = io('http://127.0.0.1:8000', {
//         path: '/sockets',
//         auth: { username: username },
//         });

//         setSocket(newSocket);

//         return () => {
//         newSocket.disconnect();
//         };
//     }, [username]);

//   return socket;
// }