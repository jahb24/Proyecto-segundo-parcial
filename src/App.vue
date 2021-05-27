<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#" @click="opcion=0">
        <img src="https://firebasestorage.googleapis.com/v0/b/vue-1-c9664.appspot.com/o/biblio.png?alt=media&token=54199181-6a82-4ec0-8bf5-5e5e1443a703" width="30" height="30" class="d-inline-block align-top">
        Biblioteca
      </a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <button class="btn btn-outline-success my-sm-0" @click="opcion=1">Agregar</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-info my-sm-0 mx-2" @click="opcion=2, listarLibros()">Listar</button>
        </li>
      </ul>
    </nav>
  
    <p id="mensaje" v-if="opcion==0">Estás en el sistema de gestión de libros, selecciona una opción arriba</p>
    <form v-if="opcion==1" @submit.prevent="estatusEditar ? updateLibro() : addLibro()" id="formulario">
      <p>
        <label id="tit" for="titulo" class="form-label my-3">Titulo del libro</label>
        <input id="titulo" class="form-control" type="text" placeholder="Titulo" v-model="titulo">
        <label id="aut" for="autor" class="form-label my-3">Autor del libro</label>
        <input id="autor" class="form-control" type="text" placeholder="Autor" v-model="autor">
        <button class="btn btn-success my-3" type="submit">{{estatusEditar ? "Editar" : "Agregar"}}</button>
        <button class="btn btn-danger mx-2" v-if="estatusEditar" @click="estatusEditar=false, opcion=2, titulo='', autor=''">Cancelar</button>
      </p>
    </form>
    <img src="https://acegif.com/wp-content/uploads/loading-25.gif" v-if="cargando">
    <table class="table" v-if="opcion==2">
      <thead class="thead-dark" id="cabecera">
        <tr>
          <th scope="col" class="bg-info">ID</th>
          <th scope="col" class="bg-info">Libro</th>
          <th scope="col" class="bg-info">Autor</th>
          <th scope="col" class="bg-info"></th>
        </tr>
      </thead>
      <tbody id="cuerpo">
        <tr v-for="libro in Libros" :key="libro.id">
          <th scope="row">{{libro.id}}</th>
          <td>{{libro.titulo}}</td>
          <td>{{libro.autor}}</td>
          <td>
            <button class="btn btn-outline-primary" @click="selectLibro(libro)">Editar</button>
            <button class="btn btn-outline-danger mx-2" @click="deleteLibro(libro)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {db} from './firebase'
export default {
  name: 'App',
  data(){
    return{
      Libros:[],
      id:"",
      titulo:"",
      autor: "",
      cargando : false,
      opcion:0,
      estatusEditar:false
    }
  },
  created(){
    //this.opcion = 0
    //this.listarLibros()
  },
  methods:{
    async listarLibros(){
      this.cargando = true
      const data = await db.collection("books").get()
      this.Libros = data.docs.map(doc => ({
        id:doc.id, ...doc.data()
      }))
      this.cargando = false
      console.log(this.Libros)
    },
    async addLibro(){
      
      await db.collection("books").add({
          titulo: this.titulo,
          autor: this.autor
      })
      alert("Libro añadido, consulta en la opción de Listar")
      this.titulo = ""
      this.autor = ""
      this.opcion = 1
      //this.listarLibros()
    },
    async deleteLibro(libro){
      if (confirm(`Estas seguro de eliminar ${libro.titulo}?`)){
        await db.collection("books").doc(libro.id).delete()
        this.listarLibros()
      }
    },
    selectLibro(libro){
      this.estatusEditar = true
      this.id = libro.id
      this.titulo = libro.titulo
      this.autor = libro.autor
      this.opcion = 1
    },
    async updateLibro(){
      await db.collection("books").doc(this.id).set({
          titulo: this.titulo,
          autor: this.autor
      })
      alert("libro editado correctamente")
      this.estatusEditar = false
      this.id = ""
      this.titulo = ""
      this.autor = ""
      this.opcion = 2
      this.listarLibros()
    }
  }
}
</script>

