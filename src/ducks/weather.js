const RESET = "RESET";
const SET_WEATHER = "SET_WEATHER";

const initialState = {
	error: false,
	loading: false,
	search: true,
	weather: {}
};

export default function weather( state = initialState, action ) {
	switch ( action.type ) {
		case SET_WEATHER + "_PENDING": // Waiting for promise to return data
			return {
				error: false, // Still waiting on promise so cannot fire an error
				loading: true, // Waiting on data so notify user of this
				search: false, // After user enters their search then search box is hidden
				weather: {} // Data will live here once data comes back
			};
		case SET_WEATHER + "_FULFILLED": // When promise is successfully completed
			return {
				error: false, // Only fires on successful completion
				loading: false, // Finished fetching data
				search: false, // App will be displaying actual data instead of search box
				weather: action.payload // Once promise is complete the middleware will return the promise with the data
			};
		case SET_WEATHER + "_REJECTED": // Something went wrong with promise and we have an error instead of data
			return {
				error: true,
				loading: false,
				search: false,
				weather: {}
			};
		case RESET: return initialState;
		default: return state;
	}
}

export function reset() {
	return { type: RESET };
}

export function setWeather(weatherPromise) {
	return {
		payload: weatherPromise,
		type: SET_WEATHER
	};
}
