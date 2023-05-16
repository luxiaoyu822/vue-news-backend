<template>
  <div>Login</div>
  <button @click="handleClick">登录</button>
</template>
<script setup>
const handleClick = () => {
  localStorage.setItem('token', 'aaa')
}
</script>
