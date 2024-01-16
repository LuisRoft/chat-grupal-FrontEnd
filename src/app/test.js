// // Importar react y los hooks necesarios
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// export default function Chat()  {
//     const [inputValue, setInputValue] = useState('world');
//     const [outputValue, setOutputValue] = useState('');
//     const [socket, setSocket] = useState(null);

//     // Conectar al socket cuando el componente se monta
//     useEffect(() => {
//         const newSocket = io('http://127.0.0.1:8000/');
//         setSocket(newSocket);

//         // Manejar la desconexión del socket al desmontar el componente
//         return () => {
//         newSocket.disconnect();
//         };
//     }, []);

//     // Manejar cambios en el valor de entrada
//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     // Emitir un mensaje al servidor
//     const handleEmit = () => {
//         if (socket) {
//         socket.emit('message', inputValue);
//         }
//     };

//     // Manejar eventos de respuesta del servidor
//     useEffect(() => {
//         if (socket) {
//         const handleResponse = (data) => {
//             setOutputValue((prevValue) => `${prevValue}\n${inputValue}->${data}`);
//         };

//         socket.on('response', handleResponse);

//         // Limpiar el oyente al desmontar el componente
//         return () => {
//             socket.off('response', handleResponse);
//         };
//         }
//     }, [socket, inputValue]);
//     return (
//         <div>
//             <input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//             />
//             <button type="button" onClick={handleEmit}>
//             Emit
//             </button>
//             <br />
//             <textarea
//             style={{ width: '300px', height: '300px' }}
//             value={outputValue}
//             readOnly
//             ></textarea>
//         </div>
//     )
// }

