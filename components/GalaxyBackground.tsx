
import React, { useEffect, useRef } from 'react';

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let scrollY = window.scrollY;

    // --- Configuration ---
    const STAR_COUNT = 800;
    const SHOOTING_STAR_INTERVAL = 150;
    
    // --- State ---
    const stars: { x: number; y: number; z: number; size: number; alpha: number; twinkleSpeed: number }[] = [];
    const shootingStars: { x: number; y: number; len: number; speed: number; angle: number; angleSpeed: number; life: number }[] = [];
    const nebulaClouds: { x: number; y: number; radius: number; color: string; speed: number }[] = [];
    let frame = 0;

    // Initialize Stars with depth (z)
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 2, // Spread vertically for scroll
        z: Math.random() * 2 + 0.5,    // Parallax factor
        size: Math.random() * 1.5,
        alpha: Math.random(),
        twinkleSpeed: 0.005 + Math.random() * 0.01
      });
    }

    // Initialize Nebulas
    const colors = ['rgba(76, 29, 149, 0.1)', 'rgba(59, 130, 246, 0.08)', 'rgba(16, 185, 129, 0.05)'];
    for(let i=0; i<6; i++) {
      nebulaClouds.push({
        x: Math.random() * width,
        y: Math.random() * height * 1.5,
        radius: 200 + Math.random() * 300,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: (Math.random() - 0.5) * 0.2
      });
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);

    // --- Drawing Functions ---

    const drawNebula = (ctx: CanvasRenderingContext2D) => {
      nebulaClouds.forEach(cloud => {
        // Move slightly
        cloud.x += cloud.speed;
        if(cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if(cloud.x < -cloud.radius) cloud.x = width + cloud.radius;

        // Parallax y
        const py = cloud.y - scrollY * 0.2; 

        if (py > -cloud.radius && py < height + cloud.radius) {
            const grad = ctx.createRadialGradient(cloud.x, py, 0, cloud.x, py, cloud.radius);
            grad.addColorStop(0, cloud.color);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(cloud.x - cloud.radius, py - cloud.radius, cloud.radius * 2, cloud.radius * 2);
        }
      });
    };

    const drawPlanet = (ctx: CanvasRenderingContext2D) => {
      const basePx = width * 0.8;
      const basePy = height * 0.8;
      const py = basePy - scrollY * 0.1;
      const px = basePx;

      const radius = Math.min(width, height) * 0.35; 

      if (py - radius > height || py + radius < 0) return;

      ctx.save();
      
      // 1. Atmosphere Glow
      const glow = ctx.createRadialGradient(px, py, radius * 0.8, px, py, radius * 1.5);
      glow.addColorStop(0, 'rgba(0, 150, 255, 0.15)'); 
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. Planet Base
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.clip(); 

      const planetGrad = ctx.createRadialGradient(px - radius * 0.3, py - radius * 0.3, 0, px, py, radius);
      planetGrad.addColorStop(0, '#0f172a');   
      planetGrad.addColorStop(1, '#020617');   
      ctx.fillStyle = planetGrad;
      ctx.fill();

      // 3. Realistic Continent Mapping
      const rotation = frame * 0.002;
      
      // Continent Centers (Lat, Lon, Radius)
      // Lat: -90 (S) to 90 (N), Lon: -180 (W) to 180 (E)
      const continents = [
        // Africa (Central/South)
        { lat: 10, lon: 20, r: 40 },
        { lat: -20, lon: 25, r: 25 },
        // Eurasia
        { lat: 50, lon: 10, r: 25 }, // Europe
        { lat: 60, lon: 60, r: 50 }, // Russia
        { lat: 30, lon: 80, r: 25 }, // India
        { lat: 35, lon: 110, r: 35 }, // China
        // Americas
        { lat: 40, lon: -100, r: 35 }, // NA
        { lat: -15, lon: -60, r: 28 }, // SA
        // Australia
        { lat: -25, lon: 135, r: 20 },
        // Antarctica
        { lat: -80, lon: 0, r: 30 }
      ];

      const degToRad = (deg: number) => deg * (Math.PI / 180);

      const cols = 72; // Longitude resolution
      const rows = 36; // Latitude resolution

      ctx.fillStyle = 'rgba(0, 255, 157, 0.6)'; // Cyber Green

      for(let latIdx = 0; latIdx <= rows; latIdx++) {
          const lat = (latIdx / rows) * 180 - 90;
          const theta = degToRad(90 - lat); // 0 to PI
          
          for(let lonIdx = 0; lonIdx <= cols; lonIdx++) {
              let lon = (lonIdx / cols) * 360 - 180;
              
              // Apply Rotation
              let rotLon = lon + (rotation * 180 / Math.PI);
              // Wrap around
              while(rotLon > 180) rotLon -= 360;
              while(rotLon < -180) rotLon += 360;

              // Check if point is inside any continent blob
              let isLand = false;
              for(const cont of continents) {
                  // Simplified spherical distance check
                  const dLat = lat - cont.lat;
                  // Handle longitude wrap distance
                  let dLon = rotLon - cont.lon;
                  if(dLon > 180) dLon -= 360;
                  if(dLon < -180) dLon += 360;
                  
                  const dist = Math.sqrt(dLat*dLat + dLon*dLon);
                  
                  // Add some noise to edges for realistic coastline look
                  const noise = Math.sin(lat * 0.4) * Math.cos(rotLon * 0.4) * 5;
                  
                  if (dist < cont.r + noise) {
                      isLand = true;
                      break;
                  }
              }

              if(isLand) {
                  const phi = (lonIdx / cols) * 2 * Math.PI + rotation; // Display position
                  
                  // Cartesian conversion
                  const x3d = radius * Math.sin(theta) * Math.cos(phi);
                  const y3d = radius * Math.cos(theta);
                  const z3d = radius * Math.sin(theta) * Math.sin(phi);

                  if (z3d > 0) {
                       const scale = (z3d + radius * 2) / (radius * 3);
                       const size = 2 * scale;
                       
                       ctx.globalAlpha = Math.max(0.2, z3d / radius);
                       ctx.beginPath();
                       ctx.arc(px + x3d, py + y3d, size, 0, Math.PI * 2);
                       ctx.fill();
                  }
              }
          }
      }
      ctx.globalAlpha = 1;

      // 4. Grid Overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Longitude Lines
      for(let i = 0; i < 6; i++) {
          const offset = (frame * 0.2 + i * 60) % 360;
          const radOffset = offset * (Math.PI / 180);
          const xScale = Math.cos(radOffset);
          
          ctx.beginPath();
          ctx.ellipse(px, py, Math.abs(radius * xScale), radius, 0, 0, Math.PI * 2);
          ctx.stroke();
      }
      
      // Latitude Lines
      for(let i = 1; i < 4; i++) {
          const yOff = (i / 4) * radius * 2 - radius;
          const latRad = Math.sqrt(radius*radius - yOff*yOff);
          ctx.beginPath();
          ctx.moveTo(px - latRad, py + yOff);
          ctx.lineTo(px + latRad, py + yOff);
          ctx.stroke();
      }

      // 5. Shadow
      const shadowGrad = ctx.createRadialGradient(px - radius*0.5, py - radius*0.5, radius * 0.2, px, py, radius * 1.1);
      shadowGrad.addColorStop(0, 'transparent'); 
      shadowGrad.addColorStop(0.6, 'rgba(0,0,0,0.5)');
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0.95)'); 
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();

      // 6. Rim
      ctx.beginPath();
      ctx.arc(px, py, radius, Math.PI * 0.8, Math.PI * 1.7);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(100, 255, 218, 0.6)';
      ctx.stroke();

      ctx.restore();
    };

    const drawStars = () => {
      stars.forEach(star => {
        const py = (star.y - scrollY * star.z) % (height * 1.5); 
        const finalY = py < 0 ? py + height * 1.5 : py;

        if (finalY > height) return;

        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed *= -1;

        ctx.beginPath();
        ctx.arc(star.x, finalY, star.size * star.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
    };

    const drawShootingStars = () => {
      if (frame % SHOOTING_STAR_INTERVAL === 0 && Math.random() > 0.4) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5, 
          len: 100 + Math.random() * 80,
          speed: 15 + Math.random() * 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, 
          angleSpeed: 0,
          life: 1.0
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.02;

        if (s.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const endX = s.x - Math.cos(s.angle) * s.len;
        const endY = s.y - Math.sin(s.angle) * s.len;

        const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
        grad.addColorStop(0, `rgba(100, 255, 218, ${s.life})`);
        grad.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    };

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const spaceGrad = ctx.createLinearGradient(0, 0, 0, height);
      spaceGrad.addColorStop(0, '#000000');
      spaceGrad.addColorStop(1, '#050a14');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      drawNebula(ctx);
      drawStars();
      drawPlanet(ctx);
      drawShootingStars();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};
