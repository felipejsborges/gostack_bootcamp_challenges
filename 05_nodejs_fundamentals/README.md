<div align="center">
	<a href="https://rocketseat.com.br/gostack" target="_blank">
		<img src="../.github/gostackimg.png" alt="Logo" style="max-width:80%"/>
	</a>
</div>

<div align="center">
	<h1>Node.js Fundamentals</h1>
</div>

### Summary

- [About the challenge](#about-the-challenge)

- [Routes](#Routes)

- [Tests](#Tests)

- [Back to all challenges](https://github.com/felipejsborges/gostack_bootcamp_challenges)
<hr>

### About the challenge

- An application to add, store and list income and outcome financial transactions.
<hr>

### Routes

- **`POST /transactions`**: The route must receives title, value and type (income or outcome) on request body.

- **`GET /transactions`**: The route must return a list with all stored transactions and the income, outcome and total balance.
<hr>

### Tests

- **`should be able to create a new transaction`**: In order for this test to pass, your application must allow a transaction to be created, and return a JSON with it.

- **`should be able to list the transactions`**: In order for this test to pass, your application must return an array with all the transactions that have been created, the income, outcome and total balance.

- **`should not be able to create an outcome transaction without a valid balance`**: In order for this test to pass, your application must not allow a outcome transaction with value bigger than user balance, returning a error with status 400.

<div align="center" style="margin-top: 16px;">	
	<img src="./.github/tests.png" alt="tests" style="max-width:80%"/>
</div>
<hr>

by Felipe Borges<br>
[LinkedIn](https://www.linkedin.com/in/felipejsborges) | [GitHub](https://github.com/felipejsborges)
