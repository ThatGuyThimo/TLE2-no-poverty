<script setup>
import ChatBox from "../views/ChatBoxView.vue";
</script>

<template>
  <main class="max-w-5xl mx-auto mt-4 text-white">
    <header>
      <nav class="flex flex-row items-center justify-between">
        <div>
          <h2 class="font-bold text-3xl">AnimalSelect</h2>
        </div>
        <ul class="flex flex-row gap-x-4 font-bold">
          <li class="hover:text-[#bebebe]">Aanbiedingen</li>
          <li class="hover:text-[#bebebe]">Over ons</li>
        </ul>
      </nav>
    </header>
    <section
      class="flex gap-x-10 flex-row items-center justify-between max-w-5xl mx-auto mt-40"
    >
      <div class="w-11/12">
        <h2 class="font-bold text-4xl mt-40">
          Ontdek welk dier bij jou past met de AnimalSelect tool
        </h2>
        <button
          class="bg-[#AF62AA] p-2 rounded-lg flex justify-end ml-auto bottom-0 mt-16 text-2xl font-bold"
        >
          Welk dier past bij mij?
        </button>
      </div>
      <div class="w-10/12">
        <img src="../assets/headerImage.png" class="rounded-lg" alt="" />
      </div>
    </section>
    <section
      class="flex gap-x-10 flex-row-reverse items-center justify-between max-w-5xl mx-auto mt-40"
    >
      <div class="w-11/12">
        <h2 class="font-bold text-4xl text-center">Waarom AnimalSelect?</h2>
        <p>
          AnimalSelect is de perfecte app voor mensen die een huisdier willen,
          maar weinig geld hebben. Deze slimme tool helpt je een huisdier te
          vinden dat goed bij je past en betaalbaar is. AnimalSelect kijkt naar
          de kosten voor eten, verzorging en doktersbezoek, en geeft advies over
          huisdieren die niet veel geld kosten. Of je nu in een klein huis woont
          of een druk leven hebt, AnimalSelect vindt het ideale huisdier voor
          jou. Kies voor AnimalSelect en vind een lieve vriend zonder je zorgen
          te maken over de kosten!
        </p>
      </div>
      <div class="w-10/12">
        <div class="w-[400px] h-[300px] rounded-lg">
          <img class="rounded-xl w-full cover" src="../assets/dog-cat.jpg" />
        </div>
      </div>
    </section>
    <section
      class="flex gap-x-10 pb-32 flex-row-reverse items-center justify-center max-w-5xl mx-auto mt-40"
    >
      <img src="../assets/flex-row-1.png" alt="" />
      <img src="../assets/flex-row-2.png" alt="" />
      <img src="../assets/flex-row-3.png" alt="" />
      <img src="../assets/flex-row-4.png" alt="" />
    </section>
  </main>

  <ChatBox />
</template>
