<template>
  <div class="week-cards">
    <div
      v-for="(thisDay, index) in res.forecast.forecastday"
      :key="index"
      @click="callingHourCard(thisDay)"
      class="week-card"
    >
      <div class="image">
        <img
          :src="iconQueryMaker(thisDay.day.condition.text)"
          alt="loading.."
        />
      </div>
      <div class="temp">
        <p class="data">
          {{ thisDay.day.maxtemp_f }}º<sup>F</sup> •
          {{ thisDay.day.mintemp_f }}º<sup>F</sup>
        </p>
      </div>
      <div class="date">
        {{ dateTimeManager(thisDay.date) }}
      </div>
      <div class="type">
        {{ thisDay.day.condition.text }}
      </div>
    </div>
  </div>
</template>

<script>
import sunnyIcon from "@/assets/images/sunny-day.png";
import cloudyIcon from "@/assets/images/cloudy.png";
import overcastIcon from "@/assets/images/overcast.png";
import rainyIcon from "@/assets/images/rainy.png";
import snowIcon from "@/assets/images/snow.png";

export default {
  props: {
    res: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      current_date: "",
      current_day: "",
      icon: {
        sunny: sunnyIcon,
        clear: sunnyIcon,
        cloudy: cloudyIcon,
        partly_cloudy: cloudyIcon,
        overcast: overcastIcon,
        rain: rainyIcon,
        moderate_rain: rainyIcon,
        patchy_rain_possible: rainyIcon,
        heavy_rain: rainyIcon,
        snow: snowIcon,
        moderate_snow: snowIcon,
        light_snow: snowIcon,
      },
    };
  },

  methods: {
    dateTimeManager(thisDate) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const cd = new Date(thisDate);
      let day = cd.getDay();
      let current_day = days[day]; // day

      let dateArr = thisDate.split("-"); // date
      let current_date = dateArr[2] + "th"; // Assuming you want "th" for every date

      return `${current_day.substring(0, 3)} ${current_date}`;
    },

    callingHourCard(thisDay) {
      console.log("Days Details: ", thisDay);
      this.$root.$emit("days_details", thisDay);
    },

    iconQueryMaker(weatherType) {
      let temp = weatherType.toLowerCase().replace(/ /g, "_");
      return this.icon[temp] || sunnyIcon; // Default to sunny icon if no match
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

.week-cards {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 28.5vh;
  padding-right: 0.2%;
  padding-left: 0.2%;
}

.week-card {
  min-width: 8vw;
  height: 25.5vh;
  padding: 1%;
  margin: 0.2%;
  margin-right: 1.2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 20px;
}

.week-card:hover {
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.45);
  cursor: pointer;
}

.image {
  width: 100%;
  height: 14vh;
}

.image img {
  height: 12vh;
  object-fit: cover;
}

.temp .data {
  font-size: 19px;
  font-weight: 550;
  letter-spacing: 0.05em;
}

.temp sup {
  font-size: 10.5px;
  font-weight: 500;
  opacity: 0.8;
}

.date p {
  font-size: 15px;
  opacity: 0.6;
}

.type {
  padding-top: 3%;
  opacity: 0.6;
  font-size: 14px;
  text-transform: capitalize;
}
</style>
