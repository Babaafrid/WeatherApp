import axios from "axios";

export default {
  state: {
    weather: {},
  },
  getters: {
    getWeather: (state) => {
      return state.weather;
    },
  },
  mutations: {
    setWeather(state, value) {
      state.weather = value;
    },
  },
  actions: {
    GET_WEATHER: async ({ commit }) => {
      const response = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json?key=" +
          "b30baba695d04eed82692742230802" +
          "&q=" +
          localStorage.getItem("query") +
          "&days=7&aqi=no&alerts=no"
      );
      console.log(response.data);
      commit("setWeather", response.data);
    },
  },
};
