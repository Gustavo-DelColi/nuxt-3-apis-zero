

<template>
    <h1> OFetch</h1>
    <div v-if="pending">Loading</div>
    <div v-else-if="error"> Error: {{ error.message }}</div>
    <pre v-else>
        {{ userProfile }}
    </pre>
    <button @click="fetchUserProducts">Products refresh</button>
    <div v-if="isLoadingProducts"> Loading Products</div>
    <div v-else-if="userProducts.length >0 ">
        <ul>
            <li v-for="product in userProducts" :key="product.id">
                {{ product.name }} - {{ product.price }}
            </li>
        </ul>
    
    </div>
</template>

<script setup lang="ts">
import type { IUserProduct } from '~/services/user/types';

const { $http } = useNuxtApp();

const { data: userProfile, pending, error } = await useAsyncData('use-profile', () => $http.user.getUserProfile());

const isLoadingProducts = ref(false);
const userProducts = ref<IUserProduct[]>([]);

const fetchUserProducts = async () => {
    try{
        isLoadingProducts.value = true;
        userProducts.value = await $http.user.getUserProducts();
    }catch (error: any){
        alert(error.message)
    }finally{
        isLoadingProducts.value = false;
    }
}
</script>