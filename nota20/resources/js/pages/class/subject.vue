<template>
    <div class="container">
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/class/course">Curso</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link :href="'/class/'+courseName+'/'+courseId">Turma</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link :href="'/class/'+classId">Inscrição</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Disciplina</li>
        </ol>
        </nav>

    <br/>
        <div id="viewEditForm"></div>
        <form class="create-user-form" >
           <h4 id="">Turma: {{className}}</h4>
            <p></p>

            <div class="form-row "> 
                <!----div class="form-group col-12">
                    <inertia-link v-bind:href="'/class/'+courseName+'/'+courseId" class="btn btn-primary">
                        Criar turma
                        <font-awesome-icon :icon="['fas', 'plus']" size="1x" />
                    </inertia-link>
                </div--->
            </div>


            <p></p>
        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Nível</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in subjectConfigArray" :key="item.id"> 
                        <td><inertia-link :href="'/class/grade/'+classId+'/'+item.id">{{item.subject}}</inertia-link></td>
                        <td>  {{item.level}}</td>
                    </tr>
                </tbody>
            </table>
        </div> 
        </form>
        <br/>

    </div>
</template>
<script>
import Layout from '../shared/layout';

export default {
      layout:Layout,
      props:['courseName','className','classId', 'courseId', 'subjectConfigArray'],  
     data(){
        return{
           
        }
    },
    methods:{
     
    },
    created(){
        console.log(this.subjectConfigArray);
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
   .create-user-form, .page-navigation {
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