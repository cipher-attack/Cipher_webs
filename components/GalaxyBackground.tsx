
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
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isWarping = false;
    let frame = 0;

    // --- Configuration ---
    const STAR_COUNT = 800;
    const DUST_COUNT = 200;
    const ASTEROID_COUNT = 15;
    
    // --- State Entities ---
    const stars: { x: number; y: number; z: number; size: number; alpha: number; ox: number; oy: number }[] = [];
    const dust: { x: number; y: number; z: number; size: number; speed: number }[] = [];
    const asteroids: { x: number; y: number; z: number; rot: number; speed: number; size: number; shape: number[] }[] = [];
    const shootingStars: { x: number; y: number; len: number; speed: number; angle: number; life: number }[] = [];
    
    // Initialize Stars
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = (Math.random() - 0.5) * width * 3;
      const y = (Math.random() - 0.5) * height * 3;
      stars.push({
        x, y,
        ox: x, oy: y,
        z: Math.random() * 4 + 0.1, // Depth
        size: Math.random() * 1.5,
        alpha: Math.random()
      });
    }

    // Initialize Space Dust
    for (let i = 0; i < DUST_COUNT; i++) {
      dust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 1,
        size: Math.random(),
        speed: Math.random() * 0.5
      });
    }

    // Initialize Asteroids
    for (let i = 0; i < ASTEROID_COUNT; i++) {
       const shape = [];
       const points = 5 + Math.floor(Math.random() * 5);
       for(let j=0; j<points; j++) shape.push(0.8 + Math.random() * 0.4);
       asteroids.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0.5 + Math.random() * 1.5,
          rot: Math.random() * Math.PI,
          speed: (Math.random() - 0.5) * 0.01,
          size: 10 + Math.random() * 20,
          shape
       });
    }

    // Event Listeners
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onScroll = () => { scrollY = window.scrollY; };
    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onMouseDown = () => { isWarping = true; };
    const onMouseUp = () => { isWarping = false; };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // --- DRAWING FUNCTIONS ---

    // 1. Planet Render
    const drawPlanet = () => {
        const cx = width / 2;
        const cy = height + 300 - scrollY * 0.5; // Parallax
        const radius = Math.min(width, height) * 0.8;
        const rotation = frame * 0.002;

        // Planet Atmosphere Glow
        const gradient = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.2);
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(0.5, '#064e3b'); // Dark Green
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Planet Body
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#020617'; // Almost black
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Map Grid / Continents (Procedural)
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI*2);
        ctx.clip(); // Clip to planet sphere

        // Draw "Digital" Continents (Dots)
        const rows = 40;
        const cols = 60;
        for(let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/rows) {
            for(let lon = 0; lon <= Math.PI*2; lon += Math.PI*2/cols) {
                // Sphere mapping
                const rLat = lat; 
                const rLon = lon + rotation; // Spin
                
                // Simple Perlin-ish noise simulation for continents (Africa/Asia shape approx)
                const noise = Math.sin(rLat*3) * Math.cos(rLon*2) + Math.sin(rLon*5 + rLat*2)*0.5;
                
                if (noise > 0.2) {
                    // 3D Projection onto sphere
                    const x = cx + radius * Math.cos(rLat) * Math.cos(rLon);
                    const y = cy + radius * Math.sin(rLat);
                    
                    // Only draw front facing
                    if (Math.cos(rLon) > -0.2) {
                        const size = Math.max(1, (Math.cos(rLon) + 0.5) * 3);
                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI*2);
                        ctx.fillStyle = `rgba(0, 255, 157, ${0.3 + noise * 0.4})`; // Cyber Green
                        ctx.fill();
                    }
                }
            }
        }
        ctx.restore();
    };

    // 2. Aurora Borealis
    const drawAurora = () => {
       const time = frame * 0.01;
       const gradient = ctx.createLinearGradient(0, 0, width, height);
       gradient.addColorStop(0, 'rgba(0,0,0,0)');
       gradient.addColorStop(0.5, 'rgba(0, 255, 157, 0.05)');
       gradient.addColorStop(1, 'rgba(120, 0, 255, 0.05)');

       ctx.fillStyle = gradient;
       ctx.beginPath();
       ctx.moveTo(0, height);
       for(let x=0; x<=width; x+=50) {
           const y = height * 0.7 + Math.sin(x * 0.005 + time) * 100 + Math.cos(x * 0.01 + time * 0.5) * 50;
           ctx.lineTo(x, y);
       }
       ctx.lineTo(width, height);
       ctx.fill();

       // Second Layer
       ctx.fillStyle = 'rgba(50, 200, 255, 0.03)';
       ctx.beginPath();
       ctx.moveTo(0, height);
       for(let x=0; x<=width; x+=50) {
           const y = height * 0.6 + Math.sin(x * 0.003 + time * 1.2) * 120;
           ctx.lineTo(x, y);
       }
       ctx.lineTo(width, height);
       ctx.fill();
    };

    // 3. Stars with Warp & Black Hole Gravity
    const drawStars = () => {
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach(star => {
        // Warp Speed Logic
        if (isWarping) {
            star.z -= 0.1;
            if (star.z <= 0) {
                star.z = 4;
                star.x = (Math.random() - 0.5) * width * 3;
                star.y = (Math.random() - 0.5) * height * 3;
            }
        }

        // Projection
        let x = (star.x - cx) / star.z + cx;
        let y = (star.y - cy - scrollY * 0.5) / star.z + cy;

        // Black Hole Gravity Logic (Mouse interaction)
        if (!isWarping) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const eventHorizon = 250;
            
            if (dist < eventHorizon) {
                const force = (eventHorizon - dist) / eventHorizon;
                x -= dx * force * 0.5; // Bend space inward
                y -= dy * force * 0.5;
            }
        }

        // Draw
        if (x > 0 && x < width && y > 0 && y < height) {
           const size = isWarping ? star.size / star.z * 5 : star.size / star.z;
           const alpha = Math.min(1, 1 / star.z);
           
           ctx.beginPath();
           if (isWarping) {
               // Draw Trails
               const tx = (star.x - cx) / (star.z + 0.5) + cx;
               const ty = (star.y - cy - scrollY * 0.5) / (star.z + 0.5) + cy;
               ctx.moveTo(x, y);
               ctx.lineTo(tx, ty);
               ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
               ctx.lineWidth = size;
               ctx.stroke();
           } else {
               // Normal Star
               ctx.arc(x, y, size, 0, Math.PI * 2);
               ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
               ctx.fill();
               
               // Constellation Connect
               const dMouse = Math.hypot(x - mouseX, y - mouseY);
               if (dMouse < 100) {
                   ctx.beginPath();
                   ctx.moveTo(x, y);
                   ctx.lineTo(mouseX, mouseY);
                   ctx.strokeStyle = `rgba(0, 255, 157, ${1 - dMouse/100})`;
                   ctx.lineWidth = 0.5;
                   ctx.stroke();
               }
           }
        }
      });
    };

    // 4. Asteroid Belt
    const drawAsteroids = () => {
        asteroids.forEach(ast => {
            ast.rot += ast.speed;
            const px = ast.x + Math.cos(frame * 0.005) * 50;
            const py = (ast.y - scrollY * 0.8) % (height * 1.5) - 100;

            if (py > -50 && py < height + 50) {
                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(ast.rot);
                ctx.beginPath();
                ast.shape.forEach((r, i) => {
                    const angle = (i / ast.shape.length) * Math.PI * 2;
                    const ax = Math.cos(angle) * ast.size * r;
                    const ay = Math.sin(angle) * ast.size * r;
                    if(i===0) ctx.moveTo(ax, ay);
                    else ctx.lineTo(ax, ay);
                });
                ctx.closePath();
                ctx.fillStyle = '#1e293b';
                ctx.strokeStyle = '#334155';
                ctx.lineWidth = 1;
                ctx.fill();
                ctx.stroke();
                
                // Light hit
                ctx.beginPath();
                ctx.arc(-ast.size*0.3, -ast.size*0.3, ast.size*0.2, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fill();
                
                ctx.restore();
            }
        });
    };

    // 5. Detailed ISS & 6. Binary Star & 7. Pulsar
    const drawCelestialObjects = () => {
        const cx = width * 0.8;
        const cy = height * 0.2 - scrollY * 0.1;

        // 6. Binary Star (Red Dwarf)
        const time = frame * 0.01;
        const binX = cx + Math.cos(time) * 150;
        const binY = cy + Math.sin(time) * 80;
        
        const binGrad = ctx.createRadialGradient(binX, binY, 5, binX, binY, 30);
        binGrad.addColorStop(0, '#ef4444');
        binGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = binGrad;
        ctx.beginPath();
        ctx.arc(binX, binY, 30, 0, Math.PI*2);
        ctx.fill();

        // 7. Pulsar (Distant Beacon)
        const pulX = width * 0.2;
        const pulY = height * 0.3 - scrollY * 0.05;
        ctx.save();
        ctx.translate(pulX, pulY);
        ctx.rotate(frame * 0.2); // Fast spin
        // Beams
        const beamGrad = ctx.createLinearGradient(-100, 0, 100, 0);
        beamGrad.addColorStop(0, 'transparent');
        beamGrad.addColorStop(0.5, 'rgba(255,255,255,0.8)');
        beamGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(-100, -2, 200, 4);
        // Core
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI*2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();

        // 5. ISS (Orbiting Station)
        const issX = width * 0.5 + Math.sin(frame * 0.005) * (width * 0.4);
        const issY = height * 0.5 + Math.cos(frame * 0.005) * (height * 0.2) - scrollY * 0.2;
        
        ctx.save();
        ctx.translate(issX, issY);
        ctx.rotate(Math.PI / 4);
        
        // Panels
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-40, -10, 30, 20); // Left Array
        ctx.fillRect(10, -10, 30, 20);  // Right Array
        // Core module
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(-15, -5, 30, 10);
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI*2);
        ctx.fillStyle = 'red'; // Beacon light
        if (Math.floor(frame/30)%2===0) ctx.fill();
        
        ctx.restore();
    };

    // 8. Enhanced Comets
    const drawComets = () => {
        if (Math.random() > 0.99) {
            shootingStars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.5,
                len: 0,
                speed: 15 + Math.random() * 5,
                angle: Math.PI / 4,
                life: 1
            });
        }
        
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const s = shootingStars[i];
            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
            s.life -= 0.01;
            s.len = Math.min(s.len + 5, 150);

            if (s.life <= 0) {
                shootingStars.splice(i, 1);
                continue;
            }

            const tailX = s.x - Math.cos(s.angle) * s.len;
            const tailY = s.y - Math.sin(s.angle) * s.len;
            
            const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
            grad.addColorStop(0, '#fff');
            grad.addColorStop(0.2, '#00ff9d');
            grad.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    };
    
    // 10. Space Dust
    const drawDust = () => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        dust.forEach(d => {
            d.y += d.speed;
            if (d.y > height) d.y = 0;
            const py = (d.y - scrollY * 0.5) % height;
            if(py < 0) return;
            ctx.beginPath();
            ctx.arc(d.x, py, d.size, 0, Math.PI*2);
            ctx.fill();
        });
    };

    // --- MAIN RENDER LOOP ---
    const render = () => {
      frame++;
      
      // Clear with Trail Effect
      ctx.fillStyle = isWarping ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(width/2, height, 0, width/2, height, height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#000000');
      if(!isWarping) {
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0,0,width,height);
      }

      drawAurora();
      drawDust();
      drawStars();
      drawPlanet(); // The Rotating Earth
      drawCelestialObjects();
      drawAsteroids();
      drawComets();
      
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};
