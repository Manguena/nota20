<template>
    <div class="container">
<div class="row">
  <div class="col-sm-6 mt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Utilizador</h5>
       
        <p class="card-text"><font-awesome-icon :icon="['fas', 'users']" size="4x" class="dashboard-icon"/> <label class="dashboard-label"> Edicção de perfis de utilizadores</label></p>
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
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6">
    <div class="card shadow p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card shadow p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
</div> 

</template>
<script>
import Layout from '../shared/layout';
export default {
    layout:Layout
}
</script>