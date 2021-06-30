<template>
<div>
  <nav aria-label="...">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a  v-on:click="previousFive" class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
      <li class="page-item" aria-current="page" v-for="page in paginationData" :key="page.link">
        <inertia-link class="page-link"  v-bind:class="[activePageNumber==page.number ? activePageClass : '']"  v-bind:href="page.link">{{page.number}}</inertia-link>
      </li>
      <li class="page-item">
      <a v-on:click="nextFive" class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
    </ul>
  </nav>
</div>
    
</template>
<script>

export default {
  props:['lastPage', 'currentPage','route', 'queryString', 'isSearchable'],
  data(){
    return{
      // varibles to deal with pagination CSS classes
      activePageClass:'active-page',
      activePageNumber:this.currentPage,
      //variable to deal with the last page to be shown to the user
      lastFivePages:0,// stores the last 5 pages or less to be shown to the user
      //varibles to hold data about page numbers and pagination and page links
      paginationData:[],
      isFirstTimePagination:true,// variable tells if paginarion is running for the first time or not
      isFirstTimePagination2: true,// this is the variable for the second confition on the first run
      isLastPaginationGroup:false,//helps detect the last pagination group shown to the user
      runLastPagGroupOnce: false,// run the last page group only once by avoiding an undefined property with paginationData variable properties
      counter:0,

   }
  }, 
    methods:{ 
      paginationInfo(){
        
        // set the value of the pages to be shown to the user
        if(this.lastPage>5 && this.isFirstTimePagination){// only runs for the first 5 page numbers
         // determining if the user gets 1st pagination group or the actual pagination group
          
          if(this.activePageNumber>=1 && this.activePageNumber<=5){
             this.lastFivePages=5;
          }else if(this.activePageNumber>5 && this.activePageNumber<=this.lastPage){
              this.lastFivePages=this.paginationGroup();
               //helps detect the last pagination group shown to the user
                }

          this.isFirstTimePagination=false;
        }else if (this.lastPage<=5 && this.isFirstTimePagination2 ) {
          this.lastFivePages=this.lastPage;
          this.isFirstTimePagination2=false;
        } 
      //builds the array contain data about the pages
        for(let i=0; i<this.lastFivePages; i++){
            if(this.isSearchable){// user info from a search word/sentence
                this.paginationData[i]={
                number:i+1,
                link:`#`//`utilizador?query=${this.queryString}&page=${i+1}` this is for algoria search
              }; 
              break;// remover quando utilizar algoria search
            } 
                  
            else {
              if(i+1<=this.lastPage){
                  this.paginationData[i]={
                    number: i+1,
                    link:`${this.route}?page=${i+1}`
                  }
              }
            }          
       }
      
      // check if there is a need to load the user current page or not
      // before updating the DOM
      //NOTE-only applied for user pages greater than 5, smaller values are correctly handled
      if(this.activePageNumber>5){
        this.paginationData.splice(0,this.lastFivePages-5)
        //handle situations where the value of the `lastFivePages` is greater than
        //the real last page
        if(this.lastFivePages>=this.lastPage){
          this.lastFivePages=this.lastPage;
          //inform Vue this is the last pagination group
          this.isLastPaginationGroup=true;
          this.runLastPagGroupOnce=true;
        }
      }

      },
      nextFive(){ 
        
        this.activePageNumber=1;// before the user goes to the next pg. group the current page is reset to '0', to avoid pagination errros
        if(this.lastPage>5 && this.lastFivePages>=5 && this.lastFivePages<=this.lastPage){
             if((this.lastPage- this.lastFivePages)>5){
                this.lastFivePages+=5;

               this.paginationInfo();
               this.paginationData.splice(0,this.paginationData[this.paginationData.length-1].number-5);// remove unnecessary pages
               //this.$forceUpdate();//->not useful
                //setting the last pagination variable to false
                this.isLastPaginationGroup=false
             }
             else if((this.lastPage-this.lastFivePages)<=5 && (this.lastPage-this.lastFivePages)>=0 && this.runLastPagGroupOnce==false){
              try { 
              let SavelastFivePages=this.lastFivePages;// keep the value of the variable before it changes
              this.lastFivePages+=this.lastPage-this.lastFivePages;
              
              this.paginationInfo();//// load fuction with pagination data
              
                this.paginationData.splice(0,SavelastFivePages);
                
              } catch (error) {
                console.log(`what do you want nigger?`);
              }     
              this.runLastPagGroupOnce=true;
                    
              this.isLastPaginationGroup= true;
              }
        }
      },
      
      previousFive(){
       this.activePageNumber=1;// before moving to next pg. group current page is set to `0` to avoid pagination errors
        /** the condition loads the next  previous pagination group only, starting from
       * the last pagination group
       * */ 
        if(this.isLastPaginationGroup){// if the user sees the last pagination which is not multiple of 5
          this.lastFivePages=this.lastPage-this.paginationData.length;
          // check if the next previous page group is the only one
          if(this.lastFivePages-5==0){
            this.paginationInfo();
            this.paginationData.splice(0,0);
          }else{ // if there are many others, get the next one only.
            this.paginationInfo();
            this.paginationData.splice(0,this.lastFivePages-5);
          }
        // setting the last pagination group to false
        this.isLastPaginationGroup= false;

       }
       else  {
                  
         if(this.lastFivePages-5==0){
            this.paginationInfo();
            this.paginationData.splice(0,0);
         }
         else{
           this.lastFivePages -=this.paginationData.length
           this.paginationInfo();
           this.paginationData.splice(0,this.lastFivePages-5);
         }
       }
       this.runLastPagGroupOnce=false;
      },
      paginationGroup(){// this functions updates the right pagination group information
      
          this.counter=this.activePageNumber;
          while (this.counter<=this.activePageNumber+4 && this.lastFivePages<=this.lastPage) { 
          
            if(this.counter%5==0){
              return this.counter;
            }
          this.counter++;
           
          }
      },
    },
      
    created(){
      this.paginationInfo();// call the fuction which will load iformation about pagination
    }
} 
</script>

<style>
.active-page{
  z-index: 3;
  color: #fff;
  background-color:#3490dc;
  border-color:#3490dc;
}
</style>