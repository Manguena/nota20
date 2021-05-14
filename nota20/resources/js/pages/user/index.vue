<template>
    <div class="container">
            <div class="search-create">
            
            <div class="input-group data-table-input">
                <input type="text" class="form-control" placeholder="Pesquise o utilizador" aria-label="Text input with segmented dropdown button">
                <div class="input-group-append">
                    <button type="button" class="btn btn-primary search-group-btn"><label>Pesquisar</label> <font-awesome-icon :icon="['fas', 'search']" class="search-img" /></button>
                    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Super Admin</a>
                    <a class="dropdown-item" href="#">Admin</a>
                    <a class="dropdown-item" href="#">Standard</a>
                    </div>
                </div>
            </div>
                 <inertia-link href="/utilizador/create" class="btn btn-primary search-create-btn">Criar <label>utilizador</label></inertia-link> 
                   
        </div>

        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Nr.</th>
                    <th scope="col">Apelido</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Layout from '../shared/layout';
export default {
    layout:Layout
}
</script>

<style>
.search-create{
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
}

.data-table-input{
    max-width: 350px;
    min-width: 150px;
}

.search-create-btn{
    margin-left: auto;
}



.search-create-btn label, .search-group-btn label{ 
    display: inline;
    margin: 0;
}

.table-light thead th{
        border-bottom-color: #818d99;
}

.table-light th, .table-light td, .table-light tbody + tbody {
    border-color:#818d99;;
}

@media screen and (max-width: 576px){
    .data-table-input{
        margin-right: 1rem;
    }
.search-create-btn{
margin-left:auto;

}

.search-create-btn label, .search-group-btn label{ 
    width: 0;
    height: 0;
    display: none;
}
}

@media screen and (min-width: 577px){
   .search-img{
       display: none;
   }
}
</style>