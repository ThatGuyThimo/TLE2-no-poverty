<script setup>
import ChatBox from "../views/ChatBoxView.vue";
</script>

<template>
  <main class="max-w-5xl mx-auto mt-4 text-white">
    <header>
      <nav class="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <router-link to="/">
            <h2 class="font-bold text-2xl sm:text-3xl">AnimalSelect</h2>
          </router-link>
        </div>
        <ul class="flex flex-col sm:flex-row gap-2 sm:gap-x-4 font-bold mt-2 sm:mt-0">

          <li>
            <router-link to="/over-ons" class="hover:text-[#bebebe]">Over ons</router-link>
          </li>
          <li>
            <router-link to="/contact" class="hover:text-[#bebebe]">Contact</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <section
      class="flex gap-x-10 space-y-4 md:space-y-0 md:flex-row flex-col items-center justify-between max-w-5xl mx-auto mt-40">
      <div class="w-11/12">
        <h2 class="font-bold text-4xl mt-40">
          Ontdek welk dier bij jou past met de AnimalSelect tool
        </h2>

      </div>
      <div class="w-10/12  relative z-10">
        <img src="../assets/headerImage.png" class="rounded-lg  relative z-10" alt="" />
      </div>
    </section>
    <section
      class="flex gap-x-10 space-y-4 md:space-y-0 md:flex-row-reverse flex-col items-center justify-between max-w-5xl mx-auto mt-40">
      <div class="w-11/12">
        <h2 class="font-bold text-4xl text-center  relative z-10">Waarom AnimalSelect?</h2>
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
        <div class="md:w-[400px]  md:h-[300px] rounded-lg">
          <img class="rounded-xl w-full cover  relative z-10" src="../assets/dog-cat.jpg" />
        </div>
      </div>
    </section>
    <section
      class="flex gap-x-10 pb-32 space-y-4 md:space-y-0 md:flex-row-reverse flex-col items-center justify-center max-w-5xl mx-auto mt-40">
      <img class="relative z-10" src="../assets/flex-row-1.png" alt="" />
      <img class="relative z-10" src="../assets/flex-row-2.png" alt="" />
      <img class="relative z-10" src="../assets/flex-row-3.png" alt="" />
      <img class="relative z-10" src="../assets/flex-row-4.png" alt="" />

    </section>
    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute hidden md:block bottom-0 z-0 right-40">
    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute hidden md:block bottom-0 z-0 left-40">
    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute hidden md:block top-40 z-0 left-40">
    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute hidden md:block top-40 z-0 right-40">
    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute hidden md:block -bottom-96 z-0 right-96">
    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute hidden md:block -bottom-96 z-0 left-64">
  </main>

  <ChatBox />
</template>
