# Dev image only. The repo is bind-mounted at /app (compose.yaml), so nothing
# is copied in. Pin: docs/rfc/active/2026-09-28-dev-stack.md, Decision 3.
FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1

# The named node_modules volume inherits this directory's mode on first use.
# World-writable because the run user is the host's UID (compose.yaml),
# which is unknown when the image is built.
RUN mkdir -p /app/node_modules && chmod 0777 /app/node_modules

# A host UID other than 1000 has no home in the image; npm's cache goes here.
ENV HOME=/tmp
WORKDIR /app
