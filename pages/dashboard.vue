<template>
  <div class="w-full md:m-auto md:mt-16 max-w-md">
    <div
      v-if="info"
      class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
      role="alert"
    >
      <p class="font-bold"><i class="fas fa-exclamation"></i> Info</p>
      <p class="text-sm">{{ info }}</p>
    </div>

    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="author">
          Author
        </label>
        <input
          id="author"
          v-model="author"
          :disabled="loading"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Author"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="truth">
          Truth
        </label>
        <textarea
          id="truth"
          v-model="truth"
          :disabled="loading"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter truth"
          cols="10"
          rows="10"
          required
        >
        </textarea>
      </div>
      <div class="flex items-center justify-center">
        <div v-if="!loading">
          <button
            class="bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click.prevent="submit"
          >
            Enter
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click.prevent="logOut"
          >
            Log Out
          </button>
        </div>
        <i
          v-else
          class="fas fa-atom text-xl px-12 text-blue-600 self-center blinking"
        ></i>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  middleware: 'auth',
  data() {
    return {
      author: '',
      truth: '',
      info: false,
      loading: false
    };
  },
  methods: {
    logOut() {
      if (confirm(`Log Out ?`)) {
      }
    },
    submit() {
      this.loading = true;
      // const author = this.author;
      // const truth = this.truth;
      // const haha = 0;
      // const mehs = 0;
    }
  }
};
</script>

<style>
.blinking {
  animation: loading 1s ease;
  animation-iteration-count: infinite;
}

@keyframes loading {
  0% {
    transform: scale(0.5);
  }
}
</style>
