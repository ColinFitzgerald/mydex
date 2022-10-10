.PHONY: test

install:
	@npm install

build:
	@npx hardhat compile

test:
	@npx hardhat test

run:
	@npx hardhat node

deploy:
	@npx hardhat run --network localhost scripts/deploy.js

console:
	@npx hardhat console --network localhost

clean:
	@rm -rf ./artifacts
	@rm -rf ./cache
	@rm -rf ./node_modules
