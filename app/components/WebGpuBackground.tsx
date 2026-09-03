/// <reference types="@webgpu/types" />
"use client";

import { useEffect, useRef } from "react";

const SHADER = `
struct Uniforms {
  time: f32,
  aspect: f32,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs(@builtin(vertex_index) vi: u32) -> VSOut {
  var p = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f( 3.0, -1.0),
    vec2f(-1.0,  3.0),
  );
  var out: VSOut;
  out.pos = vec4f(p[vi], 0.0, 1.0);
  out.uv = p[vi] * 0.5 + 0.5;
  return out;
}

@fragment
fn fs(@location(0) uv: vec2f) -> @location(0) vec4f {
  let x = uv.x * u.aspect;
  let y = uv.y;

  let cw = 0.032;
  let ch = 0.058;
  let col = floor(x / cw);
  let row = floor(y / ch);

  let rnd = fract(sin(col * 127.1 + 311.7) * 43758.5453);
  let speed = 0.15 + rnd * 0.25;
  let head = 1.0 - fract(u.time * speed + rnd * 20.0);

  let cellY = (row + 0.5) * ch;
  let d = (cellY - head) / ch;

  let glyph = fract(sin(dot(vec2f(col, row), vec2f(127.1, 311.7))) * 43758.5453);
  let isHead = abs(d) < 0.5;
  let trail = step(0.0, d) * exp(-d * 0.35);
  let lit = select(step(0.6, glyph) * trail, 1.0, isHead);

  let color = vec3f(0.62, 0.70, 0.92);
  let bg = vec3f(0.965, 0.975, 1.0);

  return vec4f(mix(bg, color, clamp(lit, 0.0, 1.0) * 0.35), 1.0);
}
`;

export default function WebGpuBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !("gpu" in navigator)) return;

    let disposed = false;
    let rafId = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    const init = async () => {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter || disposed) return;
      const device = await adapter.requestDevice();
      if (!device || disposed) return;

      const ctx = canvas.getContext("webgpu");
      if (!ctx) return;
      const format = navigator.gpu.getPreferredCanvasFormat();
      ctx.configure({ device, format, alphaMode: "opaque" });

      const shaderModule = device.createShaderModule({ code: SHADER });

      const bindGroupLayout = device.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.FRAGMENT,
            buffer: { type: "uniform" },
          },
        ],
      });

      const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      });

      const pipeline = device.createRenderPipeline({
        layout: pipelineLayout,
        vertex: { module: shaderModule, entryPoint: "vs" },
        fragment: { module: shaderModule, entryPoint: "fs", targets: [{ format }] },
        primitive: { topology: "triangle-list" },
      });

      const uniformBuffer = device.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });

      resize();
      window.addEventListener("resize", resize);

      const render = () => {
        if (disposed) return;

        const time = (performance.now() - start) / 1000;
        const aspect = canvas.width / Math.max(canvas.height, 1);
        device.queue.writeBuffer(
          uniformBuffer,
          0,
          new Float32Array([time, aspect, 0, 0]),
        );

        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: ctx.getCurrentTexture().createView(),
              clearValue: { r: 0.965, g: 0.975, b: 1.0, a: 1 },
              loadOp: "clear",
              storeOp: "store",
            },
          ],
        });
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.draw(3);
        pass.end();
        device.queue.submit([encoder.finish()]);

        rafId = requestAnimationFrame(render);
      };

      render();
    }

    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
