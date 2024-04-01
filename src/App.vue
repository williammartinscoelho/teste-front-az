<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item class="justify-center">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              William M. Coelho
            </v-list-item-title>
            <v-list-item-subtitle>williammartinscoelho@hotmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Leilão APP</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      drawer: null,
      selectedItem: 0,
      items: [
        { text: 'Unidades', link:'/unidades', icon: 'mdi-folder' },
        { text: 'Empresas', link:'/empresas', icon: 'mdi-office-building ' },
        { text: 'Leilões', link:'/leiloes', icon: 'mdi-star' },
      ],
    }
  }
}
</script>

<style scoped>
::v-deep .v-main__wrap {
  background-color: #e6e6e6;
}
</style>