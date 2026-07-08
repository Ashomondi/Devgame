# Devgame Makefile

.PHONY: all help install build-backend run-backend build-frontend run-frontend test clean docker-up docker-down

# Default target: show help
all: help

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development Targets:"
	@echo "  install          Install Go dependencies and Frontend npm dependencies"
	@echo "  run-backend      Start Go backend dev server"
	@echo "  run-frontend     Start Frontend Vite dev server"
	@echo ""
	@echo "Build Targets:"
	@echo "  build-backend    Build Go backend server binary to bin/server"
	@echo "  build-frontend   Build Frontend static files using Vite"
	@echo ""
	@echo "Testing & Utility Targets:"
	@echo "  test             Run Go tests"
	@echo "  clean            Remove Go binaries and build artifacts"
	@echo ""
	@echo "Docker Targets:"
	@echo "  docker-up        Start all services using docker-compose"
	@echo "  docker-down      Stop and clean docker-compose services"

install:
	@echo "Installing Go dependencies..."
	go mod tidy
	@echo "Installing Frontend dependencies..."
	npm install --prefix frontend

build-backend:
	@echo "Building backend server..."
	mkdir -p bin
	go build -o bin/server ./backend/cmd/server/main.go

run-backend:
	@echo "Starting backend server..."
	go run ./backend/cmd/server/main.go

build-frontend:
	@echo "Building frontend static assets..."
	npm run build --prefix frontend

run-frontend:
	@echo "Starting frontend dev server..."
	npm run dev --prefix frontend

test:
	@echo "Running backend tests..."
	go test -v ./backend/...

clean:
	@echo "Cleaning build artifacts..."
	rm -rf bin/

docker-up:
	@echo "Starting Docker containers..."
	docker-compose up --build

docker-down:
	@echo "Stopping Docker containers..."
	docker-compose down
