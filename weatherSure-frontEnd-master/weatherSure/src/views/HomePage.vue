<template>
  <div class="home-page">
    <div class="top-bar">
      <div class="brand-name">
        <p>WeatherSure</p>
      </div>
      <div class="search-bar">
        <input
          type="search"
          name="search-bar"
          class="s-box"
          placeholder="Search for Location"
          v-model="query"
          @keydown.enter="keyPressed"
        />
      </div>
    </div>
    <div class="mid-bar">
      <div class="date">
        {{ dateTimeManager() }}
        <div class="date-time">
          <p>{{ this.current_time }}</p>
        </div>
        <div class="date-day">
          <p>{{ this.current_day }} {{ this.current_date }}</p>
        </div>
      </div>
      <div class="temp">
        <div class="location">
          <p>{{ res.location.name }}, {{ res.location.region }}</p>
        </div>
        <div class="t">
          <div class="number">
            <h2 v-if="ref_temp">{{ res.current.temp_f }}º</h2>
            <h2 v-if="!ref_temp">{{ res.current.temp_c }}º</h2>
          </div>
          <div class="f-c">
            <p @click="getF" :class="{ active: ref_temp }">F</p>
            <p @click="getC" :class="{ active: !ref_temp }">C</p>
          </div>
        </div>
        <div class="type">
          <p>{{ res.current.condition.text }}</p>
        </div>
      </div>
      <div class="details">
        <p>
          Feels Like : {{ res.current.feelslike_f }}ºF <b>|</b>
          {{ res.current.feelslike_c }}ºC
        </p>
        <p>Humidity : {{ res.current.humidity }}%</p>
        <p>Cloud : {{ res.current.cloud }}%</p>
        <p>Wind Speed : {{ res.current.wind_mph }} mph</p>
        <p>Visibility : {{ res.current.vis_km }} km</p>
      </div>
    </div>
    <div class="week-title">
      <p>3-Day Forecast</p>
    </div>
    <week-card :res="res"></week-card>
    <div class="hour-title">
      <p>Hourly Forecast</p>
    </div>
    <hour-card :res="res"></hour-card>
  </div>
</template>

<script>
import HourCard from "@/components/HourCard.vue";
import WeekCard from "@/components/WeekCard.vue";
import axios from "axios";

export default {
  components: {
    HourCard,
    WeekCard,
  },

  data() {
    return {
      query: "",
      ref_temp: true,
      current_day: "",
      current_date: "",
      current_time: "",
      res: undefined,
    };
  },

  beforeCreate: function () {
    let initialLocation = "Mumbai";
    if (sessionStorage.getItem("query") === null) {
      sessionStorage.setItem("query", initialLocation);
    }
  },

  created: async function () {
    const response1 = await axios.get(
      "http://api.weatherapi.com/v1/forecast.json?key=" +
        "b30baba695d04eed82692742230802" +
        "&q=" +
        sessionStorage.getItem("query") +
        "&days=7&aqi=no&alerts=no"
    );
    console.log("Response 1: ", response1.data);
    this.res = response1.data;
    this.$root.$emit("change_bg", this.res);
  },

  methods: {
    async keyPressed() {
      let prevQuery = sessionStorage.getItem("query");
      let currentQuery = this.query;
      sessionStorage.setItem("query", currentQuery);
      console.log("Key was pressed with query: ", currentQuery);

      const response2 = await axios
        .get(
          "http://api.weatherapi.com/v1/forecast.json?key=" +
            "b30baba695d04eed82692742230802" +
            "&q=" +
            sessionStorage.getItem("query") +
            "&days=7&aqi=no&alerts=no"
        )
        .catch((errors) => {
          sessionStorage.setItem("query", prevQuery);
          alert(
            "Query entered not present in the dataset.\nTry with a different query."
          );
          console.log("ERRORS: ", errors.code);
        });
      this.res = response2.data;
      this.$root.$emit("change_bg", this.res);
    },

    getF() {
      this.ref_temp = true;
    },

    getC() {
      this.ref_temp = false;
    },

    dateTimeManager() {
      const dateTime = this.res.location.localtime;
      const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      };
      const cd = new Date(dateTime);
      let day = cd.getDay();

      this.current_day = days[day];

      let datetime = dateTime.split(" ");
      let dateArr = datetime[0].split("-");
      this.current_date = dateArr[2] + "." + dateArr[1] + "." + dateArr[0];

      this.current_time = datetime[1];
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #282c34;
  color: #ffffff;
  font-family: Arial, sans-serif;
}

.top-bar {
  height: 9vh;
  width: 100vw;
  padding: 1.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(40, 44, 52, 0.8);
}

.brand-name p {
  font-weight: 700;
  font-size: 36px;
  background: linear-gradient(180deg, #ff7e5f 0%, #feb47b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-bar {
  mix-blend-mode: luminosity;
}

.s-box {
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  border: 2px solid transparent;
  width: 20vw;
  height: 50px;
  color: white;
  transition: background 0.3s;
}

.s-box:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.3);
}

.mid-bar {
  height: 30vh;
  width: 100vw;
  margin-top: 2.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(40, 44, 52, 0.7);
  border-radius: 10px;
}

.date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 3%;
}

.date-time p {
  font-size: 35px;
  font-weight: 200;
  letter-spacing: 0.4em;
}

.date-day p {
  font-weight: 800;
  font-size: 19px;
}

.temp {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10%;
}

.location {
  font-weight: 100;
  font-size: 24px;
}

.t {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.number h2 {
  font-size: 66px;
  margin: 0;
}

.f-c {
  display: flex;
  gap: 15px;
}

.f-c p {
  cursor: pointer;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 20px;
  transition: all 0.3s;
}

.f-c p.active {
  background-color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
}

.type {
  font-size: 19px;
  font-weight: 500;
  text-transform: capitalize;
}

.details {
  padding: 15px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  margin-right: 3.8%;
  display: flex;
  flex-direction: column;
  width: 23vw;
  height: auto;
  font-weight: 400;
  font-size: 16px;
  text-align: left;
}

.details p {
  margin: 5px 0;
}

.week-title,
.hour-title {
  text-align: left;
  margin-left: 1%;
  margin-top: 20px;
}

.week-title p,
.hour-title p {
  font-weight: 700;
  font-size: 28px;
  text-transform: uppercase;
  color: rgba(20, 20, 50, 0.9); /* Deep blue */
}
</style>
