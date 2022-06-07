import React, { useEffect ,useState} from 'react';
import { Space, Input, Button, Checkbox,message } from 'antd';
import { Link ,Navigate} from "react-router-dom";
import ReactECharts from 'echarts-for-react';
import axios from 'axios'
import qs from 'qs'
import './Home.css' 

interface Item{
  index:number,
  url:string,
  imgurl:string,
  text:string[]
}

interface State{
  load:boolean,
  Login:boolean,
  data:{
    [key:string]:Item[]
  }
}
const getDate=()=>{
  axios.get('/api/dataInfo').then((res)=>{
    if(res.data.data){
      message.success('爬取成功')
    }else{
      message.error('爬取失败')
    }
  })
}
const showDate=()=>{
  axios.get('/api/showInfo').then((res)=>{
    if(res.data.data){
    
    }else{
      message.error('失败')
    }
  })
}

 const Home:React.FC=()=>{
  const [Login,setLogin]=useState(true)
  const [load,setLoad]=useState(false)
  const [data,setData]=useState(null)
  const getOption:()=>echarts.EChartsOption=()=>{
    return{
      title: {
        text: 'bilibili '
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
  }
  useEffect(()=>{
    axios.get('api/islogin').then((res)=>{
      console.log(res)
      if(!res.data?.data){
        setLogin(false)
      
      }
      setLoad(true)
      
    })
  },[])
  if(Login){
    if(load){
      return (<div className="content"> 
      <Space size={10} align='center'>
      <Button type="primary" onClick={getDate}>
          爬取
        </Button>
        <Button type="primary" onClick={()=>showDate}>
          展示
        </Button>
      </Space>
        
      <ReactECharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        className="echarts"
      />
        
       </div>)
    }
    return null
  }
  return <Navigate to='/login' />
 
}
export default Home;