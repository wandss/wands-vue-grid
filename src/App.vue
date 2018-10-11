<template>
    <div class="container-fluid">
      <div class="row">
          <div class="col-sm-12 col-md-12">
              <Grid :gridData="gridData" :hasActionButtons="true" 
               :hasSearchField="true" :gridConfig="gridConfig" @click="handleClick"
               :actions="actions"    
              />
          </div>
      </div>
  </div>
</template>
<script>
    import Grid from './components/Grid';
    import axios from 'axios';
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
                    {id:1971, movie:"A Clockwork Orange", year:1971,
                        genre:'Sci-Fi'},
                    ],
                gridConfig:[
                    {id:'id', colName:'ID', hidden:true},
                    {id:'movie', colName:'Filmes',},
                    {id:'genre', colName:'Gênero', hidden:false},
                ],
                gridConfig:[],
                actions:[
                    {title:'Visualizar', icon:'fa fa-eye', 
                        event:function view(value){alert(value)}},
                    {title:'Excluir', icon:'fa fa-trash', 
                        event:function remove(item){alert(item.id)}}
                ],
            }
        },
        created(){
            this.actions.push({title:'Selecionar', 
                icon:'fa fa-check', event:this.selectRow})
        },
        methods:{
            handleClick(event, data){
                event(data)
            },
            selectRow(data){
                if(Object.keys(data).indexOf('rowColor')===-1){
                    this.$set(data, 'rowColor', '#44ed594d')
                }
                else{
                    this.$delete(data, 'rowColor')
                }
            }
        },
    }
</script>
<style>
    @import './assets/css/bootstrap.min.css';
    @import './assets/css/font-awesome.min.css';
</style>

<!--TODO:
    Improve "sortBy" method. Try to use it in computed??
    Add input to Filter array
    Try to format date as a javascript Date object.
-->
