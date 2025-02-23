<template>
  <div class="wrapper">
    <section class="screen">{{ buffer }}</section>
    <section class="calc-buttons">
      <div class="calc-button-row">
        <button class="calc-button double" @click="clearBuffer">C</button>
        <button class="calc-button" @click="backspace">&larr;</button>
        <button class="calc-button" @click="handleSymbol('÷')">&divide;</button>
      </div>
      <div class="calc-button-row" v-for="row in buttonRows" :key="row[0]">
        <button
          v-for="btn in row"
          :key="btn"
          class="calc-button"
          @click="handleButtonClick(btn)"
        >
          {{ btn }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  buffer,
  buttonRows,
  handleButtonClick,
  handleSymbol,
  clearBuffer,
  backspace,
} from "./CalculatorScript";
import "./CalculatorStyle.css";
</script>
