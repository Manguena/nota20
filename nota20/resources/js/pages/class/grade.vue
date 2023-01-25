<template>
    <div class="container">
        <div v-if="flashMessage" class="alert alert-success alert-dismissible fade show mt-4 mb-1 createdAlert" role="alert">
        <span class="center-msg">{{flashMessage.message}}</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/class/course">Curso</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link :href="'/class/'+courseName['name']+'/'+classConfigArray['course_id']">Turma</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link :href="'/class/'+classConfigArray['id']">Inscrição</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link :href="'/class/subject/'+courseName['name']+'/'+classConfigArray['course_id']+'/'+classConfigArray['name']+'/'+classConfigArray['id']+'/'+classConfigArray['level_id']">Disciplina</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Nota</li>
        </ol>
        </nav>

    <br/>
        <div id="viewEditForm"></div>
        <form class="create-user-form" >
           <h4 id="">Turma: {{classConfigArray['name']}} </h4>
           <h4>Disciplina: {{subjectName}}</h4>
            <p></p>
        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Apelido</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in studentGrade"> <!--Isto da erro mas nao tem problema nenhum-->
                        <td>{{item.surname}}</td>
                        <td>{{item.name}}</td>
                        <td> 
                          <input type="text" :id="item.id" v-bind:class="{inputError:gradesError[index]}" v-model="item.grade" class="gradeInput test">
                            <div class="text-danger" v-if="gradesError[index]">
                                <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" />&nbsp;{{gradesError[index]}}</small>
                            </div>
                            </td>
                    </tr>
                </tbody>
            </table>
        </div> 
            <div  class="saveGrades" v-if="updateButton">
                <button type="button" v-on:click="updateGrade" class="btn btn-primary">Actualizar</button>         
            </div>
            <div  class="saveGrades
            " v-else>
                <button type="button" v-on:click="storeGrade" class="btn btn-primary">Guardar</button>         
            </div>
        </form>
        <br/>
            
        
    </div>
</template>
<script>
import Layout from '../shared/layout';
import NProgress from 'nprogress';

export default {
      layout:Layout,
      props:['studentConfigArray','classConfigArray','subjectId','subjectName', 'gradeConfigArray', 'courseName'],  
     data(){
        return{
           gradesError:[],
           flashMessage:null,
           deleteEnrollmentSpinner:false,
           studentId:0,
           studentSurname:null,
           studentGrade:[],
           studentsWithGrade:[],
           updateButton:false
        }
    },
    methods:{
       storeGrade(){
            this.$inertia.post(`/class/grade`,this.studentGrade, {
                onSuccess:()=>this.updateButton=true
                
            });
       },
       updateGrade(){
            let that=this;
            NProgress.start();
      //      this.$inertia.patch(`/class/grade/updategrade`, this.studentGrade);
             axios.patch(`/class/grade/updategrade`, this.studentGrade)
            .then(response=>{
                if(response.hasOwnProperty('data')){
                    console.log(response);
                    //Deal with data returned from server
                let ServerResponse=response['data'];

                if (ServerResponse.hasOwnProperty('message')){
                    that.flashMessage=response['data'];
                }else{
                    that.gradesError=ServerResponse;
                    console.log(that.gradesError);
                }
                }
                
                NProgress.done();
            })
            .catch(error=>{
                //console.log(error);
                NProgress.done();
                location.reload();
            })
       }
       
    },
    created(){ 
    /**
     * Adds a student to the list if he/she has a grande,
     * this process begins if the gradeConfigArray variable has some data,
     * which means there are marks available
     */

        if(this.gradeConfigArray.length>0){

            for (let i=0; i<this.studentConfigArray.length; i++){
                for (let j=0; j<this.gradeConfigArray.length; j++){
                    if (this.studentConfigArray[i]['id']===this.gradeConfigArray[j]['student_id']){
                         this.updateButton=true;// show the update button if we have marks stred for a specific subject
                                        this.studentGrade.push({
                                            id:this.studentConfigArray[i]['id'],
                                            name:this.studentConfigArray[i]['name'],
                                            surname:this.studentConfigArray[i]['surname'],
                                            grade:this.gradeConfigArray[j]['grade'],
                                            class:this.classConfigArray['id'],
                                            subject: this.subjectId,
                                            operation:`update`
                                        });

                        this.studentsWithGrade.push(this.gradeConfigArray[j]['student_id']);
                                        
                                    }
                }
            }
           
        }
         // Add students without grade to the list
           const studentsWithoutGrade=this.studentConfigArray.filter(student=>{
                    if (this.studentsWithGrade.indexOf(student.id)===-1){
                        this.studentGrade.push({
                            id:student['id'],
                            name:student['name'],
                            surname:student['surname'],
                            grade:null,
                            class:this.classConfigArray['id'],
                            subject: this.subjectId,
                            operation:`create`

                        });
                    }
               });
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
.inputError{
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;
}

.inputError:focus{
 outline-color:#e3352f;
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
.saveGrades{
    position: relative;
    display: flex;
    justify-content: flex-end;
}
.gradeInput{
width: 3rem;
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