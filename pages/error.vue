<template>
  <div>
    <div class="m-48 flex justify-center items-center">
      <p class="text-2xl uppercase">
        Sorry, we did something wrong. Please
        <a
          class="text-white text-base rounded-full p-2 bg-blue-700 shadow-md"
          href="/"
          >Try again</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
};
</script>

<style>
html {
  background-color: #14171a;
  color: red;
}
</style>
