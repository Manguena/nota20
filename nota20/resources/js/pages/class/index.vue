<template>
    <div class="container">
            <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
                    <span class="center-msg">Escola &nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp; {{schoolAction}} com sucesso</span>                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item" aria-current="page"><inertia-link href="/class/course">Curso</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Turma</li>
        </ol>
        </nav>
        <!--- SUBJECT FORM--->
        <form class="create-user-form" >
           <h4>Turma</h4>
            <p></p>
         <div class="form-row">
               <div class="form-group col-md-5">
                    <label for="turma">Nome</label>
                    <input type="text" class="form-control" v-model="className" v-bind:class="inputClassNameError"  id="classname">
                    <div class="text-danger" v-if="classNameError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{classNameError}}</small></div>
                </div>
                <div class="form-group col-md-2">
                    <label for="turma">Ano lectivo</label>
                    <input type="text" class="form-control" v-model="schoolYear" v-bind:class="inputSchoolYearError"  id="classyear">
                    <div class="text-danger" v-if="schoolYearError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{schoolYearError}}</small></div>
                </div>
                <div class="form-group col-md-5">
                    <Searchpane
                        v-bind:searchRoute="searchRoute" 
                        v-bind:label="label"
                        v-bind:searchItemError="searchItemError"
                        v-on:send-search-item="getSentSearchItem"
                    >
                    </Searchpane>
                </div>
               
             </div>
             <button class="btn btn-primary" v-on:click="submit" type="button">
                <span v-if="subjectFeedbackSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Criar Turma
             </button>
        <p></p>
        </form>

        <!---CLASS TABLE AND TABLE UPDATE FORM-->
       
        <!------>
    <br/>
        <div id="viewEditForm"></div>
        <form class="create-user-form" >
           <h4 id="">Curso de: {{courseName}} </h4>
            <p></p>
         <div class="form-row" v-if="enableClassUpdateForm">
               <div class="form-group col-md-6" >
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-model="classUpdateForm.className" v-bind:class="updateClassNameError"  id="superadmin">
                    <div class="text-danger" v-if="classUpdateError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{classUpdateError}}</small></div>
                </div>
                <div class="form-group col-md-2" >
                    <label for="apelido">Ano Lectivo</label>
                    <input type="text" class="form-control" v-model="classUpdateForm.schoolYear" v-bind:class="updateSchoolYearError"  id="superadmin">
                    <div class="text-danger" v-if="yearUpdateError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{yearUpdateError}}</small></div>
                </div>
                <div class="form-group col-md-4">
                        <label for="name" class="remove_label">&nbsp;</label>                    
                        <div class="btn-group"> 
                            <button class="btn btn-success form-control" v-on:click="updateClass()" type="button">
                                <span v-if="classUpdateSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Actualizar
                            </button>
                             <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-on:click="cancelClassUpdate()">Cancelar</a>
                        </div>
                        </div>
                </div>
         </div>
            
        <p></p>
        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Nível</th>
                    <th scope="col">Ano Lectivo</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in classArray" :key="item.id"> 
                    <td><inertia-link v-bind:href="'/class/'+item.id">{{item.name}}</inertia-link></td>
                    <td>{{item.level}}</td>
                    <td>{{item.year}}</td>
                    
                    <td><button class="table-button" v-on:click="editClass(item.id, item.name,item.year, item.level)" type="button"><font-awesome-icon class="table-edit" :icon="['fas', 'edit']"/></button></td>
                      <td><button class="table-button" v-on:click="deleteClass(item.id, courseId)" type="button">
                            <span v-if="deleteClassSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            <font-awesome-icon class="table-delete" :icon="['fas', 'trash']"/>
                        </button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div> 
        </form>
        <div class="class-pagination">
              <Pagination 
                v-bind:lastPage="lastPage"
                v-bind:currentPage="activePage"
                v-bind:route="route"
                v-bind:isSearchable="isSearchable"
                v-bind:queryString="queryString"
            >
        </Pagination>
        </div>
   <!--link to be clicked authomatically using code-->
   <inertia-link id="subjectLink" v-bind:href="'/class/'+courseName+'/'+courseId"></inertia-link>
    
    <!--Modal text-->

    
    <div class="modal fade " id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  not-authorized modal-xl">
    <div class="modal-content ">
        <p>403 | THIS ACTION IS  UNAUTHORIZED</p>
    </div>
  </div>
</div>
    <!--End of modal text-->
    </div>
</template>
<script>
import Layout from '../shared/layout';
import Searchpane from '../shared/searchpane';
import Pagination from '../shared/pagination';


export default {
  components: { 
      Searchpane,
      Pagination 
  },
    layout:Layout,
    props:[
        //pagination props
        'lastPage',
        'currentPage',
        'route',
        'isSearchable',
        'queryString',

        //Other props
        'courseName',
        'courseId',
        'classConfigArray',
        ],
     data(){
        return{
            //variable for the current active page in the pagination
            activePage:this.currentPage,
            //varibles to send to searchpane component
            searchRoute:'/subject/search?searchItemData',// we are going to use the route of another controller to get the level
            label:'Nível',
            //subjcet variables
            classUpdateForm:{
                schoolYear:'',
                className:'',
                classId:'',
                levelName:''
            },
            //class variables
            className:null,
            schoolYear:null,
            classArray:this.classConfigArray,
            enableClassUpdateForm:false,
            searchItemId:'',
            searchCourseArray:[],
            classNameError:null,
            schoolYearError:null,
            classUpdateError:null,
            yearUpdateError:null,
            searchItemError:null,

            classUpdateSpinner:false,
            subjectFeedbackSpinner:false,
            deleteClassSpinner:false,

            searchItemName:null,
        }
    },
    methods:{
        
        //Takes the result returned from the search
         getSentSearchItem(itemName,itemId){
             if(itemId==-1){
                
             }else{
             this.searchItemName=itemName;
             this.searchItemId=itemId;
             }
         },
 
    // Submits the form
         submit(){
      /*  this.$inertia.post('/class',
          {
                className:this.className,
                levelName:this.searchItemName,
                levelId:this.searchItemId,
                courseId:this.courseId,
                schoolYear:this.schoolYear
            } 
          );***/
           
            let that=this;
            that.subjectFeedbackSpinner=true;
            axios.post('/class', {
                className:that.className,
                levelName:that.searchItemName,
                levelId:that.searchItemId,
                courseId:that.courseId,
                schoolYear:that.schoolYear
            })
            .then(function (response) {
                //CHECK FOR ERROR MESSAGES
                if(response['data'].hasOwnProperty('className') ){
                   
                   that.classNameError=response['data']['className']['0'];
                   
                }else{
                   that.classNameError=null;
                    
                }
                
                if(response['data'].hasOwnProperty('levelName')){
                    that.searchItemError=response['data']['levelName']['0'];
                }else{
                    that.searchItemError=null;
                }

                if(response['data'].hasOwnProperty('schoolYear')){
                    that.schoolYearError=response['data']['schoolYear']['0'];
                }else{
                    that.schoolYearError=null;
                }
                
               if(response['data'].hasOwnProperty('id')){

                   that.classArray.unshift(
                       {
                           id:response['data']['id'],
                           name:response['data']['name'],
                           level:response['data']['level'],
                           year:response['data']['year']
                       }
                   );


                   // clear the input  fields
                  that.$children['0']['_data']['searchItem']='';//changing a children varible

                   that.className=null;
                   that.schoolYear=null;
               }
               // Disable the spinner
                    that.subjectFeedbackSpinner=false
            })
            .catch(function (error) {
                $('#modal').modal('show');
            })
            .then( (error) =>{
               that.searchItemName=null;
            });
        },

    //edit the selected subject
    editClass(id, name, year,level){
        this.enableClassUpdateForm=true;
        document.getElementById('viewEditForm').scrollIntoView();

        this.classUpdateForm.classId=id;
        this.classUpdateForm.className=name;
        this.classUpdateForm.schoolYear=year;
        this.classUpdateForm.levelName=level;

       // console.log(this.classUpdateForm.classId);
    },
    //disable the subjcet update form
    cancelClassUpdate(){
        this.enableClassUpdateForm=false;
    },

    //Update the subject name
    updateClass(){
            /*** 
            this.$inertia.patch(`/class/${this.classUpdateForm.classId}`,{
                className:this.classUpdateForm.className,
                schoolYear:this.classUpdateForm.schoolYear,
                levelName:this.classUpdateForm.levelName,// this won't be validated because the user wont have access to it

            } 
          ); ***/

        
        let that=this;
        this.classUpdateSpinner=true;
        axios.patch(`/class/${that.classUpdateForm.classId}`,{
            className:that.classUpdateForm.className,
            schoolYear:that.classUpdateForm.schoolYear,
            levelName:that.classUpdateForm.levelName,// this won't be validated because the user wont have access to it

        })
            .then((response)=>{
              //checking for arror and alert users
               if(response['data'].hasOwnProperty('className') ){
                   
                   that.classUpdateError=response['data']['className']['0'];
            
                }else{
                   that.classUpdateError=null;
                    
                }

                if(response['data'].hasOwnProperty('schoolYear')){
                    that.yearUpdateError=response['data']['schoolYear']['0'];
                }else{
                    that.yearUpdateError=null;
                }

                // If there is no error update the class in the page
                
                 if(response['data'].hasOwnProperty('id')){
                     that.classArray.forEach(function(item, index, array) {

                    if(item['id']==response['data']['id']){
                        item['name']=response['data']['name'];
                        item['year']=response['data']['year'];
                        //disale the class update form
                        that.enableClassUpdateForm=false;
                    }
                    });
               }

              that.classUpdateSpinner=false// disable the spinner
            })
            .catch((error)=>{
                $('#modal').modal('show');
            }) 
    },

    // delete the selected subject
    deleteClass(id, courseId){
        let that=this;

        this.deleteClassSpinner=true;
       // this.$inertia.delete(`/class/${id}/${courseId}`);//for testing
        
        axios.delete(`/class/${id}/${courseId}`)
            .then((response)=>{
              that.classArray=response['data'];
              that.deleteClassSpinner=false;

                //programatically click a link
               document.getElementById("subjectLink").click();
            })
            .catch((error)=>{
                    $('#modal').modal('show');
            })
    }
    },
    computed: {
        inputClassNameError() {
            return {
            inputError: this.classNameError,
            'inputError:focus': this.classNameError
            }
        },
        inputSchoolYearError(){
            return{
                inputError: this.schoolYearError,
                'inputError:focus': this.schoolYearError
            }
        },

        updateClassNameError(){
            return {
                inputError: this.classUpdateError,
                'inputError:focus': this.classUpdateError
            
            }
        },
        updateSchoolYearError(){
            return {
                inputError: this.yearUpdateError,
                'inputError:focus': this.yearUpdateError
            
            }
        }

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

.create-user-form a{
    color: black;
}
.course-name{
    margin-bottom: 1rem;
    margin-top: 1.5rem;
}

.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;
}

.page-navigation{
    margin-top: 2rem;
}

.center-msg{
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-group, .btn-group-vertical {
    position: relative;
    display: flex;
    vertical-align: middle;
}

form h4{
    font-weight: 700;
}

.table-light, .table-light > th, .table-light > td {
    background-color: #e2e2eb;
}

.table-delete{
    color: #dc2020;
}

.table-edit{
    color: #6b6316;
}

.table-button{
    background-color: #e2e2eb;
}

.class-pagination{
    margin-top: 1rem;
}

.not-authorized{
    max-width: 100%;


}

.not-authorized{
    margin-top: 2.938rem;
    margin-right: 3.063rem;
    margin-left: 3.188rem;
      
  }

.not-authorized div{
    background: rgb(247 250 252);
    box-sizing: border-box;
    border: 0 solid #e2e8f0;
    height:86vh;
    position: relative;
    display: flex;
    align-items: center;
    align-content: center;
}

.not-authorized p{
font-family: 'Nunito', sans-serif;
    font-size: 1.125rem;
    line-height: 1.5;
    letter-spacing: .05em;
    color: rgba(160,174,192,1);
    position: relative;
    display: flex;
    height: 100%;
    align-content: center;
    align-items: center;
    
    

  }

    @media screen and (min-width: 992px){
  

  
}    


@media screen and (min-width: 992px){
   .create-user-form, .page-navigation, .course-name,.class-pagination {
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