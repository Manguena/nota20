<template>
    <div class="container">
        <form class="create-user-form" action="">
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="userSurname">Apelido</label>
                    <input type="text" class="form-control" id="userSurname">
                </div>
                <div class="form-group col-md-8">
                    <label for="userName">Nome</label>
                    <input type="text" class="form-control" id="userName">
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userEmail">Email</label>
                    <input type="email" class="form-control" id="userEmail">
                </div>
                <div class="form-group col-md-6">
                    <label for="userId">Documento de Identificação</label>
                    <input type="text" class="form-control" id="userId">
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userPassword">Password</label>
                    <input type="password" class="form-control" id="userPassword">
                </div>
                <div class="form-group col-md-6">
                    <label for="userConfPassword">Confirmação da password</label>
                    <input type="password" class="form-control" id="userConfPassword">
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline1" name="customRadioInline" class="custom-control-input">
                    <label class="custom-control-label" for="customRadioInline1">Usuário administrador</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline2" name="customRadioInline" class="custom-control-input">
                    <label class="custom-control-label" for="customRadioInline2">Usuário Standard</label>
                    </div>
                </div>
             </div>
             <button class="btn btn-primary" type="submit">Criar Usuário</button>
        </form>
    </div>
</template>
<script>
import Layout from '../shared/layout';
export default {
    layout:Layout
    
}
</script>

<style>
.create-user-form{
    background-color: #fdfdfe;
    padding: 1.25rem;
    margin-top: 3rem;
    border-radius:2px ;
}
@media screen and (min-width: 992px){
   .create-user-form{
       margin-right: 10%;
       margin-left: 10%;       
   }
}
</style>