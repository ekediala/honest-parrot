<template>
  <div class="w-full h-full md:m-auto md:mt-16 max-w-md">
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
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          v-validate="'required|email'"
          :disabled="loading"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
          required
          name="email"
        />
        <span v-show="errors.has('email')" class="text-red-700">{{
          errors.first('email')
        }}</span>
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          id="password"
          v-model="password"
          v-validate="'required|min:8'"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Enter Password"
          :disabled="loading"
          name="password"
        />
        <span v-show="errors.has('password')" class="text-red-700">{{
          errors.first('password')
        }}</span>
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="!loading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          @click.prevent="login"
        >
          Sign In
        </button>
        <i
          v-else
          class="fas fa-atom text-xl px-12 text-blue-600 self-center blinking"
        ></i>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2019 Acme Corp. All rights reserved.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  middleware: 'auth',
  data() {
    return {
      email: '',
      password: '',
      info: '',
      loading: false
    };
  },

  methods: {
    login() {
      this.$validator.validate().then(async (valid) => {
        if (!valid) {
          return false;
        }
        try {
          this.$toast.show('Logging in...');
          this.loading = true;
          await this.$auth
            .loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            })
            .catch((e) => {
              this.$toast.error('Email or Password wrong');
            })
            .finally(() => (this.loading = false));
        } catch (e) {
          this.$toast.error('Email or Password wrong');
        }
      });
    }
  }
};
</script>

<style scoped>
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
