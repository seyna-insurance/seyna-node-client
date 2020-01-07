# Seyna API client

## Installation

```
npm install @seyna/api-client
```

## Usage

```js
import { Seyna } from "@seyna/api-client";
// Or
const { Seyna } = require("@seyna/api-client");

const seyna = new Seyna({ apiKey, apiSecret });
```

### Portfolios

```js
// Iterate over available portfolios
for await (let portfolio of seyna.iterPortfolios()) {
}

// List available portfolios
let portfolioList: List<Portfolio> = await seyna.listPortfolios();

// Get portfolio information
let portfolio: Portfolio = await seyna.getPortfolio(portfolioId);
```

### Contracts

```js
// Iterate over contracts
for await (let contract of seyna.iterContracts(portfolioId)) {
}

// List contracts for a portfolio
let contractList: List<Contract> = await seyna.listContracts(portfolioId);

// Get contract information
let contract: Contract = await seyna.getContract(contractId);
```

### Receipts

```js
// Iterate over receipts
for await (let receipt of seyna.iterReceipts(portfolioId)) {
}

// List receipts for a portfolio
let contractList: List<Contract> = await seyna.listReceipts(portfolioId);

// Get receipt information
let receipt: Receipt = await seyna.getReceipt(receiptId);
```

### Claims

```js
// Iterate over claims
for await (let claim of seyna.iterClaims(portfolioId)) {
}

// List claims for a portfolio
let claimList: List<Claim> = await seyna.listClaims(portfolioId);

// Get claim information
let claim: Claim = await seyna.getClaim(claimId);
```

### Settlements

```js
// Iterate over settlements
for await (let settlement of seyna.iterSettlements(portfolioId)) {
}

// List settlements for a portfolio
let settlementList: List<Settlement> = await seyna.listSettlements(portfolioId);

// Get settlement information
let settlement: Settlement = await seyna.getSettlement(settlementId);
```
