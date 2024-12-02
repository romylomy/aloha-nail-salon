'use client'
import React, { useEffect, useState } from 'react';
import About from '@/components/about'
import { Main, Section, Container, Box } from "@/components/craft";

const ParallaxSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 当组件加载时，启动动画
    setAnimate(true);
  }, []);
  return (


    
    <div
      style={{
        backgroundImage:'url("/firstPhoto.jpg"), linear-gradient(to bottom, rgba(0,0,0,0), #F5E9D3)',// 替换为你的背景图片路径
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // 实现视差效果
        height: '50vh', // 设置视差部分的高度为视口高度
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff', // 字体颜色为白色，便于在图片上显示
        textAlign: 'center',
        flexDirection: 'column',
        padding: '0 20px',
      }}

    >
       
    

 

    </div>
  );
};

export default ParallaxSection;