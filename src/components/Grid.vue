<template>

  <div>
      <GridIcon v-for="column in hiddenColumns" :key="column"
          icon="fa fa-eye" :name="column" @click="showColumn(column)"/>
      <table class="table table-bordered table-striped">
          <GridHeader :gridData="grid" @sort="sortBy"
           @hideColumn="hideColumn"/>
          <GridRows v-for="(data, index) in grid " :key="index"
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
                removedCols:[],
                grid:[],
                originalGrid:[],
            }
        },
        created(){
            const grid = this.gridData;
            if(this.hasActionButtons){
                grid.forEach((item)=>item['Ações'] = 'actionButtons');
            }
            this.grid = grid;
            this.originalGrid = grid;
        },
        methods:{
            hideColumn(colName){
                console.log('Hiding column '+colName)
                const columns = Object.keys(this.grid[0]).filter(colname=>
                    colname!==colName)

                const removedCols = this.grid.map(row=>row[colName]).map(item=>{
                    return {[colName]:item}
                });
                this.removedCols.push(removedCols)
                //Save the data from the removed col. Push this array
                //to hiddenColumns

                columns.map((col)=>this.grid.forEach((row, index)=>{
                    //console.log({[col]:row[col]})

                    if(Object.keys(row).indexOf(col)===index){
                        console.log(row)
                    }

                    // if index === indexOf return the row
                }
                ));


                this.grid.map(row=>
                    Vue.delete(row, colName)
                )
                this.hiddenColumns.push(colName);
            },
            showColumn(column){
                console.log(column)
                console.log(this.removedCols)
                console.log(this.removedCols[0])
                this.grid.forEach((row, index)=>{
                    Vue.set(row, column, this.removedCols[0][index][column])
                   // row[column]=this.removedCols[0][index][column]
                })



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
