FROM denoland/deno

WORKDIR /app

COPY server.ts /app
RUN deno cache server.ts

ARG PORT
EXPOSE ${PORT:-8000}

CMD ["run", "--allow-net", "--allow-env", "server.ts"]