<template>
    <div class="q-gutter-md" style="max-width: 500px; margin: auto;">
        <q-form @submit="onSubmit"
            class="q-gutter-md">
            <q-input v-model="name" label="Name" />
            <q-input v-model="description" label="Description" />
            <q-input v-model="price" label="Price" />
            <q-input v-model="category" label="Category" />
            <q-input v-model="image_url" label="Image_url" />
            <q-btn type="submit" label="Submit" color="primary" />
        </q-form>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import router from '../router'

const name = ref('')
const description = ref('')
const price = ref('')
const category = ref('')
const image_url = ref('')
const onSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "name": name.value,
        "description": description.value,
        "price": price.value,
        "category": category.value,
        "image_url": image_url.value
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8800/api/V1/products", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result.message)
            if (result.status === 'success') {
                router.push('/pcreate')
                
            }
        })
        .catch(error => console.log('error', error));
}
</script>