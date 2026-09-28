.PHONY: help install lint format format-check test quality rfc-sync improvement

help: ## Show available targets
	@grep -E '^[a-zA-Z0-9_.-]+:.*## ' $(MAKEFILE_LIST) | sed -E 's/:.*## /  /'

install: ## set up git hooks (once)
	pre-commit install

lint: ## run linters
	ruff check tools/

format: ## auto-format
	ruff format tools/

format-check: ## check formatting (read-only)
	ruff format --check tools/

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
