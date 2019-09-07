all: build run rmi

build:
	docker-compose build client server

up:
	. ./.env && docker-compose up

run:
	. ./.env && docker-compose up -d

down:
	docker-compose down

rmi:
	docker image prune -f && docker volume prune -f