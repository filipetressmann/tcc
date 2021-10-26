<template>
  <div v-if="$i18n.locale == 'pt-br'">
    <h2>Sobre</h2>
    <p>
      A BikeScienceWeb é uma ferramenta desenvolvida pelo INCT da Internet do
      Futuro para Cidades Inteligentes, sediado no IME-USP. Seu objetivo é
      facilitar o acesso a informações analíticas úteis a partir de dados sobre
      mobilidade por bicicleta. A ideia é que as informações possam ser
      acessadas virtualmente e sem a necessidade de conhecimentos específicos
      sobre linguagens de programação.
    </p>
    <p>
      Em sua versão atual, estamos disponibilizando dados de fluxos de ciclistas
      resultantes do processamento de dados da pesquisa de Origem-Destino
      realizada pelo Metrô de São Paulo; em versões futuras, novas fontes de
      dados serão incorporadas.
    </p>
  </div>
  <div v-else-if="$i18n.locale == 'en'">
    <h2>About</h2>
    <p>
      BikeScienceWeb is a tool developed by INCT of Internet Future for Smart
      Cities hosted at IME-USP. It's main goal is to facilitate access to
      usefull anlytical analysis from bycicle mobility data. The idea is that
      the information can be accessed via web without the need of specific
      knowledge about programming languages.
    </p>
    <p>
      In it's current version, we're providing cyclists flow data resulting of
      the data processing of the Origin-Destination survey performed by São
      Paulo's Subway; in future versions, new data sources will be added.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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