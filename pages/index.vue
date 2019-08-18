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
        <div v-if="author" class="font-bold text-2xl md:text-4xl mt-8 mb-4">
          {{ author }}
        </div>
        <p v-if="content" class="text-blue-200 font-mono md:text-xl text-base">
          {{ content }}
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
        <a class="btn btn-pink" href="#" @click.prevent="haha"
          ><i class="fas fa-grin-alt"></i> {{ truth.haha ? truth.haha : '' }}</a
        >
        <a class="btn btn-pink" href="#" @click.prevent="meh"
          ><i class="fas fa-meh-rolling-eyes"></i>
          {{ truth.meh ? truth.meh : '' }}</a
        >
        <a class="btn btn-pink" href="#" @click.prevent="share"
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
      liked: false,
      disliked: false
    };
  },
  computed: {
    content() {
      return this.truth.truth;
    },

    author() {
      return this.truth.author;
    }
  },
  asyncData() {
    const truth = {
      author: 'Pranav Nasalthi',
      truth:
        "Happiness will not come easily as it came when you were young. You would have to work towards it. Discipline and sacrifice would be your best bet. Don't get caught in the YOLO gimmick.",
      haha: 3,
      meh: 2
    };

    return { truth };
  },
  mounted() {
    // let selectedTruthId;
    // if (this.$cookie.get('seen')) {
    //   const seenIds = JSON.parse(this.$cookie.get('seen'));
    //   let allIds = new Set();
    //   this.collection.forEach((truth) => {
    //     allIds.add(truth.id);
    //   });
    //   const unseenIds = this.difference(seenIds, allIds).values();
    //   selectedTruthId = unseenIds.next().value;
    //   seenIds.add(selectedTruthId);
    //   this.$cookie.set('seen', JSON.stringify(seenIds));
    // } else {
    //   selectedTruthId = this.collection[0].id;
    //   const seen = new Set([selectedTruthId]);
    //   this.$cookie.set('seen', JSON.stringify(seen));
    // }
    // const predicate = (truth) => truth.id === selectedTruthId;
    // const selectedTruth = this.collection.find(predicate);
    // this.truth = selectedTruth;
  },

  methods: {
    speak() {},
    haha() {
      if (this.disliked) {
        this.truth.meh =
          this.truth.meh > 0 ? (this.truth.meh -= 1) : this.truth.meh;
        this.disliked = false;
        return true;
      }

      if (this.liked) {
        this.truth.haha--;
        this.liked = false;
      } else {
        this.truth.haha++;
        this.liked = true;
      }
    },
    meh() {
      if (this.liked) {
        this.truth.haha =
          this.truth.haha > 0 ? (this.truth.haha -= 1) : this.truth.haha;
        this.liked = false;
        return true;
      }

      if (this.disliked) {
        this.truth.meh--;
        this.disliked = false;
      } else {
        this.truth.meh++;
        this.disliked = true;
      }
    },
    share() {},
    difference(seen, unseen) {
      const difference = unseen;
      for (const id in seen) {
        unseen.delete(id);
      }
      return difference;
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
</style>
