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
      <div class="px-6 justify-center py-4">
        <div v-if="author" class="font-bold text-2xl md:text-4xl mt-8 mb-4">
          {{ author }}
        </div>
        <p v-if="content" class="text-blue-200 font-mono md:text-xl text-base">
          {{ content }}
        </p>
      </div>
      <div class="flex text-gray-100 justify-center">
        <a title="Listen Again" class="btn" href="#" @click.prevent="speak"
          ><i class="fas fa-volume-up"></i
        ></a>
        <a
          :id="hahad"
          class="btn reaction"
          href="#"
          @click.prevent="haha()"
          ><i class="fas fa-grin-alt"></i> {{ truth.haha ? truth.haha : '' }}</a
        >
        <a :id="mehd" class="btn reaction" href="#" @click.prevent="meh()"
          ><i class="fas fa-meh-rolling-eyes"></i>
          {{ truth.meh ? truth.meh : '' }}</a
        >
        <a class="btn" href="#" @click.prevent="another">→</a>
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
      hahad: ''
    };
  },

  computed: {
    content() {
      return this.truth.truism;
    },

    author() {
      return this.truth.author;
    }
  },

  async asyncData({ $axios, $auth }) {
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
    const truth = await $axios.$get(`/api/truism/${id}`);
    return { truth };
  },

  mounted() {
    this.setInteraction();
    setInterval(() => {
      this.another();
    }, 120000);
  },

  methods: {
    setInteraction() {
      const interactions = this.truth.interactions;
      const id = this.$auth.$storage.getCookie('token');
      this.haha = '';
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
    async another() {
      const id = this.$auth.$storage.getCookie('token');
      const truth = await this.$axios.$get(`/api/truism/${id}`);
      this.truth = truth;
      this.setInteraction();
    },
    speak() {
      // list of languages is probably not loaded, wait for it
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          this.textToSpeech();
        });
      } else {
        // languages list available, no need to wait
        this.textToSpeech();
      }
    },

    textToSpeech() {
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
      const response = await this.$axios
        .post('/api/interact', { userId, truismId, interactionType })
        .then((response) => {
          this.truth = response.data;
          this.setInteraction();
          // this.truth.haha = data.haha;
          // this.truth.meh = data.meh;
          return true;
        })
        .catch((e) => {
          this.$toast.error('Poor internet connection.');
          return false;
        });
      return response;
    },

    async haha() {
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
  background-color: rgba(6, 5, 51, 0.904);
  color: yellow;
}

.half-screen {
  height: 37vh;
}

.btn {
  @apply inline-block rounded-full px-3 py-1 text-xl font-semibold mr-2;
}

.btn:active {
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
</style>
