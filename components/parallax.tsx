import React, { useEffect, useState } from 'react';

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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // 实现视差效果
        height: '100vh', // 设置视差部分的高度为视口高度
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff', // 字体颜色为白色，便于在图片上显示
        textAlign: 'center',
        flexDirection: 'column',
        padding: '0 20px',
      }}
    >
      <h1 style={{ fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          opacity: animate ? 1 : 0, // 动画开始前设置透明度为0
          transform: animate ? 'translateY(0)' : 'translateY(20px)', // 上浮效果
          transition: 'all 0.8s ease-out', }}>
        Aloha Nails
      </h1>
      <p style={{
          fontSize: '1.5rem',
          maxWidth: '800px',
          lineHeight: '1.6',
          opacity: animate ? 1 : 0, // 动画开始前设置透明度为0
          transform: animate ? 'translateY(0)' : 'translateY(20px)', // 上浮效果
          transition: 'all 0.8s ease-out 0.3s', // 延迟 0.3 秒后启动过渡效果
        }}>
        Every client experience is important. Aloha Nails – a nail salon located in Crowfoot NW Calgary, in addition to providing efficient quality service, we also focus on emotional values. From the joys of employees to customer satisfaction, we believe that everyone can share the joy to create a better service environment.
      </p>
      <a
        href="booking"
        className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
        style={{
          marginTop: '20px',
          fontSize: '1.25rem',
          opacity: animate ? 1 : 0, // 动画开始前设置透明度为0
          transform: animate ? 'translateY(0)' : 'translateY(20px)', // 上浮效果
          transition: 'all 0.8s ease-out 0.6s', // 延迟 0.6 秒后启动过渡效果
        }}
      >
        Book Now
      </a>
    </div>
  );
};

export default ParallaxSection;