<template>
<div id="header">
 <!--Navigation As a link -->

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <a class="navbar-brand dashboard-brand" href="#">Nota20</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <inertia-link class="nav-link dashboard-menu" href="/">Painel<span class="sr-only">(current)</span></inertia-link> 
      </li>
      <li class="nav-item">
        <inertia-link href="/utilizador" class="nav-link dashboard-menu">Utilizador</inertia-link> 
      </li>
      <li class="nav-item">
        <a class="nav-link dashboard-menu" href="#">Turma</a>
      </li>
      <li class="nav-item">
        <a class="nav-link dashboard-menu" href="#">Escola</a>
      </li>
      <li class="nav-item">
        <a class="nav-link dashboard-menu" href="#">Estudante </a>
      </li>
    </ul>
    <span class="navbar-text">

      <inertia-link href="#">Olá {{$page.props.sharedAuthuserName}}</inertia-link> | <inertia-link href="/out" method="post" >Sair</inertia-link>
    </span>
  </div>
</nav>
<!--Ponto de entrada para os conteudos no centro da pagina-->

<slot/>

</div>


</template>

<script>
export default {
    
}

</script>
 <style>
 .dashboard-brand{
  font-family: 'Audiowide', cursive;
  font-weight: 900;
  font-size: 1.15rem;
  color: #1cb0b9!important;;
 }

 .dashboard-menu{
   font-size: 1rem;
 }

 .dashboard-icon{
   color: #343a40;
 }

.dashboard-label{
  margin-left:0.75rem;
}

.dashboard-arrow{
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

 </style>