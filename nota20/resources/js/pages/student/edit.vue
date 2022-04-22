<template>
    <div class="container">
       <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1 createdAlert" role="alert">
        <span class="center-msg">Usuário&nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;Actualizado com sucesso</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/student"> Estudante</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Criar: {{form.surname}} </li>
        </ol>
        </nav>
        <div class="page-navigation font-weight-bold h3 mb-1"></div>  
        <form class="create-user-form"  @submit.prevent="submit">
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="apelido">Apelido</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorSurname" id="surname" v-model="form.surname" >
                    <div class="text-danger" v-if="$page.props.errors.surname"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.surname}}</small></div>
                </div>
                <div class="form-group col-md-8">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorName" id="name" v-model="form.name">
                    <div class="text-danger" v-if="$page.props.errors.name"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.name}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="email">Documento de Identificação</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorIdNumber" id="id_number" v-model="form.id_number">
                    <div class="text-danger" v-if="$page.props.errors.id_number"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.id_number}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="bi">Ano da matrícula</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorYear" id="year" v-model="form.year">
                    <div class="text-danger" v-if="$page.props.errors.year"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.year}}</small></div>
                </div>
             </div>
             
             <button class="btn btn-primary" type="submit" hr>Actualizar</button>

        </form>
    </div>
</template>
<script>
import Layout from '../shared/layout';
export default {
    props:['student'],
    layout:Layout,
    data(){
        return{
            form: {
                surname:this.student[0]['surname'],
                name:this.student[0]['name'],
                id_number:this.student[0]['id_number'],
                year:this.student[0]['year']
            }
        }

    },

    methods:{
      submit(){
        this.$inertia.patch(`/student/${this.student[0]['id']}`,this.form)
      }
    },
    computed: {
        inputErrorSurname() {
            return {
            inputError: this.$page.props.errors.surname,
            'inputError:focus': this.$page.props.errors.surname
            }
        },
        inputErrorName() {
            return {
            inputError: this.$page.props.errors.name,
            'inputError:focus': this.$page.props.errors.name
            }
        },
        inputErrorIdNumber() {
            return {
            inputError: this.$page.props.errors.id_number,
            'inputError:focus': this.$page.props.errors.id_number
            }
        },
        inputErrorYear() {
            return {
            inputError: this.$page.props.errors.year,
            'inputError:focus': this.$page.props.errors.year
            }
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

.center-msg{
    display: flex;
    align-items: center;
    justify-content: center;
}

.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;

}

.breadcrumb{
    background-color: #e2e2eb;
    font-size:large;
    padding-left:0;
    padding-bottom:0;
}

.page-navigation{
    margin-top: 2rem;
}

@media screen and (min-width: 992px){
   .create-user-form, .createdAlert, .page-navigation{
       margin-right: 10%;
       margin-left: 10%;       
   }
}
</style>