import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Unidades from '../views/unidade/Unidades.vue'
import Empresas from '../views/empresa/Empresas.vue'
import EmpresaEditar from '../views/empresa/EmpresaEdit.vue'
import Leiloes from '../views/leilao/Leiloes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/unidades',
    name: 'Unidades',
    component: Unidades
  },
  {
    path: '/Empresas',
    name: 'Empresas',
    component: Empresas
  },
  {
    path: '/Empresas/:id',
    name: 'Empresas',
    component: EmpresaEditar
  },
  {
    path: '/Leiloes',
    name: 'Leiloes',
    component: Leiloes
  }
]

const router = new VueRouter({
  routes
})

export default router
