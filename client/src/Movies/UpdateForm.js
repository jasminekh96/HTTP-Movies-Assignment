import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const initialMovie = {
	title     : '',
	director  : '',
	metascore : '',
	stars     : '',
};
const UpdateForm = (props) => {
	const [ movies, setMovies ] = useState(initialMovie);
	const changeHandler = (e) => {
		setMovies({
			...movies,
			[e.target.name]: e.target.value,
		});
	};
	// const changeHandler = (e) => {
	// 	e.persist();
	// 	let value = e.target.value;
	// 	if (e.target.name === 'title') {
	// 		value = parseInt(value);
	// 	}
	// 	setMovies({
	// 		...movies,
	// 		[e.target.name]: value,
	// 	});
	// };
	useEffect(
		() => {
			Axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
				.then((res) => setMovies(res.data))
				.catch((err) => console.log(err.res));
			// if (props.movie.length > 0) {
			// 	const newMovie = props.movie.find((thing) => `${thing.id}` === props.match.params.id);
			// 	setMovies(newMovie);
		},
		[ props.match.params.id ],
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.put(`http://localhost:5000/api/movies${props.match.params.id}`, movies)
			.then((res) => {
				// props.updateMovies(res.data);
				props.history.push('/');
			})
			.catch((err) => console.log(err));
	};

	// if (props.movie.length === 0) {
	// 	return <h2>Loading data ...</h2>;
	// }
	return (
		<div>
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<input type='text' name='title' onChange={changeHandler} placeholder='Title' value={movies.title} />
				<input type='text' name='director' onChange={changeHandler} placeholder='Director' value={movies.director} />
				<input
					type='number'
					name='metascore'
					onChange={changeHandler}
					placeholder='Metascore'
					value={movies.metascore}
				/>
				<input type='text' name='stars' onChange={changeHandler} placeholder='Stars' value={movies.stars} />
				<button>Update Movie</button>
			</form>
		</div>
	);
};

export default UpdateForm;
