# Dev image only. The repo is bind-mounted at /app (compose.yaml), so nothing
# is copied in. Pin: docs/rfc/active/2026-09-28-dev-stack.md, Decision 3.
FROM node:24-alpine@sha256:44fce696f38ba8c987c4db89954051000bbd05ffd8d8659ba15ed4a8602e937f

# The named node_modules volume inherits this directory's mode on first use.
# World-writable because the run user is the host's UID (compose.yaml),
# which is unknown when the image is built.
RUN mkdir -p /app/node_modules && chmod 0777 /app/node_modules

# A host UID other than 1000 has no home in the image; npm's cache goes here.
ENV HOME=/tmp
WORKDIR /app
