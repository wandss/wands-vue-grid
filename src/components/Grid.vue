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

                const index = this.hiddenColumns.indexOf(column)
                
                const restoredGrid = []
                for(let i in this.grid){
                    restoredGrid.push({})
                }

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
                this.storedCols.splice(index, 1)
                this.hiddenColumns.splice(index, 1)

                /*Refactor and change some variables names
                Check if there are any unused vars
                Review the code.
                Test.
                Merge in to master.

                TODO:
                Merge this.storedCols and this.hiddenCols into an unique Array.
                    or make this.hiddenCols a computed property based on
                    this.storedCols(seems to be the best way)

                */

            },

            removeItem(row){
                const index = this.grid.map((item)=>item.id).indexOf(row.id);
                if(this.storedCols.length>0){
                    this.storedCols.forEach((storedItems=>{
                        for(let item in storedItems){
                            storedItems[item].splice(index, 1)
                        }
                    }))
                }
                
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
