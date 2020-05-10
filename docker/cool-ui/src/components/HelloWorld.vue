<template>
  <div class="hello">
    <h1>Welocme {{ name }}</h1>
    <div>Name <input v-model="name" /></div>
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data: function() {
    return {
      name: "",
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "http://localhost:3000/profile",
    }).then((response) => {
      this.name = response.data.name;
    });
  },
  methods: {
    submit() {
      axios({
        method: "post",
        url: "http://localhost:3000/profile",
        data: { name: this.name },
      }).then((response) => {
        this.name = response.data.name;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
