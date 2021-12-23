<template>
    <div class="container">
        <div v-if="$page.props.flash.message" class="alert alert-danger alert-dismissible fade show mt-4 mb-1 createdAlert" role="alert">
        <span class="center-msg">Estudante&nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;Removido com Sucesso</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/class/course">Turma</inertia-link></li>
            <li class="breadcrumb-item" aria-current="page">Inscrição</li>
        </ol>
        </nav>

    <br/>
        <div id="viewEditForm"></div>
        <form class="create-user-form" >
           <h4 id="">Turma: {{classConfigArray['name']}} </h4>
            <p></p>

            <div class="form-row "> 
                <!----div class="form-group col-12">
                    <inertia-link v-bind:href="'/class/'+courseName+'/'+courseId" class="btn btn-primary">
                        Criar turma
                        <font-awesome-icon :icon="['fas', 'plus']" size="1x" />
                    </inertia-link>
                        +"name": "Eng. Civil"
      +"course_id": 2
      +"level_id": 6
                </div--->


                <div class="form-group col-12">
                    <inertia-link :href="'/class/student/'+classConfigArray['id']+'/'+classConfigArray['name']" class="btn btn-primary">
                        Inscrever
                        <font-awesome-icon :icon="['fas', 'list']" size="1x"/>
                    </inertia-link>
                    <inertia-link :href="'/class/subject/'+courseConfigArray['name']+'/'+courseConfigArray['course_id']+'/'+courseConfigArray['level_id']" class="btn btn-primary">
                        Disciplina
                        <font-awesome-icon :icon="['fas', 'list']" size="1x"/>
                    </inertia-link>
                </div>
            </div>


            <p></p>
        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Apelido</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ano de matricula</th>
                    <th scope="col">Documento de identificao</th>
                    <th scope="col">Inscrição</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in studentConfigArray" :key="item.id"> 
                        <td>{{item.surname}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.year}}</td>
                        <td>{{item.id_number}}</td>
                        <td>
                            <button class="table-button" v-on:click="showDeleteModal(item.id, item.surname)" type="button">
                            <span v-if="deleteEnrollmentSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            <font-awesome-icon class="table-delete" :icon="['fas', 'trash']"/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
        </form>
        <br/>

        <!---MODAL ASKING THE USER IF HE/SHE REALLY WANTS TO REMOVE THE USER ENROLLMENT--->
         <div class="modal fade" id="showdeletemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><span class="badge badge badge-danger"> <font-awesome-icon :icon="['fas', 'user-minus']" /> Remover</span></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                 Deseja remover o estudante da turma?
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
                    <button type="button" v-on:click="removeEnrollment" class="btn btn-primary" data-dismiss="modal">Sim</button>
                </div>
                </div>
            </div>
        </div>
        <!---MODAL ASKING THE USER IF HE/SHE REALLY WANTS TO REMOVE THE USER ENROLLMENT--->

    </div>
</template>
<script>
import Layout from '../shared/layout';

export default {
      layout:Layout,
      props:['courseConfigArray','studentConfigArray','classConfigArray'],  
     data(){
        return{
           deleteEnrollmentSpinner:false,
           studentId:0,
           studentSurname:null
        }
    },
    methods:{
        /*** THIS METHOD DISPLAY THE MODAL ASKING THE USER IF HE/SHE WANTES TO CHANGE THE USER PASSWORD* */
        showDeleteModal(id,surname){
            this.studentId=id;
            this.studentSurname=surname;
             $('#showdeletemodal').modal('show');
        },
        /*remove student from enrolled class*/ 
     removeEnrollment(){
         this.deleteEnrollmentSpinner=true;
         this.$inertia.delete(`/class/unenroll/${this.studentId}/${this.classConfigArray['id']}/${this.studentSurname}`);
         this.deleteEnrollmentSpinner=false;
     }
    },
    created(){
       // console.log(this.classConfigArray);
       
       //...after the operation is done....

    } 
} 
</script>

<style scoped>
.breadcrumb{
    background-color: #e2e2eb;
    font-size:large;
    padding-left:0;
    padding-bottom:0;
}
.create-user-form{
    background-color: #fdfdfe;
    padding: 1.25rem;
    margin-top: 0;
    border-radius:2px ;
}
.table-button{
    background-color: #e2e2eb;
}
.table-delete{
    color: #dc2020;
}
.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;
}

.page-navigation{
    margin-top: 2rem;
}


form h4{
    font-weight: 700;
}

.table-light, .table-light > th, .table-light > td {
    background-color: #e2e2eb;
}

@media screen and (min-width: 992px){
   .create-user-form, .page-navigation, .createdAlert {
       margin-right: 10%;
       margin-left: 10%;       
   }

}

@media screen and (max-width: 767px){
   .remove_label{
      display: none;       
   }
}
</style>