<template>
  <main class="h-full h-screen">
    <div
      class="m-auto md:m-10 lg:m-32 lg:flex h-auto rounded md:rounded-lg overflow-hidden"
    >
      <div
        class="rounded-lg img lg:h-auto lg:min-h-md lg:min-w-md lg:w-3/5 shadow-lg"
      >
        <img
          class="w-full h-full shadow-lg rounded-lg object-cover"
          src="../assets/img/parrot.jpg"
          alt="Sunset in the mountains"
        />
      </div>
      <div class="px-12 lg:w-full justify-center py-4">
        <div
          v-if="author"
          class="font-bold text-2xl md:text-4xl lg:-mt-4 mt-8 mb-4"
        >
          {{ author }}
        </div>
        <p v-if="content" class="text-blue-200 font-mono md:text-xl text-base">
          {{ content }}
        </p>
      </div>
      <div class="flex lg:flex-col text-gray-100 mb-4 lg:-mt-40 justify-center">
        <button
          title="Listen"
          :disabled="loading"
          class="btn"
          href="#"
          @click.prevent="speak"
        >
          <i class="fas fa-volume-up"></i>
        </button>
        <a :id="hahad" class="btn lg:flex" href="#" @click.prevent="hahaha"
          ><i class="fas fa-grin-alt"></i> {{ truth.haha ? truth.haha : '' }}
        </a>
        <a :id="mehd" class="btn lg:flex" href="#" @click.prevent="meh()"
          ><i class="fas fa-meh-rolling-eyes"></i>
          {{ truth.meh ? truth.meh : '' }}
        </a>
        <button
          :id="blinking"
          :disabled="loading"
          class="btn"
          href="#"
          @click.prevent="another"
        >
          <i class="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      liked: false,
      disliked: false,
      mehd: '',
      hahad: '',
      blinking: '',
      loading: false,
      status: true,
      userSelected: false,
      interval: false
    };
  },

  computed: {
    content() {
      return this.truth.truism;
    },

    author() {
      return this.truth.author;
    },

    online() {
      return this.status;
    }
  },

  async asyncData({ $axios, $auth, $toast, error }) {
    /**
     * Create or fetch unique user ID to serve them
     * content based on what they've already seen or not
     * and fetch content.
     */
    if (!$auth.$storage.getCookie('token')) {
      let choice = '';
      const choices = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ];
      for (let x = 0; x <= 10; x++) {
        const index = Math.floor(Math.random() * (choices.length - 1));
        const pick = choices[index];
        choice += pick;
      }
      $auth.$storage.setCookie('token', choice);
    }

    const id = $auth.$storage.getCookie('token');
    try {
      const truth = await $axios.$get(`/api/truism/${id}`);
      return { truth };
    } catch (e) {
      error({
        statusCode: 502,
        message: 'Network error. Please reload the page.'
      });
    }
  },

  mounted() {
    window.addEventListener('offline', function(e) {
      this.status = window.navigator.onLine;
    });

    window.addEventListener('online', function(e) {
      this.status = window.navigator.onLine;
    });

    this.setInteraction();
    setTimeout(() => {
      if (this.userSelected) {
        return;
      }
      this.another();
    }, 180000);
  },

  destroyed() {
    window.removeEventListener('offline');
    window.removeEventListener('online');
  },

  methods: {
    setInteraction() {
      const interactions = this.truth.interactions;
      const id = this.$auth.$storage.getCookie('token');
      this.liked = false;
      this.disliked = false;
      this.hahad = '';
      this.mehd = '';
      if (interactions.hasOwnProperty(id)) {
        const interaction = interactions[id];
        if (interaction === 'haha') {
          this.hahad = 'aqua';
          this.liked = true;
        } else {
          this.mehd = 'aqua';
          this.disliked = true;
        }
      }
    },

    another() {
      if (!this.status) {
        this.$toast.error('Something went wrong. Probably poor internet.');
        return;
      }

      if (!this.userSelected) {
        this.userSelected = true;
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        this.another();
      }, 180000);
      this.blinking = 'blinking';
      this.loading = true;
      const id = this.$auth.$storage.getCookie('token');
      this.$axios
        .$get(`/api/truism/${id}`)
        .then((response) => {
          this.truth = response;
        })
        .catch(() => {
          this.$toast.error('Something went wrong. Probably poor internet.');
        })
        .finally(() => {
          this.setInteraction();
          this.blinking = '';
          this.loading = false;
        });
    },

    speak() {
      // get all voices that browser offers
      const availableVoices = window.speechSynthesis.getVoices();

      // this will hold an english voice
      let englishVoice;

      // find voice by language locale "en-US"
      // if not then select the first voice
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < availableVoices.length; i++) {
        if (availableVoices[i].lang === 'en-US') {
          englishVoice = availableVoices[i];
          break;
        }
      }
      if (englishVoice === '') {
        englishVoice = availableVoices[0];
      }

      // new SpeechSynthesisUtterance object
      const utter = new SpeechSynthesisUtterance();
      utter.rate = 1;
      utter.pitch = 1;
      utter.text = this.truth.truism;
      utter.voice = englishVoice;

      // speak
      window.speechSynthesis.speak(utter);
    },

    async interact(userId, truismId, interactionType) {
      if (!this.status) {
        this.$toast.error('Something went wrong. Probably poor internet.');
        return;
      }
      const response = await this.$axios
        .post('/api/interact', { userId, truismId, interactionType })
        .then((res) => {
          return true;
        })
        .catch((e) => {
          this.$toast.error(
            'Could not connect due to poor internet connection.'
          );
          return false;
        });
      return response;
    },

    async hahaha() {
      if (!this.online) {
        this.$toast.error('Offline. Please connect to network and try again');
        return;
      }
      const userId = this.$auth.$storage.getCookie('token');
      const truismId = this.truth.id;
      const interactionType = 'haha';
      let status;
      if (this.disliked) {
        const oldValue = this.truth.meh;
        this.truth.meh =
          this.truth.meh > 0 ? (this.truth.meh -= 1) : this.truth.meh;
        this.disliked = false;
        this.mehd = '';
        status = await this.interact(userId, truismId, interactionType);
        if (!status) {
          this.disliked = true;
          this.truth.meh = oldValue;
          this.mehd = 'aqua';
        }
      } else if (this.liked) {
        const oldValue = this.truth.haha;
        this.truth.haha =
          this.truth.haha > 0 ? (this.truth.haha -= 1) : this.truth.haha;
        this.liked = false;
        this.hahad = '';
        status = await this.interact(userId, truismId, interactionType);
        if (!status) {
          this.liked = true;
          this.truth.haha = oldValue;
          this.hahad = 'aqua';
        }
      } else {
        this.truth.haha++;
        this.hahad = 'aqua';
        this.liked = true;
        status = await this.interact(userId, truismId, interactionType);
        if (!status) {
          this.liked = false;
          this.truth.haha--;
          this.hahad = '';
        }
      }
    },

    async meh() {
      if (!this.online) {
        this.$toast.error('Offline. Please connect to network and try again');
        return;
      }
      const userId = this.$auth.$storage.getCookie('token');
      const truismId = this.truth.id;
      const interactionType = 'meh';
      if (this.liked) {
        const oldValue = this.truth.haha;
        this.truth.haha =
          this.truth.haha > 0 ? (this.truth.haha -= 1) : this.truth.haha;
        this.liked = false;
        this.hahad = '';
        const status = await this.interact(userId, truismId, interactionType);
        if (!status) {
          this.truth.haha = oldValue;
          this.liked = true;
          this.hahad = 'aqua';
        }
      } else if (this.disliked) {
        const oldValue = this.truth.meh;
        this.truth.meh =
          this.truth.meh > 0 ? (this.truth.meh -= 1) : this.truth.meh;
        this.mehd = '';
        this.disliked = false;
        const status = await this.interact(userId, truismId, interactionType);
        if (!status) {
          this.truth.meh = oldValue;
          this.mehd = 'aqua';
          this.disliked = true;
        }
      } else {
        this.truth.meh++;
        this.mehd = 'aqua';
        this.disliked = true;
        const status = await this.interact(userId, truismId, interactionType);
        if (!status) {
          this.truth.meh--;
          this.mehd = '';
          this.disliked = false;
        }
      }
    }
  }
};
</script>

<style>
html {
  background-color: #14171a;
  color: yellow;
}

.half-screen {
  height: 37vh;
}

.btn {
  @apply inline-block rounded-full px-3 py-1 text-xl font-semibold mr-2;
}

.btn:active,
.btn:visited {
  transition: all 1s ease;
  transform: scale(0.7);
  @apply border-none outline-none;
}

.btn-pink {
  @apply bg-pink-700;
}

#aqua {
  color: #ffb404;
}

#blinking {
  animation: loading 1s ease;
  animation-iteration-count: infinite;
  color: #ffb404;
}

#blinking:active,
#blinking:visited {
  border: none;
  outline: none;
}

@keyframes loading {
  0% {
    transform: scale(1.5);
  }
}

@media screen and (max-width: 768px) {
  .img {
    height: 40rem;
  }
}

@media screen and (max-width: 480px) {
  .img {
    height: 25rem;
  }
}

@media screen and (max-width: 320px) {
  .img {
    height: 20rem;
  }
}
</style>
