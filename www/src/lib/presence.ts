export function startPresence() {
  const ws = new WebSocket(`/ws/presence`);
  ws.onmessage = () => {
    ws.send("pong");
  };
  console.log("presence started");
  return ws;
}
