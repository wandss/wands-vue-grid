<template>
  <div class="row">
      <div class="col-sm-12">
        <Grid :gridData="gridData" :hasActionButtons="true"
         @deleteItem="getItem" :confirmDelete="confirmDelete"/>
      </div>  
  </div>
</template>
<script>
    import Grid from './components/Grid';
    export default{
        name:'APP',
        components:{Grid, },
        data(){
            return{
                gridData:[{id:1, movie:"Monty Python and the Holy Grail", year:1975, 
                        genre:'Comedy'},
                    {id:2, movie:"Pulp Fiction", year:1994, 
                        genre:['Drama', 'Crime']},
                    {id:3, movie:"The Green Mile", year:1999,
                        genre:['Crime','Drama','Fantasy','Mistery']},
                    {id:4, movie:"Requiem For a Dream", year:1999, 
                        genre:'Drama'},
                    ],
                selectedItem:undefined,
                confirmDelete:false,
            }
        },
        methods:{
            getItem(item){
                console.log('YAYAYAYAYA')
                const index = this.gridData.map((item=>
                    item.id)).indexOf(item.id)
                console.log(index)
                this.confirmDelete=!this.deleteItem 
            }
        },
        computed:{

        }
    }
</script>
<style>
    @import './assets/css/bootstrap.min.css';
    @import './assets/css/font-awesome.min.css';
</style>

<!--TODO:
    Improve "sortBy" method. Try to use it in computed??
    Join object values defined as array: ['Crime', 'Drama'] to "Crima, Drama"
    Add input to Filter array
    Try to format date as a javascript Date object.
    Treat key error at GridRows
-->
