<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
    <q-btn icon="add" @click="onCreate"/>
    </div>
    <div class="items-center">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
      <template v-slot:body-cell-actions = "props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="edit"
            @click="onEdit(props.row.product_id)"
          />
          <q-btn
          flat
            dense
            round
            icon="delete"
            @click="onDelete(props.row.product_id)"
          />
        </q-td>
      </template>
        </q-table>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import router from '../router'



const columns = [
  { name: 'product_id', align: 'center', label: 'รหัสลูกค้า', field: 'product_id', sortable: true },
  { name: 'name', align: 'center', label: 'ชื่อ', field: 'name', sortable: true },
  { name: 'description', align: 'center', label: 'description', field: 'description', sortable: true },
  { name: 'price', align: 'center', label: 'price', field: 'price', sortable: true },
  { name: 'category', align: 'center', label: 'category', field: 'category', sortable: true },
  { name: 'image_url', align: 'center', label: 'image_url', field: 'image_url', sortable: true },
  { name: 'actions', align: 'center', label: 'id', field: 'id', sortable: true }
]

const rows = ref([])
const fetchData = async () => {
  fetch('http://localhost:8800/api/V1/products')
    .then(res => res.json())
    .then(result => {
      rows.value = result
    })
}
fetchData()

const onEdit = (id) => {
  router.push('update/'+id)
  console.log(id)
}

const onDelete = (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(`http://localhost:8800/api/V1/products/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message)
      if (result.status === 'success') {
        router.push('/')
      }
      fetchData()
    })
    .catch((error) => console.log('error', error));
}

const onCreate = () => {
  router.push('/create')
}
</script>