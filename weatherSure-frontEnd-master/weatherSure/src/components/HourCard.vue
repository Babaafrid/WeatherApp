<template>
  <div class="hour-cards">
    <div v-for="(hour, index) in hours" :key="index" class="hour-card">
      <div class="date">
        <h3>{{ manageDate(date) }}</h3>
      </div>
      <div class="time">
        <p>{{ manageTime(hour.time) }}</p>
      </div>
      <div class="bottom">
        <div class="temp">
          <div class="f">
            <p>{{ hour.temp_f }}ºF</p>
          </div>
          <div class="c">
            <p>{{ hour.temp_c }}ºC</p>
          </div>
        </div>
        <div class="details">
          <div class="humidity">
            <p>Humidity: {{ hour.humidity }}%</p>
          </div>
          <div class="visibility">
            <p>Visibility: {{ hour.vis_km }} km</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    res: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          "location" in value &&
          "localtime" in value.location &&
          "hour" in value &&
          Array.isArray(value.hour)
        );
      },
    },
  },

  data() {
    return {
      date: "",
      hours: [],
    };
  },

  methods: {
    days_details(details) {
      this.date = details.date;
      let hourArr = details.hour;

      this.hours = [];
      let localDateTime = this.res.location.localtime;
      let [localDate, localTime] = localDateTime.split(" ");

      if (localTime.length < 5) localTime = "0" + localTime;
      localDateTime = `${localDate} ${localTime}`;

      for (let i = 0; i < hourArr.length; i++) {
        if (hourArr[i].time.localeCompare(localDateTime) === 1) {
          this.hours.push(hourArr[i]);
        }
      }
    },

    manageTime(dateTime) {
      return dateTime.split(" ")[1];
    },

    manageDate(localDate) {
      const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };

      const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      };

      const cd = new Date(localDate);
      let day = cd.getDay();
      let current_day = days[day]; // day
      let dateArr = localDate.split("-"); // date
      let current_month = months[dateArr[1]];
      let current_date = dateArr[2];

      return `${current_day}, ${current_date}th ${current_month}`;
    },
  },
  created() {
    this.$root.$on("days_details", this.days_details);
  },
  destroyed() {
    this.$root.$off("days_details", this.days_details);
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hour-cards {
  display: flex;
  overflow-x: auto; /* Changed to 'auto' for smoother scrolling */
  padding-bottom: 0.5%;
  width: 100vw;
  height: 28vh;
  padding-right: 0.2%;
  padding-left: 0.2%;
}

.hour-card {
  min-width: 17vw;
  padding: 1%;
  margin: 0.2%;
  height: 26vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
}

.date h3 {
  text-align: left;
  font-size: 21px;
}

.time p {
  letter-spacing: 1em;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
}

.temp {
  display: flex;
  justify-content: space-between;
  margin: 0 12%; /* Simplified margin */
}

.f p,
.c p {
  font-size: 17px;
}

.details {
  margin-top: 4%;
  display: flex;
  justify-content: space-between;
}

.humidity p,
.visibility p {
  font-size: 15px;
  opacity: 0.8;
}
</style>
