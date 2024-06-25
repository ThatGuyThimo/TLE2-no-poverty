<template>
  <div class="fixed bottom-4 right-4 max-w-lg w-full p-4 z-50">
    <div v-if="isChatOpen" class="bg-[#D9D9D9] shadow-lg shadow-black rounded-lg">
      <div class="text-center border-b-2 flex flex-row justify-between px-10 border-black py-4 font-bold text-3xl">
        <h3>Animal Chat</h3>
        <button @click="toggleChat">x</button>
      </div>
      <div class="chat-box h-96 overflow-y-auto mb-4" id="chat-box"></div>
      <div class="flex">
        <input
          type="text"
          id="user-input"
          class="flex-1 rounded-l-lg px-4 py-2 focus:outline-none"
          placeholder="Welk dier past bij mij?"
        />
        <button
          id="send-btn"
          class="bg-[#AF62AA] py-4 hover:bg-purple-600 text-white font-bold px-4 rounded-r-lg"
        >
          <span id="send-text">Verstuur</span>
          <svg
            id="loading-spinner"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white hidden"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.291-1.339-8.485-3.515z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <button v-else @click="toggleChat" class="bg-[#AF62AA] py-2 px-4 absolute right-4 bottom-4 text-white font-bold rounded-lg shadow-lg shadow-black">Chat</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isChatOpen = ref(true);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

onMounted(async () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const sendText = document.getElementById("send-text");
  const spinner = document.getElementById("loading-spinner");

  await resetChatbot();

  appendMessage("Welkom bij de AnimalSelect chat! Ontdek welk huisdier bij jou past! stuur een berichtje op de vragenlijst te beginnen! ", false);

  sendBtn.addEventListener("click", async function () {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    disableInput();
    appendMessage(userMessage, true);
    userInput.value = "";

    try {
      const response = await fetch(`http://localhost:8000/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const responseData = await response.json();
      const aiResponse = responseData.response;
      appendMessage(aiResponse, false);
    } catch (error) {
      console.error("Error:", error.message);
      appendMessage("An error occurred. Please try again.", false);
    } finally {
      enableInput();
    }
  });

  async function resetChatbot() {
    try {
      const response = await fetch('http://localhost:8000/reset', {
        method: 'POST',
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error resetting chatbot:', error);
    }
  }

  function disableInput() {
    userInput.disabled = true;
    sendText.classList.add("hidden");
    spinner.classList.remove("hidden");
  }

  function enableInput() {
    userInput.disabled = false;
    sendText.classList.remove("hidden");
    spinner.classList.add("hidden");
  }

  function appendMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    const timestamp = new Date().toLocaleString();
    const label = isUser ? "User" : "AI";

    messageDiv.className = `message ${isUser ? "user bg-gray-500" : "ai bg-blue-500"} text-white rounded-lg p-2 mb-2`;
    messageDiv.innerHTML = `<span class="font-bold">${timestamp}</span><br><span class="font-bold">${label}: </span>${message}`;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
</script>

<style scoped>
.chat-box {
  height: 24rem; /* 96 */
  overflow-y: auto;
  margin-bottom: 1rem; /* 4 */
}
</style>
