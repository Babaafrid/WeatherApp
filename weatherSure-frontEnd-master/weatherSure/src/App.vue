<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundImage: "",
    };
  },
  methods: {
    change_bg(response) {
      this.backgroundImage = response.current.condition.text;
    },
  },
  created() {
    this.$root.$on("change_bg", this.change_bg);
  },
  destroyed() {
    this.$root.$off("change_bg", this.change_bg);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;

  background-image: url("https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-jplenio-1118873.jpg&fm=jpg");
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column; /* Column layout to stack nav and router-view */
  justify-content: flex-start; /* Align items to the top */
  align-items: center;
}

nav {
  width: 100%; /* Ensures nav spans the entire width */
  padding: 20px; /* Padding for spacing */
  background-color: rgba(44, 62, 80, 0.8); /* Semi-transparent background */
  position: relative; /* Change to relative for easier layout control */
  top: 20px; /* Move the navbar down */
  margin-top: 20px; /* Adds space above the navbar */
}

nav a {
  font-weight: bold;
  color: #ecf0f1; /* Light color for better contrast */
  margin: 0 15px; /* Adds spacing between links */
  text-decoration: none; /* Removes underline */
  transition: color 0.3s; /* Smooth color transition */
}

nav a:hover {
  color: #42b983; /* Changes color on hover */
}

nav a.router-link-exact-active {
  color: #42b983; /* Active link color */
}
</style>
