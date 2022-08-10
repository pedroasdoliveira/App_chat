import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";

function App() {
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [connectedUsers, setConnectedUsers] = useState(
    [] as { id: string; username: string }[]
  );

  const socketClient = useRef<SocketIOClient.Socket>();

  useEffect(() => {
    socketClient.current = io.connect("http://localhost:5000");

    if (socketClient.current) {
      socketClient.current.on("username-taken", () => {
        toast.error("Username is taken!");
      });

      socketClient.current.on("username-submitted-successfully", () => {
        setConnected(true);
      });

      socketClient.current.on(
        "get-connected-users",
        (ConnectedUsers: { id: string; username: string }[]) => {
          setConnectedUsers(
            ConnectedUsers.filter((user) => user.username !== username)
          );
          console.log(ConnectedUsers);
        }
      );
    }
  }, []);

  const handleConnection = () => {
    if (socketClient.current) {
      socketClient.current.emit("handle-connection", username);
    }
  };

  return (
    <div className="app">
      {!connected && (
        <form
          className="enter-username-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleConnection();
          }}
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
            required={true}
          />

          <button type="submit">Submit</button>
        </form>
      )}

      {connected && (
        <div>
          <h2>Connected</h2>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
