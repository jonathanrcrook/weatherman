import axios from "axios";

import store from "../store";

import {
	  formatWeatherData
	, buildUrl
} from "../utils/weatherUtils";

import { setWeather } from "../ducks/weather";

// Requesting to get data and asking a promise to return our requested data
export function getWeather( location ) {
	const weatherPromise = axios.get( buildUrl(location) )
	.then(response => {
		console.log(response);

		const formattedData = formatWeatherData(response.data);
		console.log(formattedData);

		return formattedData;
	});

	store.dispatch( setWeather( weatherPromise ) );
}
