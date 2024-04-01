<template>
    <div>
        <v-card>
            <v-card-title>
                {{ cardTitle }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="formValid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.razaoSocial"
                                    :rules="razaoSocialRules"
                                    label="Razão Social"
                                    required
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.cnpj"
                                    :rules="cnpjRules"
                                    label="CNPJ"
                                    required
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.logradouro"
                                    :rules="logradouroRules"
                                    label="Logradouro"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.municipio"
                                    :rules="municipioRules"
                                    label="Municipio"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.numero"
                                    :rules="numeroRules"
                                    label="Número"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.complemento"
                                    :rules="complementoRules"
                                    label="Complemento"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.bairro"
                                    :rules="bairroRules"
                                    label="Bairro"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.cep"
                                    :rules="cepRules"
                                    label="CEP"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.telefone"
                                    :rules="telefoneRules"
                                    label="Telefone"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.email"
                                    :rules="emailRules"
                                    label="Email"
                                    required
                                    type="email"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.site"
                                    :rules="siteRules"
                                    label="Site"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.usuario"
                                    :rules="usuarioRules"
                                    label="Usuário"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="form.senha"
                                    :rules="senhaRules"
                                    label="Senha"
                                    type="password"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn class="error" @click="cancel">Cancelar</v-btn>
                <v-btn class="success" @click="save">Salvar</v-btn>
            </v-card-actions>
        </v-card>
        <Snackbar :text="snackbar.text" :type="snackbar.type" v-model="snackbar.show"/>
    </div>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue"
import utils from "@/mixins/utils"
export default {
    mixins: [utils],
    components: {
        Snackbar,
    },
    data() {
        return {
            snackbar: {
                show: false,
                text: null,
                type: null,
            },
            formValid: false,
            form: {
                razaoSocial: '',
                cnpj: '',
                logradouro: '',
                municipio: '',
                numero: '',
                complemento: '',
                bairro: '',
                cep: '',
                telefone: '',
                email: '',
                site: '',
                usuario: '',
                senha: '',
            },
            razaoSocialRules: [
                v => !!v || 'Razão social é obrigatório',
                v => v.length <= 64 || 'Razão social deve ter até 64 caracteres'
            ],
            cnpjRules: [
                v => !!v || 'CNPJ é obrigatório',
                v => v.length <= 32 || 'CNPJ deve ter até 32 caracteres',
                v => /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/.test(v) || 'CNPJ inválido',
            ],
            logradouroRules: [
                v => v.length <= 64 || 'Logradouro deve ter até 64 caracteres',
            ],
            municipioRules: [
                v => v.length <= 64 || 'Município deve ter até 64 caracteres',
            ],
            numeroRules: [
                v => v.length <= 10 || 'Número deve ter até 10 caracteres',
                v => /\d+/g.test(v) || 'Este campo deve ter apenas números',
            ],
            complementoRules: [
                v => v.length <= 64 || 'Complemento deve ter até 64 caracteres',
            ],
            bairroRules: [
                v => v.length <= 64 || 'Bairro deve ter até 64 caracteres',
            ],
            cepRules: [
                v => v.length <= 16 || 'CEP deve ter até 16 caracteres',
                v => /^\d{8}$/.test(v.replace(/[^\d]+/g, "")) || 'CEP Inválido',
                
            ],
            telefoneRules: [
                v => v.length <= 32 || 'Telefone deve ter até 32 caracteres',
            ],
            emailRules: [
                v => !!v || 'Email é obrigatório',
                v => v.length <= 254 || 'E-mail deve ter até 254 caracteres',
                v => /.+@.+/.test(v) || 'E-mail inválido',
            ],
            siteRules: [
                v => v.length <= 254 || 'Site deve ter até 254 caracteres',
            ],
            usuarioRules: [
                v => !!v || 'Usuário é obrigatório',
                v => v.length <= 20 || 'Usuário deve ter até 20 caracteres',
            ],
            senhaRules: [
                v => v.length <= 128 || 'Senha deve ter até 128 caracteres',
            ],
            editedItem: {},

        }
    },
    created() {
        if(this.action === 'editar') this.getItem()
    },
    computed: {
        cardTitle() {
            return this.action === 'criar' ? 'Nova Empresa' : 'Editar Empresa'
        },
        action() {
            return this.$route.params.id === 'criar' ? 'criar' : 'editar'
        }
    },
    methods: {
        getItem() {
            this.$api.get(`/empresas/${ this.$route.params.id}`)
            .then(response => {
                this.editedItem = response.data
                this.form = response.data
            })
        },
        cancel() {
            this.$router.push(`/empresas`)
        },
        save() {
            if (!this.$refs.form.validate()) return

            if(this.action === 'editar') {
                this.$api.put(`/empresas/${this.form.id}`, {
                    razaoSocial: this.form.razaoSocial,
                    cnpj: this.form.cnpj,
                    logradouro: this.form.logradouro,
                    municipio: this.form.municipio,
                    numero: this.form.numero,
                    complemento: this.form.complemento,
                    bairro: this.form.bairro,
                    cep: this.form.cep,
                    telefone: this.form.telefone,
                    email: this.form.email,
                    site: this.form.site,
                    usuario: this.form.usuario,
                    senha: this.form.senha,
                    updatedAt: this.newMysqlDateTime()
                })
                .then(() => {
                    this.snackbar.text = 'Item salvo com sucesso'
                    this.snackbar.show = true
                })
                .catch(() => {
                    this.snackbar.type = 'error'
                    this.snackbar.text = 'Erro ao salvar item'
                    this.snackbar.show = true
                })
            } else {
                this.$api.post(`/empresas`, {
                    id: this.newRandomNumber(),
                    razaoSocial: this.form.razaoSocial,
                    cnpj: this.form.cnpj,
                    logradouro: this.form.logradouro,
                    municipio: this.form.municipio,
                    numero: this.form.numero,
                    complemento: this.form.complemento,
                    bairro: this.form.bairro,
                    cep: this.form.cep,
                    telefone: this.form.telefone,
                    email: this.form.email,
                    site: this.form.site,
                    usuario: this.form.usuario,
                    senha: this.form.senha,
                    cheatedAt: this.newMysqlDateTime(),
                    updatedAt: this.newMysqlDateTime()
                })
                .then(() => {
                    this.snackbar.text = 'Item salvo com sucesso'
                    this.snackbar.show = true
                    this.$router.push(`/empresas`)
                })
                .catch(() => {
                    this.snackbar.type = 'error'
                    this.snackbar.text = 'Erro ao salvar item'
                    this.snackbar.show = true
                })
            }
        }
    }
}
</script>