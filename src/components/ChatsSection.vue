<template>
  <div
    class="chats-container"
    :class="[{ hide: activeChat != -1 }, { expand: activeChat == -1 }]"
  >
    <div class="d-flex subheader align-center pl-2">
      <span class="title pr-2">Mensajes</span>
      <span class="messages-tip">{{ chats.length }}</span>
    </div>
    <div class="px-2 py-2">
      <div class="pt-1 pb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar conversaciones..."
        />
      </div>
      <div class="d-flex pb-4 option-btn">
        <div class="pr-2">
          <button
            class="btn primary white--text"
            :class="{ active: sectionFilter === 'chats' }"
            @click="sectionFilter = 'chats'"
          >
            Chats
          </button>
        </div>
        <div>
          <button
            class="btn primary white--text"
            :class="{ active: sectionFilter === 'historial' }"
            @click="sectionFilter = 'historial'"
          >
            Historial
          </button>
        </div>
      </div>
      <div
        v-for="(chat, i) in filteredChats"
        class="d-flex pointer chat-card"
        :key="i"
        :class="[chat.status, { active: activeChat === i }]"
        @click="setActiveChat(chat, i)"
      >
        <div>
          <avatar
            :username="chat.name"
            :size="activeChat != -1 ? 40 : 50"
          ></avatar>
        </div>
        <div class="d-flex flex-column pl-1 justify-center flex-grow-1">
          <div class="d-flex">
            <div class="subtitle flex-grow-1">
              {{ chat.name }}
            </div>
            <div>
              {{ getMessageTimeAgo(chat.messages[0].createdAt) }}
            </div>
          </div>
          <div class="text dark-gray--text semi-bold d-flex align-center">
            <div class="flex-grow-1">
              {{ getLastMessage(chat.messages) }}
              <i
                v-if="getLastMessage(chat.messages) === 'file'"
                class="fa-solid fa-file primary--text"
              ></i>
            </div>
            <i class="fa-brands fa-whatsapp fa-xl"></i>
          </div>
        </div>
      </div>
      <div v-if="!filteredChats.length" class="text text-center">
        No hay coincidencias...
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chats: {
      type: Array,
    },
    triggerSelectChat: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeChat: 0,
      sectionFilter: "chats",
      search: "",
      timeToMinutes: {
        year: 525949,
        month: 43829,
        week: 10080,
        day: 1440,
      },
    };
  },
  computed: {
    filteredChats() {
      return [...this.chats].filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    msg() {
      return (chat) => {
        return chat.text;
      };
    },
  },
  methods: {
    setActiveChat(chat, index) {
      this.$emit("set-selected-chat", chat);
      this.activeChat = index;
    },
    getMessageTimeAgo(date) {
      const from = new Date(date);
      const to = new Date();
      const timeDifference = to - from;
      const timeInMinutes = Math.floor(timeDifference / (1000 * 60));
      if (timeInMinutes > this.timeToMinutes.year)
        return (timeInMinutes / this.timeToMinutes.year).toFixed() + "y";
      if (timeInMinutes > this.timeToMinutes.month)
        return (timeInMinutes / this.timeToMinutes.month).toFixed() + "mo";
      if (timeInMinutes > this.timeToMinutes.week)
        return (timeInMinutes / this.timeToMinutes.week).toFixed() + "w";
      return `${timeInMinutes}m`;
    },
    getLastMessage(messages) {
      let message = messages[messages.length - 1].message.text
        ? messages[messages.length - 1].message.text
        : "file";
      return message.length > 30 ? `${message.substring(0, 27)}...` : message;
    },
  },
  watch: {
    triggerSelectChat: {
      handler() {
        this.activeChat = -1;
      },
    },
  },
};
</script>
