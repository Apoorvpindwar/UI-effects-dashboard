
import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to full window size
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeParticles();
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Setup canvas context
    const context = canvas.getContext('2d');
    if (context) {
      contextRef.current = context;
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles
    initializeParticles();
    
    // Start animation loop
    startAnimationLoop();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const initializeParticles = () => {
    if (!canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    const particleCount = 30;
    
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 20 + 5,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100}, ${Math.random() * 255}, 0.5)`
      });
    }
  };

  const startAnimationLoop = () => {
    const animate = () => {
      if (!contextRef.current || !canvasRef.current) return;
      
      const ctx = contextRef.current;
      const { width, height } = canvasRef.current;
      const mouse = mouseRef.current;
      
      // Clear canvas with a semi-transparent background for trailing effect
      ctx.fillStyle = 'rgba(30, 10, 60, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(76, 29, 149, 0.5)'); // Purple
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0.2)'); // Blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x > width || particle.x < 0) particle.speedX *= -1;
        if (particle.y > height || particle.y < 0) particle.speedY *= -1;
        
        // React to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 300;
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          particle.speedX -= force * dx * 0.01;
          particle.speedY -= force * dy * 0.01;
        }
        
        // Draw particle as a blurred circle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0, 
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(30, 10, 60, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Connect particles with lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ background: 'linear-gradient(135deg, #1e1a45 0%, #2d1b4e 100%)' }}
    />
  );
};

export default InteractiveBackground;
