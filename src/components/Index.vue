<template>
  <div class="d-flex container">
    <!-- chats -->
    <Chats
      :chats="clients"
      @set-selected-chat="setSelectedChat"
      :triggerSelectChat="removeChat"
      v-if="selectedChat"
    />
    <!-- content chat -->
    <ChatContent
      :chat="selectedChat"
      :triggerShow="showContentChat"
      @hide-content-chat="hideContentChat()"
      v-if="selectedChat"
    />
  </div>
</template>
<script>
import Chats from "./ChatsSection.vue";
import ChatContent from "./ChatContentSection.vue";
import axios from "axios";
import ServerDirections from "../config/server-directions";
export default {
  data() {
    return {
      clients: [],
      selectedChat: null,
      showContentChat: true,
      removeChat: false,
    };
  },
  components: {
    Chats,
    ChatContent,
  },
  methods: {
    fetchClients() {
      axios
        .get(ServerDirections.CLIENTS, {})
        .then((response) => {
          this.clients = response.data.map((item) => {
            return { ...item, status: "end" };
          });
          Promise.all([
            this.fetchClient1Messages(),
            this.fetchClient2Messages(),
          ])
            .then(() => {
              this.setSelectedChat(this.clients[0]);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchClient1Messages() {
      return axios
        .get(ServerDirections.CLIENT1_MESSAGES, {})
        .then((response) => {
          this.clients[0]["messages"] = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchClient2Messages() {
      return axios
        .get(ServerDirections.CLIENT2_MESSAGES, {})
        .then((response) => {
          this.clients[1]["messages"] = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setSelectedChat(chat) {
      this.selectedChat = chat;
      this.showContentChat = !this.showContentChat;
    },
    hideContentChat() {
      this.removeChat = !this.removeChat;
    },
  },
  async mounted() {
    this.fetchClients();
  },
};
</script>
