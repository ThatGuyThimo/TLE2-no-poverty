<template>

  <div class="container mx-auto px-8">
    <header class="text-white">
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
    <h1 class="text-white text text-center text-4xl font-bold">
      Neem contact op voor vragen!
    </h1>
    <img src="\src\assets\Vector.png" alt="dog feet" class="insert-y-0 left-0">
    <form ref="form" @submit.prevent="sendEmail">
      <div class="flex-container space-y-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="to-name" class="block text-sm font-medium leading-6 text-white">Naam</label>
            <div class="mt-2">
              <input type="text" name="to-name" id="to-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="subject" class="block text-sm font-medium leading-6 text-white">Onderwerp</label>
            <div class="mt-2">
              <input type="text" name="subject" id="Subject"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
        </div>
        <div class="col-span-full">
          <label for="message" class="block text-sm font-medium leading-6 text-white">Bericht</label>
          <div class="mt-2">
            <textarea id="message" name="message" rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Stuur
            bericht</button>
        </div>
      </div>
    </form>
    <img src="\src\assets\Vector.png" alt="dog feet" class="absolute bottom-1 right-0">

  </div>

  <img src="\src\assets\image_8_1.png" alt="insert-x-0 bottom-0">
</template>


<script>
// import from the package in package.json
import emailjs from '@emailjs/browser';
export default {
  //method to send email from specefied 
  methods: {
    sendEmail() {
      emailjs
        .sendForm('service_0z1zpid', 'template_ge8m27p', this.$refs.form, {
          publicKey: 'DpMnc7l4dYN6ZHMC9',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    },
  },
};
</script>
