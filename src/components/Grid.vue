<template>

  <div>
      <GridIcon v-for="column in hiddenColumns" :key="column"
       icon="fa fa-eye" :name="column" @click="showColumn(column)"
      />

      <table class="table table-bordered table-striped">
          <GridHeader :gridData="grid" @sort="sortBy"
           @hideColumn="hideColumn"/>
          <GridRows v-for="(data, index) in grid" :key="index"
           :rowData="data" @removeItem="removeItem(data)"
           @click="$emit('click', data)"
           />
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
                storedCols:[],
                grid:[],
                header:[],
            }
        },
        created(){
            const grid = this.gridData;
            if(this.hasActionButtons){
                grid.forEach((item)=>item['Ações'] = 'actionButtons');
            }
            this.grid = grid;
            this.header = Object.keys(this.grid[0]);
        },
        methods:{
            hideColumn(colName){
                const columns = Object.keys(this.grid[0]).filter(colname=>
                    colname!==colName)

                const storedCols = {[colName]:this.grid.slice().map(row=>row[colName])};

                this.grid.map(row=>
                    Vue.delete(row, colName)
                )
                this.hiddenColumns.push(colName);
                this.storedCols.push(storedCols)
            },
            showColumn(column){
                const restoreData = this.storedCols.filter((item)=>
                    item[column]!==undefined)[0][column]
                /*Iterate over this.grid based on this.header
                if row[col] is undefined, add data from restoreData
                */
                var restoredGrid = this.grid.map(item=>new Object);
                this.header.forEach((col,)=>{
                    this.grid.forEach((row, index)=>{
                        if(row[col]===undefined){
                            restoredGrid[index][column]=restoreData[index]
                        }
                        else{
                            restoredGrid[index][col]=row[col]
                        }
                    })
                })
                this.grid = restoredGrid;
                /*Needs to remove slice hiddenColumns and storedCols data
                refactor and change some variables names
                Check if is there are any unused vars
                Review the code.
                Teste.
                Merge in to master.

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
