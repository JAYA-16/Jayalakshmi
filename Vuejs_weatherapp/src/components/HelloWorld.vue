<template>
  <div class="hello">
    
    <h1>{{ msg }}</h1>
    
    <div class="main">
      
     <div class="signup">
       <h2>SIGNUP</h2>
       <h3>Username: <input type="text"/></h3>
       <h3>FullName: <input type="text"/></h3>

       <h3>Password: <input type="password"/></h3>
       <button>Signup</button>
        </div> 
     <div class="signin">
       <h2>SIGNIN</h2>
<h3>Username: <input type="text"/></h3>
<h3>Password: <input type="password"/></h3>
<button>Signin</button>
     </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


<style scoped>
.main{
 
  display:flex;
  background-color: whitesmoke;
  max-width:100%;
  max-height:100%;
  /* border: ridge; */
  justify-content: center;
  align-items: center;
  
}
.signup{
  display:flex;
  flex-direction: column;
  
  
  padding-right:5%;
  margin-right:20%;
  margin-left:10%;
  
}
.signin{
  display:flex;
  flex-direction: column;
  
  padding-right:5%;
}
button{
   background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
h1{
  font-size: 50px;
}

</style>
