<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="leiloes"
            :footer-props="footerProps"
            sort-by="razaoSocial"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Leilões</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
            </template>


            <template v-slot:no-data>
                Sem Dados
            </template>
        </v-data-table>
    </div>
</template>

<script>
import utils from "@/mixins/utils"
export default {
    mixins: [utils],
    data() {
        return {
            leiloes: [],
            headers: [
                { text: 'Razão Social', align: 'start', sortable: true, value: 'razaoSocial' },
                { text: 'Inicio', align: 'start', sortable: false, value: 'InicioPrevisto' },
                { text: 'Total', align: 'start', sortable: false, value: 'total' },
            ],
        }
    },
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
            this.$api.get("/leiloes")
            .then(response => {
                this.leiloes = response.data.map(leilao => {
                    leilao.total = 0
                    leilao.lotes.forEach(lote => {
                        leilao.total += lote.quantidade * lote.valorInicial
                    })

                    leilao.InicioPrevisto = this.formatDate(leilao.InicioPrevisto)
                    leilao.total = this.formatMoney(leilao.total)
                    
                    return leilao
                })
            })
        }
    }
}
</script>