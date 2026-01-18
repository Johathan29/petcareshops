<script setup>
import HelloWorld from './components/Header.vue';
import data from './Data';
import { ref, computed } from 'vue';
const counter = ref(0);
const classes = ref('card  d-none');
const valorId = ref([]);
const animalNames = ref();
const letra = 'siete';
const favoritoAnimales = ref([]);
let convertir = ref([]);
const contador = () => {
  letra;
  counter.value++;
};
console.log(data);
animalNames.value = data.value;
const animales = () => {
  let nombre = '';
  let tipo = '';
};
console.log(animalNames);
const add = (id) => {
  const idmascosta = ref();
  const nombre = ref();
  const tipo = ref();
  const imagen = ref();

  const mascota = ref([]);
  valorId.value.push(animalNames.value.find((animal) => animal.id === id).id);
  console.log(valorId.value);
  idmascosta.value = animalNames.value.find((animal) => animal.id === id).id;
  nombre.value = animalNames.value.find((animal) => animal.id === id).Nombre;
  tipo.value = animalNames.value.find((animal) => animal.id === id).Tipo;
  imagen.value = animalNames.value.find((animal) => animal.id === id).Imagen;
  mascota.value = {
    Id: idmascosta.value,
    Nombre: nombre.value,
    Tipo: tipo.value,
    Imagen: imagen.value,
  };

  return favoritoAnimales.value.push(mascota.value);
};
const Delete = (index) => {
  if (index === 0) {
    favoritoAnimales.value.shift();
    valorId.value.shift();
  } else {
    favoritoAnimales.value.splice(index);
    valorId.value.splice(index);
  }
};
const Update = (index) => {
  var block = 'row g-3';
};
const auto = (id) => {
  const valorVerificar = valorId.value.find((item) => item === id);

  return valorVerificar ? true : false;
};
</script>

<template>
  <section>
    <button @click="" class="btn btn btn-success">Favorito</button>
    <div class="container">
        <div class="row">
            <ul class="row-cols-1 row-cols-md-2 g-4">
                <li class="col-sm-5 offset-sm-2 col-md-6 offset-md-0" v-for="items in animalNames">
                    <div class="card p-0">
                        <img v-bind:src="items.Imagen" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{{ items.Nombre }}</h5>
                            <span> {{ items.Tipo }}</span>
                            <p class="card-text">Observacion: {{ items.Observacion }}</p>
                            <p class="card-text">Ubicacion: {{ items.Ubicacion }}</p>
                            <p class="card-text">Rasgos: {{ items.Rasgos }}</p>
                        </div>
                        <div class="card-footer">
                            <button
                                @click="add(items.id)"
                                :disabled="auto(items.id)"
                                class="btn btn btn-success">
                                Favorito
                                </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</section>
  <section>
    <div class="container row">
      <h3>My favorite</h3>
      <p>{{ valorId }}</p>
      <template v-for="(item, index) in favoritoAnimales" :key="item.Id">
        <div class="card" style="width: 18rem">
          <img v-bind:src="item.Imagen" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ item.Nombre }} {{ item.Id }}</h5>
            <p class="card-text">
              {{ item.Tipo }}
            </p>
            <div class="d-flex" style="justify-content: space-around">
              <a @click="Delete(index)" class="btn btn-danger">Eliminar</a>
              <a @click="Update(item.Id)" class="btn btn-warning">Modificar</a>
            </div>
          </div>
          <form class="" style="display: none">
            <div class="col-md-6">
              <label for="inputNombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="inputNombre" />
            </div>
            <div class="col-md-4">
              <label for="inputTipo" class="form-label">Tipo</label>
              <select id="inputTipo" class="form-select">
                <option selected>Choose...</option>
                <option value="Gato">Gato</option>
                <option value="Perro">Perro</option>
                <option value="Ave">Ave</option>
              </select>
            </div>
            <div class="col-md-2">
              <label for="inputImagen" class="form-label">Imagen</label>
              <input type="file" class="form-control" id="inputImagen" />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
          </form>
        </div>

        <hr />
      </template>
    </div>
  </section>
</template>

<style scoped>
.col-md-6 {
  height: 33rem;
  list-style: none;
}
.card {
  height: 32rem;
  max-height: 34rem;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.card-img,
.card-img-bottom,
.card-img-top {
  width: 100%;
  height: 258px;
}
.col-md-6 {
  flex: 0 0 auto;
  width: 33%;
  line-height: 0.9;
}
.card {
  height: 32rem;

  max-height: 34rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0px;
  padding: 0px;
  border-bottom: 3px solid #74aaff5e;
}
</style>
