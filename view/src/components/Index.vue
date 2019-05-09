<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="row">
        <div class="container col-6" padding="20px">
         <form id="myForm" @submit.prevent="postAnswers"> 
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="Text" name="name" required class="form-control" id="name" v-model="name" placeholder="name">
              </div>
            </div>
            <div class="form-group row">
              <label for="email" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="email" name="email" required class="form-control" id="email" v-model="email" placeholder="Email">
              </div>
            </div>
            <div class="form-group">
            <label for="slice">Select the number of questions to answer</label>
              <select class="form-control" v-model="sliceValue" id="slice" v-on:change="createSlice(sliceValue)">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>            
            <legend>Questions</legend>
            <div v-ref:datai  v-for="(data, index) in data.slice(0, slice)"
              v-bind:index="index"
              v-bind:key="data.id"
              >
                <div class="form-group">
                    <label>{{data.question}}</label>
                    <select  @change="onChange($event, data.id, data.correct_answer)" v-model="key" required class="form-control">
                      <option value="a">A. {{data.a}}</option>
                      <option value="b">B. {{data.b}}</option>
                      <option value="c">C. {{data.c}}</option>
                      <option value="d">D. {{data.d}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <button :disabled='disable' class="btn btn-primary">Submit</button>
              </div>
            </div>
         </form>
         <div class="card" v-if="response" id="response" v-scroll-to="'#response'"> 
            <b-alert show variant="success">
            <h4 class="alert-heading">Quiz Completed!</h4>
            <p>
              You Scored {{response}}%
            </p>
            <hr>
            <p class="mb-0">
                <button class="btn-primary" v-on:click="reload()">Take Another Quiz</button>
            </p>
          </b-alert>
         </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Index',

  props: {
    msg: String,
  },

  data(){
    return {
      //intitalize datas
      data: null,
      slice:5,
      name:'',
      email:'',
      answers:[],
      response:'',
      disable: false
    }
  },
  mounted(){
    try{
      //get the questions using axios
    axios.get('/quiz').then(response => (this.data = this.randomize(response.data)))
  }catch(err){
    throw (err);
  }
  },
  methods:{
    //create a random function
    randomize: function(rand){
          return rand.sort(function(){return 0.5 - Math.random()});
       },

    //set the value of the questions limit
    createSlice(sliceValue){
      this.slice = sliceValue
      this.data = this.randomize(this.data)
      this.key =''
    },

    //get the individual questions and answers and push to the answers array
    onChange(event, id, correct_ans) {
    
    // check if the id of the array already exists and remove it, --form values that are modified
    for (var i = this.answers.length - 1; i >= 0; --i) {
    if (this.answers[i].id === id) {
        this.answers.splice(i, 1);
    }
}


        //add item to the array
        this.answers.push({id: id, ans: event.target.value, correct_answer: correct_ans});
    },

    //post the questions answered
    postAnswers(){
      axios.post('/quiz', {
        name: this.name,
        email: this.email,
        answers: this.answers
      }).then(response => {
       this.response = response.data;
      });
      this.name = ''
      this.email = ''
      this.answers = ''
      this.data =''
      this.sliceValue=''
      this.isDisabled()
    },

    reload(){
      window.location.reload()
    },

    //disable the submit button
    isDisabled(){
      this.disable = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:required {
  outline: red;
}

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
