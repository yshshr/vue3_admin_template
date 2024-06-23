<template>
  <el-card>
    <el-table border style="margin: 10px 0px;" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px">
      </el-table-column>
      <el-table-column label="名称" show-overflow-tooltip="true" width="150px" prop="skuName">
      </el-table-column>
      <el-table-column label="描述" show-overflow-tooltip="true" width="150px" prop="skuDesc">
      </el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height: 100px;" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight">
      </el-table-column>
      <el-table-column label="价格" width="150px" prop="price">
      </el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{row,$index}">
          <el-button type="primary" size="small" :icon="row.isSale==1?'Top':'Bottom'" @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled" @click="findSkuInfo(row)"></el-button>
          <el-popconfirm :title="`您确定要删除${row.skuName}吗？`" @confirm="removeSku(row)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>      
    </el-table>
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :background="true"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change	="getSkuList"
        @size-change ="handler"
      />
      <el-drawer v-model="drawer">
        <template #header>
          <h4>查看商品的详情</h4>
        </template>
        <template #default>
          <div>
            <el-row style="margin:10px 0px">
              <el-col :span="6" :xs="0">名称</el-col>
              <el-col :span="18" :xs="24">{{skuInfo.skuName}}</el-col>
            </el-row>
            <el-row style="margin:10px 0px">
              <el-col :span="6" :xs="0">描述</el-col>
              <el-col :span="18" :xs="24">{{skuInfo.skuDesc}}</el-col>
            </el-row>
            <el-row style="margin:10px 0px">
              <el-col :span="6" :xs="0">价格</el-col>
              <el-col :span="18" :xs="24">{{skuInfo.price}}</el-col>
            </el-row>
            <el-row style="margin:10px 0px">
              <el-col :span="6" :xs="0">平台属性</el-col>
              <el-col :span="18" :xs="24">
                <el-tag v-for="item in skuInfo.skuAttrValueList" style="margin:5px 5px">{{item.valueName}}</el-tag>
              </el-col>
            </el-row>
            <el-row style="margin:10px 0px">
              <el-col :span="6" :xs="0">销售属性</el-col>
              <el-col :span="18" :xs="24">
                <el-tag v-for="item in skuInfo.skuSaleAttrValueList" style="margin:5px 5px">{{item.saleAttrValueName}}</el-tag>
              </el-col>
            </el-row>
            <el-row style="margin:10px 0px">
              <el-col :span="6" :xs="0">商品图片</el-col>
              <el-col :span="18" :xs="24">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
                    <img :src="item.imgUrl" alt="" style="width:100%;height: 100%;" />
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-drawer>
  </el-card>
</template>

<script setup lang=ts>
  import { ref,onMounted } from 'vue';
  import {reqSkuList,reqSkuCancelSale,reqSkuSale,reqGetSkuInfo,reqRemoveSku} from '@/api/product/sku'
  import type {GetSkuListResponseData,SkuData} from '@/api/product/sku/type'
  import { ElMessage } from 'element-plus';


  let currentPage = ref<number>(1);
  let pageSize = ref<number>(10);
  let total = ref<number>(100);
  let skuArr = ref<SkuData[]>([]);
  let drawer = ref<boolean>(false);
  let skuInfo = ref<any>({});

  onMounted(()=>{
    getSkuList()
  })

const getSkuList = async(pager=1)=>{
  currentPage.value = pager;
  let result:GetSkuListResponseData = await reqSkuList(currentPage.value,pageSize.value);
    if(result.code==200){
      total.value=result.data.total;
      skuArr.value = result.data.records;
    }
}

const handler = ()=>{
  getSkuList();
}

const updateSale = async(row:SkuData)=>{
  if(row.isSale==1){
    await reqSkuCancelSale(row.id);
    ElMessage({
      type:'success',
      message:'SKU下架成功'
    })
  }else{
    await reqSkuSale(row.id);
    ElMessage({
      type:'success',
      message:'SKU上架成功'
    })
  }
  getSkuList(currentPage.value);
}


const updateSku = ()=>{
  ElMessage({
    type:'success',
    message:'功能研发中，敬请期待！'
  }) 
}

const findSkuInfo =async(row:SkuData)=>{
  drawer.value=true;
  let result = await reqGetSkuInfo(row.id);
  if(result.code==200){
    skuInfo.value = result.data;
  }
}

const removeSku = async(row:SkuData)=>{
  let result = await reqRemoveSku(row.id);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    getSkuList(skuArr.value.length>1?currentPage.value:currentPage.value-1);
  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
