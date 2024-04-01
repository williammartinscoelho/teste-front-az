<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="empresas"
            :footer-props="footerProps"
            sort-by="nome"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Empresas</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" dark class="mb-2" to="/empresas/criar">
                        Nova Empresa
                    </v-btn>

                    <!-- Modal apagar item -->
                    <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                            <v-card-title class="text-h5 justify-center">
                                Tem certeza que deseja apagar este item?
                            </v-card-title>
                            <v-card-text class="text-center">
                                {{ editedItem.nome }}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Canelar</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                Sem Dados
            </template>
        </v-data-table>

        <Snackbar :text="snackbar.text" :type="snackbar.type" v-model="snackbar.show"/>
    </div>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue"
import utils from "@/mixins/utils"
export default {
    components: {
        Snackbar,
    },
    mixins: [utils],
    data: () => ({
        dialogDelete: false,
        headers: [
            { text: 'CNPJ', align: 'start', sortable: true, value: 'cnpj' },
            { text: 'Razão Social', align: 'start', sortable: true, value: 'razaoSocial' },
            { text: 'Telefone', align: 'start', sortable: true, value: 'telefone' },
            { text: 'Email', align: 'start', sortable: true, value: 'email' },
            { text: 'Ações', value: 'actions', sortable: false },
        ],
        editedItem: {},
        empresas: [],
        snackbar: {
            show: false,
            text: null,
            type: null,
        }
    }),

    computed: {
        footerProps() {
            return {
                'items-per-page-all-text': 'Todos',
                'items-per-page-text': 'Itens por página',
            }
        }
    },

    created() {
        this.getItens()
    },

    methods: {
        getItens() {
            this.$api.get("/empresas")
                .then(response => {
                    this.empresas = response.data
                })
        },

        editItem(item) {
            this.$router.push(`/empresas/${item.id}`)
        },

        deleteItem(item) {
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.$api.delete(`/empresas/${this.editedItem.id}`)
                .then(() => {
                    this.closeDelete()
                    this.getItens()
                    this.snackbar = {
                        show: true,
                        text: "Item apagado com sucesso"
                    }
                })

        },

        closeDelete() {
            this.dialogDelete = false
        },
    },
}
</script>