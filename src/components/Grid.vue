<template>
  <div>
      <table class="table table-bordered table-striped">
          <GridHeader :gridData="grid" @sort="sortBy" />
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
            grid(){
                const grid = this.gridData;
                if(this.hasActionButtons){
                    grid.forEach((item)=>item['Ações'] = 'actionButtons');
                }
                return grid
            },
        },
        methods:{
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
