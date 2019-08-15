<template>
  <main class="h-full h-screen">
    <div
      class="max-w-md m-auto md:mt-16 h-auto rounded md:rounded-lg overflow-hidden"
    >
      <img
        class="w-full rounded-lg shadow-lg h-64"
        src="../assets/img/parrot.jpg"
        alt="Sunset in the mountains"
      />
      <div class="px-6 justify-center md:mb-20 mb-10 h-48 py-4">
        <div class="font-bold text-2xl md:text-4xl mt-8 mb-4">
          The Coldest Sunset
        </div>
        <p class="text-blue-200 font-mono md:text-xl text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="flex px-6 justify-center py-8">
        <a
          title="Listen Again"
          class="btn btn-pink"
          href="#"
          @click.prevent="speak"
          ><i class="fas fa-volume-up"></i
        ></a>
        <a class="btn btn-pink" href="#" @click.prevent="speak"
          ><i class="fas fa-grin-alt"></i
        ></a>
        <a class="btn btn-pink" href="#" @click.prevent="speak"
          ><i class="fas fa-meh-rolling-eyes"></i
        ></a>
        <a class="btn btn-pink" href="#" @click.prevent="speak"
          ><i class="fab fa-twitter"></i
        ></a>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      truth: '',
      author: ''
    };
  },

  mounted() {},

  methods: {
    speak() {},
    agree() {},
    meh() {},
    share() {}
  }
};
</script>

<style>
html {
  background-color: rgba(6, 5, 51, 0.904);
  color: yellow;
}

.half-screen {
  height: 37vh;
}

.btn {
  @apply inline-block rounded-full px-3 py-1 text-xl font-semibold mr-2;
}

.btn-pink {
  @apply bg-pink-700;
}
</style>
