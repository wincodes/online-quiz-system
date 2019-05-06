<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="quiz"
    v-for="(data, index) in data"
    v-bind:item="data"
    v-bind:index ="index"
    v-bind:key="data.id">
    <p class="text">{{data.question}}</p>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Index',

  props: {
    msg: String
  },

  data(){
    return {
      data: null,
    }
  },
  mounted(){
    try{
      //get the questions using axios
    axios.get('http://localhost:3000/quiz').then(response => (this.data = response.data))
  }catch(err){
    throw (err);
  }
  }
}
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
