import { serveFile } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  if (req.headers.get("upgrade") !== "websocket") {

    return serveFile(req, "./sprout.html");
    //return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", () => {
    console.log("A client just connected!");
  });
  socket.addEventListener("message", (event) => {
    //if (event.data === "hey") {
      socket.send(event.data);
   // }
  });
  socket.addEventListener("close", () => {
    console.log("Disconnected!");
  });
  return response;
});