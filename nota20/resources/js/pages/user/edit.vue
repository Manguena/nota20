<template>
    <div class="container">
       <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
        Usuário <strong>{{$page.props.flash.message}}</strong> criado com sucesso 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div> 
        <form class="create-user-form"  @submit.prevent="submit">
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="apelido">Apelido</label>
                    <input type="text" class="form-control" id="apelido" v-model="form.apelido" >
                </div>
                <div class="form-group col-md-8">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="form.email">
                </div>
                <div class="form-group col-md-6">
                    <label for="bi">Documento de Identificação</label>
                    <input type="text" class="form-control" id="bi" v-model="form.bi">
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model="form.password">
                </div>
                <div class="form-group col-md-6">
                    <label for="password-confirm">Confirmação da password</label>
                    <input type="password" class="form-control" id="password-confirm">
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="admin" value="admin" name="customRadioInline" class="custom-control-input" v-model="form.admin">
                    <label class="custom-control-label" for="admin">Usuário administrador</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="standard" value="standard" name="customRadioInline" class="custom-control-input" v-model="form.standard">
                    <label class="custom-control-label" for="standard">Usuário Standard</label>
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
    layout:Layout,
    data(){
        return{
            form: {
                apelido:null,
                name:null,
                email:null,
                password:null,
                bi:null,
                admin:null,
                standard:null,
                role:null
            }
        }

    },

    methods:{
        checkRole(){
            if (this.form.standard==='standard') return this.form.role='standard'
            else this.form.role='admin'
        },
      submit(){
          // before sending the form, set the value for the type of user
        this.checkRole();
        
        this.$inertia.post('/utilizador',this.form);
      }
    }
    
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