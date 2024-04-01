<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="unidades"
            :footer-props="footerProps"
            sort-by="nome"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Unidades</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <!-- Modal criar/editar item -->
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                Nova Unidade
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-form ref="form" v-model="formValid" lazy-validation>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    v-model="editedItem.nome"
                                                    label="Nome da unidade"
                                                    :rules="nomeRule">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- Modal apagar item -->
                    <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                            <v-card-title class="text-h5 justify-center">Tem certeza que deseja apagar este
                                item?</v-card-title>
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
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Nome', align: 'start', sortable: true, value: 'nome' },
            { text: 'Ações', value: 'actions', sortable: false },
        ],
        editedItem: {
            id: null,
            nome: null,
        },
        defaultItem: {
            id: null,
            nome: null,
        },
        unidades: [],
        formValid: false,
        nomeRule: [
            value => !!value || 'Nome é obrigatorio.',
        ],
        snackbar: {
            show: false,
            text: null,
            type: null,
        }
    }),

    computed: {
        formTitle() {
            return this.editedItem.nome ? 'Editar Unidade' : 'Nova Unidade'
        },
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
            this.$api.get("/unidades")
                .then(response => {
                    this.unidades = response.data
                })
        },

        editItem(item) {
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.$api.delete(`/unidades/${this.editedItem.id}`)
                .then(() => {
                    this.closeDelete()
                    this.getItens()
                })

        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
            })
        },

        save() {
            if (!this.$refs.form.validate()) return

            if (this.editedItem.id) {
                this.$api.put(`/unidades/${this.editedItem.id}`, {
                    nome: this.editedItem.nome,
                    updatedAt: this.newMysqlDateTime()
                })
                    .then(() => {
                        this.getItens()
                        this.close()
                        this.snackbar.text = 'Item editado com sucesso'
                        this.snackbar.show = true
                    })
                    .catch(() => {
                        this.close()
                        this.snackbar.type = 'error'
                        this.snackbar.text = 'Erro ao editar item'
                        this.snackbar.show = true
                    })
            } else {
                this.$api.post("/unidades", {
                    id: this.newRandomNumber(),
                    nome: this.editedItem.nome,
                    createdAt: this.newMysqlDateTime(),
                    updatedAt: this.newMysqlDateTime()
                })
                    .then(() => {
                        this.getItens()
                        this.close()
                        this.snackbar.text = 'Item salvo com sucesso'
                        this.snackbar.show = true
                    })
                    .catch(() => {
                        this.close()
                        this.snackbar.type = 'error'
                        this.snackbar.text = 'Erro ao salvar item'
                        this.snackbar.show = true
                    })
            }
        },
    },
}
</script>