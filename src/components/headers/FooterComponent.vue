<!-- src/components/headers/FooterComponent.vue -->
<template>
    <footer class="footer">
        <div class="container">
            <p>&copy; {{ currentYear }} Agroasystent. All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
};
</script>

<style scoped>
.footer {
    background-color: rgb(33, 168, 33);
    padding: 20px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>