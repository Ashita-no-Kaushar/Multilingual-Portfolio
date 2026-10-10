"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodeCount = isMobile ? 26 : 48;
    const connectionDistance = isMobile ? 110 : 150;
    const pulseSpeed = reduceMotion ? 0.12 : 0.35;
    const mouseRadius = isMobile ? 90 : 130;

    let width = 0;
    let height = 0;
    let rafId = 0;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);
    const mouse = { x: -9999, y: -9999 };
    const nodes: NodePoint[] = [];

    const createNodes = () => {
      nodes.length = 0;
      for (let index = 0; index < nodeCount; index++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.4 + Math.random() * 1.4,
        });
      }
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createNodes();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = (time: number) => {
      const timeSeconds = time * 0.001;
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];

        if (!reduceMotion) {
          node.x += node.vx;
          node.y += node.vy;
        }

        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1;
        }
        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1;
        }

        const dxMouse = node.x - mouse.x;
        const dyMouse = node.y - mouse.y;
        const distanceToMouse = Math.hypot(dxMouse, dyMouse);
        if (distanceToMouse < mouseRadius) {
          const force = (mouseRadius - distanceToMouse) / mouseRadius;
          node.x += (dxMouse / (distanceToMouse || 1)) * force * 1.8;
          node.y += (dyMouse / (distanceToMouse || 1)) * force * 1.8;
        }
      }

      for (let left = 0; left < nodes.length; left++) {
        for (let right = left + 1; right < nodes.length; right++) {
          const first = nodes[left];
          const second = nodes[right];
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const distance = Math.hypot(dx, dy);

          if (distance > connectionDistance) {
            continue;
          }

          const alpha = 1 - distance / connectionDistance;
          context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.18})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();

          const pulse = ((timeSeconds * pulseSpeed) + (left * 0.13 + right * 0.07)) % 1;
          const pulseX = first.x + dx * pulse;
          const pulseY = first.y + dy * pulse;

          context.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
          context.beginPath();
          context.arc(pulseX, pulseY, 1.6, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        context.fillStyle = "rgba(255, 255, 255, 0.75)";
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "rgba(255, 255, 255, 0.08)";
        context.beginPath();
        context.arc(node.x, node.y, node.radius * 2.4, 0, Math.PI * 2);
        context.fill();
      }

      rafId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseLeave, { passive: true });
    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
