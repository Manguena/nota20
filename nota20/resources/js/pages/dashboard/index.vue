<template>
    <div class="container">
<div class="row">
  <div class="col-sm-6 mt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Utilizador</h5>
       
        <p class="card-text"><font-awesome-icon :icon="['fas', 'users']" size="4x" class="dashboard-icon"/> <label class="dashboard-label"> Acesso e criação dos perfis de utilizadores</label></p>
        <inertia-link href="/user" class="btn btn-primary dashboard-arrow">Acessar <font-awesome-icon :icon="['fas', 'arrow-right']" size="1x" /></inertia-link>
      </div>
    </div>
  </div>
  <div class="col-sm-6 mt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Configuração</h5>
        <p><font-awesome-icon :icon="['fas', 'cogs']" size="4x" class="dashboard-icon"/> <label class="dashboard-label"> Alteração da configuração padrão</label> </p>
        <inertia-link href="/config" class="btn btn-primary dashboard-arrow">Acessar <font-awesome-icon :icon="['fas', 'arrow-right']" size="1x" /></inertia-link>
      </div>
    </div>
  </div>
</div>
<div class="row ">
  <div class="col-sm-6 mt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Escola</h5>
        <p><font-awesome-icon :icon="['fas', 'school']" size="4x" class="dashboard-icon"/> <label class="dashboard-label"> Configuração da Escola</label> </p>
        <inertia-link href="/school/create" class="btn btn-primary dashboard-arrow">Acessar <font-awesome-icon :icon="['fas', 'arrow-right']" size="1x" /></inertia-link>
      </div>
    </div>
  </div>
 <div class="col-sm-6 mt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Turma</h5>
        <p><font-awesome-icon :icon="['fas', 'chalkboard-teacher']" size="4x" class="dashboard-icon"/> <label class="dashboard-label"> Acesso e criação de turmas</label> </p>
        <inertia-link href="/class/course" class="btn btn-primary dashboard-arrow">Acessar <font-awesome-icon :icon="['fas', 'arrow-right']" size="1x" /></inertia-link>
      </div>
    </div>
  </div>
</div>

<div class="row ">
  <div class="col-sm-6 mt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Estudante</h5>
        <p><font-awesome-icon :icon="['fas', 'user-graduate']" size="4x" class="dashboard-icon"/> <label class="dashboard-label"> Cadastro do Estudante</label> </p>
        <inertia-link href="/student" class="btn btn-primary dashboard-arrow">Acessar <font-awesome-icon :icon="['fas', 'arrow-right']" size="1x" /></inertia-link>
      </div>
    </div>
  </div>
 <div class="col-sm-6 mt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Relatório</h5>
        <p><font-awesome-icon :icon="['fas', 'pen-square']" size="4x" class="dashboard-icon"/> <label class="dashboard-label"> Detalhes Sobre Desempenho do estudante</label> </p>
        <inertia-link href="/report" class="btn btn-primary dashboard-arrow">Acessar <font-awesome-icon :icon="['fas', 'arrow-right']" size="1x" /></inertia-link>
      </div>
    </div>
  </div>
</div>
<br>
<br>
</div> 

</template>
<script>
import Layout from '../shared/layout';
export default {
    layout:Layout
}
</script>