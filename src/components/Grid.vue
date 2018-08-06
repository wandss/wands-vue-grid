<template>
  <div>
      <table class="table table-bordered table-striped">
<<<<<<< HEAD
          <GridHeader :gridData="grid" @sort="sortBy" />
          <GridRows v-for="(data, index) in grid " :key="index"
=======
          <GridHeader :gridData="grid" @sort="sortBy"
           @hideColumn="hideColumn"/>
          <GridRows v-for="(data, index) in grid " :key="index" 
>>>>>>> 578b7147b0d04c9e1753cfcfa4bbdfa5be343b9d
           :rowData="data" @removeItem="removeItem(data)"
           @click="$emit('click', data)"/>
      </table>
  </div>
</template>
<script>
    import GridHeader from './GridHeader';
    import GridRows from './GridRows';
    import Vue from 'vue';

    export default{
        name:'Grid',
        props:['gridData','hasActionButtons',],
        components:{GridHeader, GridRows },
        data(){
            return {
                sortedBy:'',
                hiddenColumns:[],
            }
        },
        computed:{
            grid(){
                const grid = this.gridData;
                if(this.hasActionButtons){
                    grid.forEach((item)=>item['Ações'] = 'actionButtons');
                }
                return grid
            },
        },
        methods:{
            hideColumn(item){
                console.log('Hiding column '+item)
                const columns = Object.keys(this.grid[0]).filter(colname=>
                    colname!==item)
                const newGrid = []
                columns.map(col=>this.grid.slice().map(row=>
                    newGrid.push({col:row[col]})))
                
                console.log(newGrid)
                /*
                this.grid.map(row=>
                    Vue.delete(row, item)
                )
                console.log(this.grid)
                */
            },

            removeItem(row){
                const index = this.grid.map((item)=>item.id).indexOf(row.id);
                this.grid.splice(index, 1);
            },
            sortBy(col){
                if(col === this.sortedBy){
                    this.grid.reverse((a,b)=>{
                        if(a[col] > b[col]){
                            return 1
                        }
                        if(a[col] < b[col]){
                            return -1
                        }
                        else{return 0}
                    })
                }
                else{
                    this.grid.sort((a,b)=>{
                        if(a[col] > b[col]){
                            return 1
                        }
                        if(a[col] < b[col]){
                            return -1
                        }
                        else{return 0}
                    })
                }
                this.sortedBy = col;
            }
        }
  }
</script>
<style>
</style>
