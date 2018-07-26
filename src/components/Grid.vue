<template>
  <div>
      <table class="table table-bordered table-striped">
          <GridHeader :gridData="grid" @click="sortBy" />
          <GridRows :gridData="grid" @click="getRow"/>
      </table>
  </div>
</template>
<script>
    import GridHeader from './GridHeader';
    import GridRows from './GridRows';
    export default{
        name:'Grid',
        props:['gridData'],
        components:{GridHeader, GridRows },
        data(){
            return {
                grid:this.gridData,
                sortedBy:'',
            }
        },
        methods:{
            getRow(item){
            // eslint-disable-next-line
                console.log(item)
            // eslint-disable-next-line
                console.log(item.id)
            },
            sortBy(col){
            // eslint-disable-next-line
                const newGrid = this.grid.slice();

                if(col === this.sortedBy){
                    newGrid.reverse((a,b)=>{
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
                    newGrid.sort((a,b)=>{
                        if(a[col] > b[col]){
                            return 1
                        }
                        if(a[col] < b[col]){
                            return -1
                        }
                        else{return 0}
                    })
                }
                this.grid = newGrid;
                this.sortedBy = col;
            }
        }
  }
</script>
<style>
</style>
