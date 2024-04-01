const utilsMixin = {
    methods: {
        newMysqlDateTime() {
            // Obtém a data atual
            const dataAtual = new Date();

            // Obtém os componentes da data atual
            const ano = dataAtual.getFullYear();
            const mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda, se necessário
            const dia = ('0' + dataAtual.getDate()).slice(-2); // Adiciona zero à esquerda, se necessário
            const horas = ('0' + dataAtual.getHours()).slice(-2); // Adiciona zero à esquerda, se necessário
            const minutos = ('0' + dataAtual.getMinutes()).slice(-2); // Adiciona zero à esquerda, se necessário
            const segundos = ('0' + dataAtual.getSeconds()).slice(-2); // Adiciona zero à esquerda, se necessário

            // Formata a data no formato desejado
            const dataFormatada = ano + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;

            return dataFormatada
        },

        newRandomNumber() {
            return (Math.floor(Math.random() * 9999) + 1).toString()
        },

        formatMoney(val) {
            return val.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },

        formatDate(val) {
            const [date, time] = val.split(" ")
            return `${date.split('-').reverse().join('/')} ${time}`

        }
    }
}

export default utilsMixin