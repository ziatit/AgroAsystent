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

<style scoped>
input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>