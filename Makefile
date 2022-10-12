.PHONY: test

install:
	@npm install

lint:
	@npm run solhint

format:
	@npm run prettier:solidity

build:
	@npx hardhat compile

test:
	@npx hardhat test

test-exchange:
	@npx hardhat test ./test/Exchange.js

test-token:
	@npx hardhat test ./test/Token.js

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
