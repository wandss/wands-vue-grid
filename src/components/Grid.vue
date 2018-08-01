<template>
  <div>
      <table class="table table-bordered table-striped">
          <GridHeader :gridData="grid" @click="sortBy" />
          <GridRows v-for="(data, index) in grid " :key="index" 
           :rowData="data" @removeItem="removeItem(data)"
           @click="$emit('click', data)"/>
      </table>
  </div>
</template>
<script>
    import GridHeader from './GridHeader';
    import GridRows from './GridRows';
    export default{
        name:'Grid',
        props:['gridData','hasActionButtons',],
        components:{GridHeader, GridRows },
        data(){
            return {
                sortedBy:'',
            }
        },
        computed:{
            grid:{
                get(){
                    const grid = this.gridData;
                    if(this.hasActionButtons){
                        grid.forEach((item)=>item['Ações'] = 'actionButtons');
                    }
                    return grid
                },
                set(newGrid){
                    this.grid = newGrid;
                }
            }
        },
        methods:{
            removeItem(row){
                const index = this.grid.map((item)=>item.id).indexOf(row.id);
                this.grid.splice(index, 1);
            },
            sortBy(col){
            // eslint-disable-next-line
                const newGrid = this.grid.slice();
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
