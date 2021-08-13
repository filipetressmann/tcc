<template>
  <div class="modal-about">
    <h2>Sobre</h2>
    <p>A BikeScienceWeb é uma ferramenta desenvolvida pelo INCT da Internet do Futuro para Cidades Inteligentes, sediado no IME-USP. Seu objetivo é facilitar o acesso a informações analíticas úteis a partir de dados sobre mobilidade por bicicleta. A ideia é que as informações possam ser acessadas virtualmente e sem a necessidade de conhecimentos específicos sobre linguagens de programação.</p>
    <p>Em sua versão atual, estamos disponibilizando dados de fluxos de ciclistas resultantes do processamento de dados da pesquisa de Origem-Destino realizada pelo Metrô de São Paulo; em versões futuras, novas fontes de dados serão incorporadas.</p>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .modal-about {
    background-color: #fff;
    position: absolute;
    top: 50%;
    width: 80%;
    z-index: 1000;
  }
  h2 {
    font-size: 24px;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 40px;
    text-align: left;
  }
  p {
    text-align: justify;
    margin-bottom: 20px;
  }
</style>