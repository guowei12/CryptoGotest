<template>
    <div class="error-page">
        <div class="error-box">
            <div class="error-code">404</div>
            <div class="error-desc">Page does not exist</div>
            <div class="error-handle">
                <router-link to="/">
                    <el-button type="primary" size="large">Back Home</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="404">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: #F8F8F9;
    box-sizing: border-box;
}

.error-box {
    width: 400px;
    background-color: #fff;
    padding: 80px 50px;
    border-radius: 5px;
}

.error-code {
    line-height: 1;
    font-size: 100px;
    font-weight: bold;
    color: var(--el-color-primary);
    margin-bottom: 20px;
    text-align: center;
}

.error-desc {
    font-size: 20px;
    color: #777;
    text-align: center;
}

.error-handle {
    margin-top: 50px;
    text-align: center;
}

.error-btn {
    margin-left: 100px;
}
</style>
