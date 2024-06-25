<template>
  <div class="container mx-auto px-4 sm:px-8">
    <header class="text-white">
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
    <h1 class="text-white text-center text-3xl sm:text-4xl font-bold mt-8">
      Over ons
    </h1>
    <img src="\src\assets\Vector.png" alt="dog feet" class="mx-auto mt-4 sm:mt-0">

    <!-- Witte box met afgeronde hoeken en uitgebreide tekst "Over ons" -->
    <div class="bg-white rounded-xl p-4 sm:p-8 shadow-lg z-40 relative mt-8 text-center">
      <p class="text-black text-base sm:text-lg font-semibold mb-4">
        Welkom bij AnimalSelect!
      </p>
      <p class="text-black text-base sm:text-lg mb-4">
        AnimalSelect is een innovatief project dat gebruik maakt van geavanceerde AI-technologie om het proces van het
        kiezen van een huisdier gemakkelijker en meer gepersonaliseerd te maken. Ons doel is om mensen te helpen het
        perfecte huisdier te vinden dat past bij hun levensstijl, behoeften en voorkeuren.
      </p>
      <p class="text-black text-base sm:text-lg mb-4">
        Of je nu op zoek bent naar een speelse puppy, een rustige kat of een exotisch huisdier, onze AI-analyseert tal
        van factoren om de beste aanbevelingen te doen. We nemen alles in overweging, van je woonsituatie en
        gezinsgrootte tot je dagelijkse routine en persoonlijke voorkeuren.
      </p>
      <p class="text-black text-base sm:text-lg mb-4">
        Onze missie is om zowel toekomstige huisdiereigenaren als dieren te helpen door ervoor te zorgen dat elke match
        duurzaam en bevredigend is. Bij AnimalSelect geloven we dat een goede match niet alleen de kwaliteit van leven
        van de eigenaar verbetert, maar ook bijdraagt aan het welzijn van het huisdier.
      </p>
      <p class="text-black text-base sm:text-lg font-semibold">
        We zijn verheugd om je te helpen bij het vinden van je nieuwe harige vriend!
      </p>
    </div>

    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute z-0 bottom-1 right-0 hidden sm:block">
  </div>

  <img src="\src\assets\image_8_1.png" class="w-full mt-4">
</template>
