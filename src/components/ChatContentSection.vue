<template>
  <div class="d-flex flex-grow-1 relative">
    <div
      class="d-flex flex-column flex-grow-1 chat-content"
      v-if="showChatContent"
    >
      <div class="d-flex subheader align-center pl-2">
        <div class="d-flex align-center">
          <div @click="hideContentChat()" class="pointer">
            <i
              class="fa-solid fa-angle-left fa-2xl pr-1 small-devices primary--text"
            ></i>
          </div>
          <avatar :username="chat.name" :size="65"></avatar>
        </div>
        <div class="d-flex flex-column flex-grow-1 pl-2">
          <div class="title">{{ chat.name }}</div>
          <div class="text">
            <i
              class="fa-solid fa-circle-dot fa-xs"
              style="color: green; padding-right: 4px"
            ></i
            >Whatsaapp
          </div>
        </div>
        <div class="px-2 pointer" @click="showInfo = !showInfo">
          <i class="fa-solid fa-circle-info primary--text icon-xl"></i>
        </div>
      </div>
      <div class="flex-grow-1 conversation px-1">
        <div
          v-for="(message, i) in chat.messages"
          class="d-flex align-center py-1"
          :class="message.message.typeUser !== 'Client' ? 'justify-end' : ''"
          :key="i"
        >
          <div
            class="chat-thumb self-end"
            :class="
              message.message.typeUser !== 'Client' ? 'd-flex justify-end' : ''
            "
          >
            <div
              v-if="
                i === 0 ||
                chat.messages[i - 1].message.typeUser !==
                  message.message.typeUser
              "
            >
              <avatar
                v-if="message.message.typeUser == 'Client'"
                :username="chat.name"
                :size="33"
              ></avatar>
              <img v-else src="../assets/images/chatbot.jpg" alt="" />
            </div>
          </div>
          <div
            v-if="message.message.multimedia"
            class="chat-multimedia flex-1"
            :class="message.message.typeUser !== 'Client' ? 'order-1' : ''"
          >
            <!-- <VueFileAgent :uploadUrl="uploadUrl" v-model="fileRecords"></VueFileAgent> -->
            <div
              class="pointer"
              @click="mediaTypeAction(message.message.multimedia)"
            >
              <VueFileAgent
                :uploadUrl="'https://www.mocky.io/v2/5d4fb20b3000005c111099e3'"
                :accept="'image/*,video/*,.pdf'"
                :maxSize="'14MB'"
                :thumbnailSize="160"
                :readonly="true"
                :meta="message.message.multimedia.ext == 'pdf' ? true : false"
                :value="
                  new DecoratedFile(message.message.multimedia).serialize()
                "
              ></VueFileAgent>
            </div>
          </div>
          <div
            v-else
            class="chat-message flex-1"
            :class="
              message.message.typeUser !== 'Client'
                ? 'order-1 primary white--text'
                : 'lightGray'
            "
          >
            {{ message.message.text }}
          </div>
        </div>
      </div>
      <!-- type a message -->
      <div class="d-flex align-center py-2">
        <div class="pl-1">
          <ClipSvg />
        </div>
        <div class="flex-grow-1 px-2 input-icon relative">
          <input
            type="text"
            style="width: 95%"
            placeholder="Escribe un mensaje..."
            class="input-chat"
          />
          <div class="pointer">
            <i class="fa-solid fa-paper-plane primary--text fa-lg"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- chat info -->
    <div
      class="d-flex flex-column chat-info"
      v-if="showInfo"
      :class="{ show: showInfo }"
    >
      <div class="d-flex subheader align-center pl-2">
        <div class="title d-flex align-center">
          <div @click="showInfo = false" class="pointer">
            <i class="fa-solid fa-xmark fa-xs pr-1 small-devices"></i>
          </div>
          Información
        </div>
      </div>
      <div class="px-2 chat-info-content">
        <div class="d-flex justify-center pt-3">
          <avatar :username="chat.name" :size="130"></avatar>
        </div>
        <div class="subtitle pt-2 text-center">{{ chat.name }}</div>
        <div class="text text-center dark-gray--text pb-4">Whatsapp</div>
        <div class="headline pb-1">Estatus de conversación</div>
        <div class="headline-actions">
          <span
            @click="setStatus('end')"
            :class="{ active: chat.status === 'end' }"
            ><i class="fa-solid fa-check pr-1" style="color: green"></i
            >Finalizada</span
          >
          <span
            @click="setStatus('cancel')"
            :class="{ active: chat.status === 'cancel' }"
            ><i class="fa-solid fa-xmark pr-1" style="color: red"></i
            >Cancelada</span
          >
          <span
            @click="setStatus('in-progress')"
            :class="{ active: chat.status === 'in-progress' }"
            ><i
              class="fa-solid fa-arrow-right-arrow-left pr-1"
              style="color: blue"
            ></i
            >En proceso</span
          >
        </div>
        <div class="headline pb-1 pt-3">Acciones</div>
        <div class="headline-actions primary--text">
          <span><i class="fa-solid fa-ban pr-1"></i>Bloquear usuario</span>
          <span
            ><i class="fa-solid fa-heart pr-1"></i>Marcar como favorito</span
          >
          <span><i class="fa-solid fa-bookmark pr-1"></i>Marcador</span>
        </div>
        <div class="headline pb-1 pt-3">
          Archivos <span class="messages-tip">3</span>
        </div>
        <div class="pl-1">
          <div class="d-flex align-center pb-2">
            <i class="fa-solid fa-file-pdf file-red"></i>
            <div class="d-flex flex-column flex-grow-1 pl-2">
              <div class="subtitle-2">Sellia.pdf</div>
              <div class="semi-bold">9mb</div>
            </div>
            <DownloadSvg class="donloadsvg" />
          </div>
          <div class="d-flex align-center pb-2">
            <i class="fa-solid fa-image file-green"></i>
            <div class="d-flex flex-column flex-grow-1 pl-2">
              <div class="subtitle-2">Sellia.jpg</div>
              <div class="semi-bold">1mb</div>
            </div>
            <DownloadSvg class="donloadsvg" />
          </div>
          <div class="d-flex align-center">
            <i class="fa-solid fa-image file-blue"></i>
            <div class="d-flex flex-column flex-grow-1 pl-2">
              <div class="subtitle-2">Sellia.mp4</div>
              <div class="semi-bold">15mb</div>
            </div>
            <DownloadSvg class="donloadsvg" />
          </div>
        </div>
        <div class="d-flex"></div>
      </div>
    </div>
    <Dialog :dialog="dialog" :imageDialog="imageDialog" />
  </div>
</template>
<script>
import ClipSvg from "../assets/svg/clip.vue";
import DownloadSvg from "../assets/svg/download.vue";
import { DecoratedFile } from "../entities/DecoratedFile";
import Dialog from "./ImageDialog.vue";
export default {
  props: {
    chat: {
      type: Object,
    },
    triggerShow: {
      type: Boolean,
    },
  },
  components: {
    ClipSvg,
    Dialog,
    DownloadSvg,
  },
  data() {
    return {
      DecoratedFile,
      messagesToShow: [],
      limit: 1,
      dialog: false,
      showInfo: true,
      showChatContent: true,
      imageDialog: "",
      fileRecords: {
        name: "example.mp4",
        size: 10667860,
        type: "video/mp4",
        ext: "mp4",
        url: "https://sellia-web-page-test.s3.us-east-2.amazonaws.com/hd0051_preview.mp4",
        videoThumbnail:
          "https://sellia-web-page-test.s3.us-east-2.amazonaws.com/hd0051_preview_thumb.png",
      },
    };
  },
  methods: {
    updateMessagesToShow() {
      let index = this.messagesToShow.lenght;
      this.messagesToShow.push(this.chat.messages.slice(index, this.limit));
    },
    mediaTypeAction(media) {
      if (media.mimetype.includes("image")) {
        this.dialog = !this.dialog;
        this.imageDialog = media.file;
      }
      if (media.mimetype.includes("pdf")) window.open(media.file, "_blank");
    },
    setStatus(status) {
      this.chat.status = status;
    },
    hideContentChat() {
      this.showChatContent = false;
      this.$emit("hide-content-chat");
    },
  },
  computed: {
    totalMessages() {
      return this.chat.messages.length || 0;
    },
  },
  mounted() {
    this.updateMessagesToShow();
  },
  watch: {
    triggerShow: {
      handler() {
        this.showChatContent = true;
      },
    },
  },
};
</script>
