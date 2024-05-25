<template>
  <div>
    <h2>Dodaj Roślinę</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Nazwa rośliny" required />
      <button type="submit">Dodaj</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    };
  },
  methods: {
    submitForm() {
      this.$emit('add-plant', { name: this.name });
      this.name = '';
    }
  }
};
</script>
