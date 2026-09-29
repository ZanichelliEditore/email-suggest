.PHONY: help install lint format format-check test quality rfc-sync improvement

help: ## Show available targets
	@grep -E '^[a-zA-Z0-9_.-]+:.*## ' $(MAKEFILE_LIST) | sed -E 's/:.*## /  /'

install: ## set up git hooks (once)
	pre-commit install

lint: biome ## run linters
	ruff check tools/

format: deps ## auto-format
	ruff format tools/
	$(BIOME) check --write --linter-enabled=false

format-check: deps ## check formatting (read-only)
	ruff format --check tools/
	$(BIOME) format

test: ## run tests
	python3 -m unittest discover -s tools/checks

quality: lint format-check test ## full local gate

rfc-sync: ## move RFCs into the folder matching their Status
	python3 tools/checks/sync_rfc_status.py

# TEXT reaches the shell unexpanded, as a variable: nothing in it runs.
improvement: export override TEXT := $(value TEXT)
improvement: ## append a commit+date-stamped idea to docs/improvements.md (make improvement TEXT="<idea>")
	sha=$$(git rev-parse --short HEAD 2>/dev/null); printf -- '- [%s%s] %s\n' "$${sha:+$$sha · }" "$$(date +%F)" "$$TEXT" >> docs/improvements.md

.PHONY: gitleaks

# `quality` runs it too: make merges this line into the `quality:` rule.
quality: gitleaks

gitleaks: ## secret scan of the staged diff and of every commit, at the gitleaks pinned in .pre-commit-config.yaml
	pre-commit run gitleaks --all-files
	pre-commit run gitleaks-history --hook-stage manual

.PHONY: shell

# The dev container runs as the host user (compose.yaml).
export HOST_UID := $(shell id -u)
export HOST_GID := $(shell id -g)

shell: ## open a shell in the dev container
	docker compose run --rm dev

.PHONY: deps biome

DEV := docker compose run --rm -T dev
# The installed binary, not `npx biome`: with Biome missing from node_modules,
# npx would fetch npm's unrelated `biome` package and run that instead.
BIOME := $(DEV) node_modules/.bin/biome

# node_modules lives in a named volume the host cannot see, so the check runs
# in the container: `npm ci` only when package.json or the lockfile differ from
# the copy stamped at the last install. The Dockerfile and .npmrc are in the
# stamp too: a new image or npm setting reinstalls.
DEPS_INPUTS := package.json package-lock.json .npmrc Dockerfile
deps: ## install node_modules in the dev container when package.json, the lockfile, .npmrc or the Dockerfile changed
	$(DEV) sh -c 'cat $(DEPS_INPUTS) | cmp -s - node_modules/.deps-stamp || { npm ci && cat $(DEPS_INPUTS) > node_modules/.deps-stamp; }'

# --error-on-warnings: Biome exits 0 on warnings, and some recommended rules
# (noUnusedImports) default to warn.
biome: deps ## Biome's read-only check: lint, format, import order (the pre-commit hook runs this)
	$(BIOME) check --error-on-warnings
