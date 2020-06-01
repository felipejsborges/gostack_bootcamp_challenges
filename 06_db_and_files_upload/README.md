<div align="center">
	<a href="https://rocketseat.com.br/gostack" target="_blank">
		<img src="../.github/gostackimg.png" alt="Logo" style="max-width:80%"/>
	</a>
</div>

<div align="center">
	<h1>Database and files upload</h1>
</div>

### Summary

- [About the challenge](#about-the-challenge)

- [Routes](#Routes)

- [Tests](#Tests)

- [Back to all challenges](https://github.com/felipejsborges/gostack_bootcamp_challenges#gostack-bootcamp-challenges-)
<hr>

### About the challenge

- An application to store in a database income and outcome financial transactions, add new ones, and list all of them. And create transactions from a .csv file.
<hr>

### Routes

- **`POST /transactions`**: The route must receive title, value and type (income or outcome) on request body. The transaction must be stored inside our database.

- **`GET /transactions`**: The route must return a list with all stored transactions and the income, outcome and total balance.

- **`DELETE /transactions/:id`**: The route must delete a transaction with the id in the params.

- **`POST /transactions/import`**: The route must allow to import a .csv file with the same information that need to create a new transaction. Each line of this file must be a new register to de database.

### Tests
To run tests in this challenge, you must create a database called "gostack_desafio06_tests".

- **`should be able to create a new transaction`**

- **`should be able to list the transactions`**

- **`should not be able to create an outcome transaction without a valid balance`**

- **`should create tags when inserting new transactions`**

- **`should not create tags when they already exists`**

- **`should be able to delete a transaction`**

- **`should be able to import transactions`**

<div align="center" style="margin-top: 16px;">	
	<img src="./.github/tests.png" alt="tests" style="max-width:80%"/>
</div>
<hr>

by Felipe Borges<br>
[LinkedIn](https://www.linkedin.com/in/felipejsborges) | [GitHub](https://github.com/felipejsborges)
