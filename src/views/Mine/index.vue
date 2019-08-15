<template>
  <div>
    <Header title="我的喵喵"></Header>
    <div id="content">
      <Login></Login>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/components/Login";


export default {
  name: "Mine",
  components: {
    Header,
    Footer,
    Login
  }
};
</script>

<style scoped>
#content .login_body{  width:100%;}
</style>