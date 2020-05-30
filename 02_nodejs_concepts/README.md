<div align="center">
	<a href="https://rocketseat.com.br/gostack" target="_blank">
		<img src="../.github/gostackimg.png" alt="Logo" style="max-width:80%"/>
	</a>
</div>

# Node.js Concepts

## Summary

[About the challenge](#About)

[Routes](#Routes)

[Tests](#Tests)

[Images](#Images)

[Back to all challenges](../)

### About the challenge
[Back to Summary](#Summary)

An application to storage repositories of a portfolio, that will allow you to list, update, and delete repositories, and besides that, the repositories can also receive likes.

### Routes
[Back to Summary](#Summary)

- **`POST /repositories`**: The route must receive `title`, `URL`, and `techs` inside of the request body. The URL must be the link to the Github of that repository. When registering a new project, it must be stored inside an object in the following format: `{id:" uuid ", title: 'Desafio Node.js', URL: 'http: //github.com / ...' , techs: ["Node.js", "..."], likes: 0} `; Make sure the ID is a UUID, and always start likes as 0.

- **`GET /repositories`**: The route that lists all repositories;

- **`PUT /repositories/:id`**: The route should only change the `title`, `URL` and `techs` of the repository that has the` id` equal to the `id` present in the route parameters;

- **`DELETE /repositories/:id`**: The route must delete a repository with the `id` present in the route parameters;

- **`POST /repositories/:id/like`**: The route must increase the number of likes from the specific repository chosen through the `id` param present in the route parameters, at each call of this route, the number of likes must be increased by 1;

### Tests
[Back to Summary](#Summary)

To test it, clone this repo, execute the command `yarn` in your terminal in order to install all the dependencies. Then execute `yarn test`.

- **`should be able to create a new repository`**: In order for this test to pass, your application must allow a repository to be created, and return a JSON with the created project.

- **`should be able to list the repositories`**: In order for this test to pass, your application must return an array with all the repositories that have been created so far.

- **`should be able to update repository`**: In order for this test to pass, your application must allow only the `url`,` title` and `techs` fields to be changed.

- **`should not be able to update a repository that does not exist`**: In order for this test to pass, you must validate in your update route whether the repository id sent by the URL exists or not. If not, return an error with status `400`.

- **`should not be able to update repository likes manually`**: In order for this test to pass, you must not allow your update route to directly change the likes of that repository, maintaining the same number of likes that the repository already had before the update. That's because the only place that should update this information is the route responsible for increasing the number of likes.

- **`should be able to delete the repository`**: In order for this test to pass, you must allow your delete route to delete a project, and when deleted, it must return an empty response, with status `204`.

- **`should not be able to delete a repository that does not exist`**: In order for this test to pass, you must validate in your delete route whether the repository id sent by the URL exists or not. If not, return an error with status `400`.

- **`should be able to give a like to the repository`**: In order for this test to pass, your application must allow a repository with the given id to receive likes. The value of likes must be increased by 1 for each request, and as the result, return a JSON containing the repository with the number of likes updated.

- **`should not be able to like a repository that does not exist`**: In order for this test to pass, you must validate in your like route whether the repository id sent by the URL exists or not. If not, return an error with status `400`.

### Images
[Back to Summary](#Summary)

<img src="/.github/tests.png" alt="Tests" style="max-width:80%"/>

[Back to all challenges](../)

by Felipe Borges<br>
[LinkedIn](https://www.linkedin.com/in/felipejsborges) | [GitHub](https://github.com/felipejsborges)