const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/EffectComposer.BAxweMNB.js","_astro/three.module.iOYB3rD4.js","_astro/CopyShader.BzTUYzf6.js","_astro/Pass.C7jPAEVN.js","_astro/RenderPass.CbCLlHbP.js","_astro/OutputPass.DyAvi0F0.js","_astro/UnrealBloomPass.Z9t2svEr.js"])))=>i.map(i=>d[i]);
const Jt="modulepreload",Tt=function(T){return"/"+T},kt={},Se=function(Ge,ce,le){let ee=Promise.resolve();if(ce&&ce.length>0){let k=function(p){return Promise.all(p.map(m=>Promise.resolve(m).then(F=>({status:"fulfilled",value:F}),F=>({status:"rejected",reason:F}))))};document.getElementsByTagName("link");const W=document.querySelector("meta[property=csp-nonce]"),e=W?.nonce||W?.getAttribute("nonce");ee=k(ce.map(p=>{if(p=Tt(p),p in kt)return;kt[p]=!0;const m=p.endsWith(".css"),F=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${F}`))return;const z=document.createElement("link");if(z.rel=m?"stylesheet":Jt,m||(z.as="script"),z.crossOrigin="",z.href=p,e&&z.setAttribute("nonce",e),document.head.appendChild(z),m)return new Promise((oe,P)=>{z.addEventListener("load",oe),z.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${p}`)))})}))}function te(k){const W=new Event("vite:preloadError",{cancelable:!0});if(W.payload=k,window.dispatchEvent(W),!W.defaultPrevented)throw k}return ee.then(k=>{for(const W of k||[])W.status==="rejected"&&te(W.reason);return Ge().catch(te)})},Rt={src:"/_astro/earth_day.d1pdJ3jg.jpg",width:2048,height:1024,format:"jpg",orientation:1},Ht={src:"/_astro/earth_clouds.DOLuqenA.jpg",width:2048,height:1024,format:"jpg"},Et={src:"/_astro/earth_lights.CS8wFlFC.png",width:2048,height:1024,format:"png"},eo={src:"/_astro/moon.D_Wp7Gh9.jpg",width:1024,height:512,format:"jpg"},at={src:"/_astro/pillars_a.BM_S8Gg1.jpg",width:1280,height:1335,format:"jpg"},to=document.getElementById("ds-bg");if(to){let T=function(){const p=document.documentElement.scrollHeight-window.innerHeight;k=p<=0?0:Math.min(1,Math.max(0,window.scrollY/p))},Ge=function(e,p){const m=p.LOW,F=document.createElement("div");F.className="ds-canvas is-loading",document.body.appendChild(F);const z=document.createElement("div");z.className="ds-scrim";const oe=t=>{const o=Math.min(1,Math.max(0,t));return o<=.34?1:o<=.52?1-y(.34,.52,o)*.55:.45*(1-y(.52,.74,o))};T(),z.style.setProperty("--ds-scrim-opacity",oe(k).toFixed(3)),document.body.appendChild(z);const P=new e.WebGLRenderer({antialias:!m,alpha:!0,powerPreference:"high-performance"});let ne=Math.min(window.devicePixelRatio,m?1.5:2);P.setPixelRatio(ne),P.setSize(window.innerWidth,window.innerHeight,!1),P.outputColorSpace=e.SRGBColorSpace,P.toneMapping=e.ACESFilmicToneMapping,P.toneMappingExposure=m?.82:.86,P.domElement.style.pointerEvents="none",F.appendChild(P.domElement);const x=new e.Scene;x.fog=new e.FogExp2(263692,22e-8);const w=new e.PerspectiveCamera(52,window.innerWidth/window.innerHeight,4,6e5),Q=420,xe=2e4,rt=150,$=new e.Vector3(xe,0,0),Ot=40,it=new e.Vector3(xe+300,90,720),de=t=>Math.min(1,Math.max(0,t)),X=(t,o,n)=>t+(o-t)*n;function y(t,o,n){const a=de((n-t)/(o-t));return a*a*(3-2*a)}const st=`
        float dsHash(vec3 p) {
          p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float dsNoise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(dsHash(i + vec3(0, 0, 0)), dsHash(i + vec3(1, 0, 0)), f.x),
                mix(dsHash(i + vec3(0, 1, 0)), dsHash(i + vec3(1, 1, 0)), f.x), f.y),
            mix(mix(dsHash(i + vec3(0, 0, 1)), dsHash(i + vec3(1, 0, 1)), f.x),
                mix(dsHash(i + vec3(0, 1, 1)), dsHash(i + vec3(1, 1, 1)), f.x), f.y),
            f.z);
        }
        float dsFbm(vec3 p, int oct) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 8; i++) {
            if (i >= oct) break;
            v += a * dsNoise(p);
            p *= 2.02;
            a *= 0.5;
          }
          return v;
        }
        /** 脊状噪声：给丝状结构（日冕喷流、星云筋络）用 */
        float dsRidge(vec3 p, int oct) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 8; i++) {
            if (i >= oct) break;
            float n = 1.0 - abs(dsNoise(p) * 2.0 - 1.0);
            v += a * n * n;
            p *= 2.06;
            a *= 0.5;
          }
          return v;
        }
      `;function Le(t,o,n=256){const a=document.createElement("canvas");a.width=a.height=n;const i=a.getContext("2d"),r=i.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);r.addColorStop(0,t),r.addColorStop(.32,o),r.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=r,i.fillRect(0,0,n,n);const c=new e.CanvasTexture(a);return c.colorSpace=e.SRGBColorSpace,c}function ct(t=128){const o=document.createElement("canvas");o.width=o.height=t;const n=o.getContext("2d"),a=t/2,i=n.createRadialGradient(a,a,0,a,a,a*.4);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.5,"rgba(214,238,255,0.5)"),i.addColorStop(1,"rgba(150,200,255,0)"),n.fillStyle=i,n.fillRect(0,0,t,t),n.globalCompositeOperation="lighter";const r=(u,d,h,g)=>{const l=n.createLinearGradient(a,a,u,d);l.addColorStop(0,"rgba(255,255,255,"+g+")"),l.addColorStop(.4,"rgba(200,230,255,"+g*.25+")"),l.addColorStop(1,"rgba(150,200,255,0)"),n.strokeStyle=l,n.lineWidth=h,n.lineCap="round",n.beginPath(),n.moveTo(a,a),n.lineTo(u,d),n.stroke()};r(t,a,1.6,.95),r(0,a,1.6,.95),r(a,0,1.6,.95),r(a,t,1.6,.95),r(t*.84,t*.16,.9,.4),r(t*.16,t*.84,.9,.4),n.globalCompositeOperation="source-over";const c=new e.CanvasTexture(o);return c.colorSpace=e.SRGBColorSpace,c}function It(t=256,o=64){const n=document.createElement("canvas");n.width=t,n.height=o;const a=n.getContext("2d"),i=a.createImageData(t,o),r=i.data;for(let u=0;u<o;u++){const d=u/(o-1)*2-1,h=Math.pow(Math.max(0,1-d*d),1.6);for(let g=0;g<t;g++){const l=g/(t-1),A=Math.pow(1-l,1.9),f=.86+.14*Math.sin(l*42)*Math.sin(l*11),M=Math.pow(A*h*f,.9),C=(u*t+g)*4;r[C]=255,r[C+1]=252,r[C+2]=245,r[C+3]=Math.round(Math.min(1,M)*255)}}a.putImageData(i,0,0);const c=new e.CanvasTexture(n);return c.colorSpace=e.SRGBColorSpace,c}function lt(t,o){const n=document.createElement("canvas");n.width=n.height=t;const a=n.getContext("2d"),i=a.createImageData(t,t),r=i.data,c=(d,h,g)=>{const l=(K,ye,ie)=>{let be=Math.sin(K*12.9898+ye*78.233+ie*37.719+o)*43758.5453;return be-Math.floor(be)},A=Math.floor(d),f=Math.floor(h),M=Math.floor(g),C=d-A,G=h-f,_=g-M,I=C*C*(3-2*C),U=G*G*(3-2*G),D=_*_*(3-2*_),L=(K,ye,ie)=>K+(ye-K)*ie;return L(L(L(l(A,f,M),l(A+1,f,M),I),L(l(A,f+1,M),l(A+1,f+1,M),I),U),L(L(l(A,f,M+1),l(A+1,f,M+1),I),L(l(A,f+1,M+1),l(A+1,f+1,M+1),I),U),D)};for(let d=0;d<t;d++)for(let h=0;h<t;h++){const g=(h/t-.5)*2,l=(d/t-.5)*2,A=Math.sqrt(g*g+l*l),f=Math.pow(Math.max(0,1-A),2.1);if(f<=.001){const D=(d*t+h)*4;r[D]=r[D+1]=r[D+2]=r[D+3]=0;continue}let M=0,C=.5,G=0;for(let D=0;D<4;D++){const L=2.6*Math.pow(2,D),K=1-Math.abs(c(g*L+3.1,l*L+7.7,D*2.3)*2-1);M+=C*K*K,G+=C,C*=.52}const _=M/G,I=Math.pow(de((_-.42)*2.2),1.5)*f,U=(d*t+h)*4;r[U]=255,r[U+1]=255,r[U+2]=255,r[U+3]=Math.round(I*255)}a.putImageData(i,0,0);const u=new e.CanvasTexture(n);return u.colorSpace=e.SRGBColorSpace,u}function Ae(t,o=!0){const n=typeof t=="string"?t:t.src,a=new e.TextureLoader().load(n);return o&&(a.colorSpace=e.SRGBColorSpace),a.anisotropy=P.capabilities.getMaxAnisotropy(),a.wrapS=e.RepeatWrapping,a}const Ce={uTime:{value:0},uPixelRatio:{value:ne}};function ke(t,o,n,a,i,r=.18){const c=new Float32Array(t*3),u=new Float32Array(t*3),d=new Float32Array(t),h=new Float32Array(t),g=new e.Color;for(let f=0;f<t;f++){const M=o+Math.pow(Math.random(),.6)*(n-o),C=Math.random()*Math.PI*2,G=Math.acos(2*Math.random()-1);c[f*3]=M*Math.sin(G)*Math.cos(C),c[f*3+1]=M*Math.cos(G)*.72,c[f*3+2]=M*Math.sin(G)*Math.sin(C);const _=Math.random()<r;g.setHSL(_?.07+Math.random()*.06:.53+Math.random()*.12,.28+Math.random()*.3,.62+Math.random()*.36),u[f*3]=g.r,u[f*3+1]=g.g,u[f*3+2]=g.b,d[f]=a+Math.random()*(i-a),h[f]=Math.random()*Math.PI*2}const l=new e.BufferGeometry;l.setAttribute("position",new e.BufferAttribute(c,3)),l.setAttribute("aColor",new e.BufferAttribute(u,3)),l.setAttribute("aSize",new e.BufferAttribute(d,1)),l.setAttribute("aPhase",new e.BufferAttribute(h,1));const A=new e.Points(l,new e.ShaderMaterial({uniforms:Ce,transparent:!0,depthWrite:!1,blending:e.AdditiveBlending,fog:!1,vertexShader:`
              attribute float aSize;
              attribute float aPhase;
              attribute vec3 aColor;
              uniform float uTime;
              uniform float uPixelRatio;
              varying vec3 vColor;
              varying float vFlick;
              void main() {
                vColor = aColor;
                // 闪烁：低频 + 每个点不同相位，避免整片同步呼吸
                vFlick = 0.62 + 0.38 * sin(uTime * 0.7 + aPhase);
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mv;
                gl_PointSize = aSize * uPixelRatio * (320.0 / max(-mv.z, 1.0));
              }
            `,fragmentShader:`
              varying vec3 vColor;
              varying float vFlick;
              void main() {
                vec2 d = gl_PointCoord - 0.5;
                float r = length(d);
                if (r > 0.5) discard;
                float a = smoothstep(0.5, 0.02, r);
                gl_FragColor = vec4(vColor, a * vFlick);
              }
            `}));return A.frustumCulled=!1,A}const dt=ke(m?4200:9e3,6e4,3e5,55,150),ut=ke(m?2600:5600,24e3,11e4,70,210),mt=ke(m?1100:2400,5e3,6e4,100,320);x.add(dt,ut,mt);{const t=m?26:58,o=new Float32Array(t*3),n=new Float32Array(t*3),a=new e.Color;for(let c=0;c<t;c++){const u=2e4+Math.random()*15e4,d=Math.random()*Math.PI*2,h=Math.acos(2*Math.random()-1);o[c*3]=u*Math.sin(h)*Math.cos(d),o[c*3+1]=u*Math.cos(h)*.7,o[c*3+2]=u*Math.sin(h)*Math.sin(d);const g=Math.random()<.24;a.setHSL(g?.09:.57,.3,.9),n[c*3]=a.r,n[c*3+1]=a.g,n[c*3+2]=a.b}const i=new e.BufferGeometry;i.setAttribute("position",new e.BufferAttribute(o,3)),i.setAttribute("color",new e.BufferAttribute(n,3));const r=new e.Points(i,new e.PointsMaterial({size:2600,sizeAttenuation:!0,vertexColors:!0,map:ct(128),transparent:!0,opacity:.8,depthWrite:!1,blending:e.AdditiveBlending,fog:!1}));r.frustumCulled=!1,x.add(r);var Ut=r}const ht=m?1600:4200,Ve=new Float32Array(ht*3);for(let t=0;t<ht;t++)Ve[t*3]=(Math.random()-.5)*9e4,Ve[t*3+1]=(Math.random()-.5)*26e3,Ve[t*3+2]=(Math.random()-.5)*46e3;const ft=new e.BufferGeometry;ft.setAttribute("position",new e.BufferAttribute(Ve,3));const pt=new e.Points(ft,new e.PointsMaterial({color:10467032,size:46,sizeAttenuation:!0,transparent:!0,opacity:.5,depthWrite:!1,blending:e.AdditiveBlending,fog:!1}));x.add(pt);const Pe=new e.Group;x.add(Pe);{const t=lt(256,1.7),o=lt(256,9.3),n=[{x:2e3,y:1200,z:-18e3,c:3108816,s:46e3,o:.2,t:0},{x:12e3,y:-2600,z:16e3,c:9063380,s:52e3,o:.17,t:1},{x:26e3,y:4200,z:-22e3,c:2068358,s:48e3,o:.16,t:1},{x:-16e3,y:5200,z:12e3,c:12729466,s:42e3,o:.15,t:0},{x:34e3,y:-5200,z:28e3,c:14252586,s:38e3,o:.14,t:0},{x:8e3,y:9e3,z:-34e3,c:14722620,s:34e3,o:.1,t:1},{x:-3e4,y:-3e3,z:-2e4,c:12470878,s:44e3,o:.12,t:1},{x:46e3,y:2e3,z:-8e3,c:3846312,s:4e4,o:.11,t:0},{x:0,y:0,z:-9e4,c:2375790,s:12e4,o:.1,t:0},{x:2e4,y:-2e4,z:-7e4,c:4861818,s:1e5,o:.09,t:1}],a=[];n.forEach((i,r)=>{const c=new e.Sprite(new e.SpriteMaterial({map:i.t?o:t,color:i.c,transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending,opacity:i.o,fog:!1}));c.position.set(i.x,i.y,i.z),c.scale.setScalar(i.s),c.renderOrder=-10,Pe.add(c),a.push({sp:c,base:i.o,phase:r*1.31})});var Nt=a}const ae=new e.Sprite(new e.SpriteMaterial({transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending,opacity:.46,fog:!1}));ae.scale.set(46e3,48e3,1),ae.renderOrder=-11,x.add(ae);{const t=new Image;t.onload=()=>{const o=document.createElement("canvas");o.width=t.width,o.height=t.height;const n=o.getContext("2d");n.drawImage(t,0,0),n.globalCompositeOperation="destination-in";const a=o.width/2,i=o.height/2,r=n.createRadialGradient(a,i,Math.min(o.width,o.height)*.1,a,i,Math.max(o.width,o.height)*.46);r.addColorStop(0,"rgba(0,0,0,1)"),r.addColorStop(.55,"rgba(0,0,0,0.72)"),r.addColorStop(.85,"rgba(0,0,0,0.18)"),r.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=r,n.fillRect(0,0,o.width,o.height);const c=new e.CanvasTexture(o);c.colorSpace=e.SRGBColorSpace,ae.material.map=c,ae.material.needsUpdate=!0},t.src=typeof at=="string"?at:at.src}const _e={uTime:{value:0},uIntensity:{value:1},uDetail:{value:0}},Oe=new e.Mesh(new e.SphereGeometry(Q,128,84),new e.ShaderMaterial({uniforms:_e,fog:!1,vertexShader:`
            varying vec3 vObjPos;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            void main() {
              vObjPos = position;
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vNormalW = normalize(mat3(modelMatrix) * normal);
              vViewDirW = normalize(cameraPosition - wp.xyz);
              gl_Position = projectionMatrix * viewMatrix * wp;
            }
          `,fragmentShader:`
            precision highp float;
            varying vec3 vObjPos;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            uniform float uTime;
            uniform float uIntensity;
            uniform float uDetail;

            ${st}

            void main() {
              vec3 n = normalize(vObjPos);
              float fres = 1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDirW)), 0.0, 1.0);

              /* ── 米粒组织：三层不同频率的对流元胞 ──
                 最细的一层用脊状噪声的反相画胞界（胞界比胞心暗），
                 这是真实太阳表面最有辨识度的特征。 */
              float g1 = dsFbm(n * 6.0 + vec3(0.0, uTime * 0.020, 0.0), 4);
              float g2 = dsFbm(n * 15.0 - vec3(uTime * 0.016, 0.0, uTime * 0.011), 3);
              float cells = dsRidge(n * 30.0 + vec3(uTime * 0.012, 0.0, 0.0), 2);
              float granule = (g1 * 0.58 + g2 * 0.30) * (1.0 - cells * 0.34);

              /* 大尺度对流：让明暗真的在流动 */
              float flow = dsFbm(n * 2.3 + vec3(uTime * 0.048, uTime * 0.030, 0.0), 3);
              float heat = clamp(granule * 0.72 + flow * 0.48, 0.0, 1.0);

              /* ── 近视细节 ──────────────────────────────────────
                 远景时上面那几层就够了；但相机贴到太阳旁边时，
                 日面会铺满 40° 的视场，n*6 这种低频噪声就退化成
                 一片平滑的黄色。这里补两层高频米粒：
                   中层 n*58   负责"颗粒"的整体密度
                   高层 n*130  负责颗粒内部的细碎结构
                 胞界（dsRidge 的反相）压暗，才有真实太阳表面那种
                 "元胞之间是暗缝"的质感。
                 与地球的做法一致：只在近景开启，远景自动归零。 */
              if (uDetail > 0.01) {
                float midGrain = dsFbm(n * 58.0 + vec3(0.0, uTime * 0.06, uTime * 0.04), 3);
                float fineGrain = dsFbm(n * 130.0 - vec3(uTime * 0.09, 0.0, 0.0), 2);
                float cellWall = dsRidge(n * 96.0 + vec3(uTime * 0.03, 0.0, 0.0), 2);

                // 颗粒亮度：两层叠加后归一化
                float grain = midGrain * 0.62 + fineGrain * 0.38;
                // 胞界压暗：元胞边缘比胞心暗，这是太阳表面最标志性的特征
                grain *= 1.0 - cellWall * 0.42;

                // 用近景细节替换一部分原 heat，保留大尺度明暗分布
                heat = mix(heat, heat * 0.32 + grain * 1.06, uDetail * 0.92);
              }

              /* 色温分层：核心白热 -> 亮黄 -> 金橙 -> 边缘深橙红 */
              vec3 deep   = vec3(0.86, 0.19, 0.014);
              vec3 mid    = vec3(1.00, 0.55, 0.085);
              vec3 bright = vec3(1.00, 0.87, 0.54);
              vec3 hot    = vec3(1.00, 0.99, 0.96);
              vec3 col = mix(deep, mid, smoothstep(0.06, 0.48, heat));
              col = mix(col, bright, smoothstep(0.38, 0.72, heat));
              col = mix(col, hot, smoothstep(0.70, 0.97, heat));

              /* 黑子 + 半影 */
              float spotF = dsFbm(n * 3.4 + vec3(uTime * 0.006, 41.0, 0.0), 3);
              float spot = smoothstep(0.62, 0.79, spotF);
              float pen = smoothstep(0.57, 0.65, spotF) * (1.0 - spot);
              col = mix(col, col * 0.26, spot * 0.88);
              col = mix(col, col * 0.72, pen * 0.5);

              /* 耀斑：黑子附近的亮斑 */
              float flare = dsRidge(n * 9.0 + vec3(0.0, uTime * 0.032, uTime * 0.021), 2);
              col += vec3(1.0, 0.76, 0.34) * smoothstep(0.70, 0.96, flare) * spot * 1.1;

              /* 临边昏暗 */
              col *= mix(1.0, 0.62, pow(fres, 1.22));

              /* 边缘白炽环：这颗恒星最容易被认出来的特征 */
              /* 近景时这圈环会覆盖很大一片面积、把细节冲掉，
                 所以按 uDetail 衰减。 */
              float rimFade = 1.0 - uDetail * 0.55;
              col += vec3(1.0, 0.98, 0.93) * pow(fres, 3.1) * 1.25 * rimFade;
              col += vec3(1.0, 0.60, 0.19) * pow(fres, 1.6) * 0.42 * rimFade;

              // 热辐射：暗部也带一点自发光，避免死黑
              col += vec3(0.16, 0.09, 0.03) * pow(heat, 3.0);

              gl_FragColor = vec4(col * uIntensity, 1.0);
            }
          `}));Oe.renderOrder=1;const ue=new e.Group;ue.add(Oe);const vt=[{s:Q*2.5,i:"rgba(255,226,170,0.22)",m:"rgba(255,150,48,0.10)"},{s:Q*5,i:"rgba(255,196,112,0.13)",m:"rgba(255,118,26,0.055)"},{s:Q*9,i:"rgba(255,164,72,0.07)",m:"rgba(255,96,18,0.025)"}],jt=vt.map((t,o)=>{const n=new e.Sprite(new e.SpriteMaterial({map:Le(t.i,t.m,256),transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending,fog:!1}));return n.scale.setScalar(t.s),n.renderOrder=3+o,ue.add(n),n});ue.add(new e.PointLight(16767392,2.4,0,0));const Ie=new e.Sprite(new e.SpriteMaterial({map:Le("rgba(255,252,240,0.95)","rgba(255,190,110,0.42)",256),transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending,fog:!1}));Ie.renderOrder=8,ue.add(Ie),x.add(ue),x.add(new e.AmbientLight(2767444,.55));const me={uTime:{value:0},uSunDir:{value:new e.Vector3(-1,0,0)},uDetail:{value:0},uDayMap:{value:Ae(Rt)},uCloudMap:{value:Ae(Ht,!1)},uLightsMap:{value:Ae(Et)}},ze=new e.Mesh(new e.SphereGeometry(rt,m?96:144,m?64:96),new e.ShaderMaterial({uniforms:me,fog:!1,vertexShader:`
            varying vec2 vUv;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            varying vec3 vObjPos;
            void main() {
              vUv = uv;
              vObjPos = position;
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vNormalW = normalize(mat3(modelMatrix) * normal);
              vViewDirW = normalize(cameraPosition - wp.xyz);
              gl_Position = projectionMatrix * viewMatrix * wp;
            }
          `,fragmentShader:`
            precision highp float;
            varying vec2 vUv;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            varying vec3 vObjPos;
            uniform float uTime;
            uniform float uDetail;
            uniform vec3 uSunDir;
            uniform sampler2D uDayMap;
            uniform sampler2D uCloudMap;
            uniform sampler2D uLightsMap;

            ${st}

            void main() {
              vec3 N = normalize(vNormalW);
              vec3 L = normalize(uSunDir);
              vec3 V = normalize(vViewDirW);
              vec3 n = normalize(vObjPos);
              float ndl = dot(N, L);
              float lit = smoothstep(-0.18, 0.30, ndl);

              /* ── 日面 ── */
              vec3 day = texture2D(uDayMap, vUv).rgb;
              float lum = dot(day, vec3(0.299, 0.587, 0.114));

              /* 程序化细节补偿：贴图只有 2K，特写时会糊。
                 这里在贴图之上叠一层与地形相关的高频噪声 ——
                 它只在近景（uDetail 高）明显，远景自动消失，
                 效果是"地表有颗粒质感"，而不是"放大了一张小图"。 */
              if (uDetail > 0.01) {
                float relief = dsFbm(n * 160.0, 3);
                float grain = dsFbm(n * 420.0, 2);
                float landMask = smoothstep(0.16, 0.42, lum);   // 只给陆地加细节
                day *= 1.0 + (relief - 0.5) * 0.55 * uDetail * landMask;
                day *= 1.0 + (grain - 0.5) * 0.22 * uDetail;
              }

              /* ── 云层：独立贴图，随时间缓慢西移 ── */
              vec2 cuv = vec2(fract(vUv.x + uTime * 0.0011), vUv.y);
              float clouds = texture2D(uCloudMap, cuv).r;
              clouds = smoothstep(0.14, 0.86, clouds);

              vec3 cloudCol = mix(vec3(0.40, 0.45, 0.55), vec3(1.0, 0.99, 0.97), lit);
              vec3 albedo = mix(day, cloudCol, clouds * 0.82);

              vec3 col = albedo * (0.045 + 1.02 * lit);

              /* ── 夜面城市灯光 ── */
              vec3 lights = texture2D(uLightsMap, vUv).rgb;
              col += lights * (1.0 - lit) * 1.7;

              /* ── 海洋镜面高光（海面在日面图上很暗，用亮度反推） ── */
              float ocean = 1.0 - smoothstep(0.05, 0.17, lum);
              vec3 H = normalize(L + V);
              float spec = pow(max(dot(N, H), 0.0), 60.0);
              col += vec3(1.0, 0.97, 0.90) * spec * ocean * 1.0 * lit * (1.0 - clouds * 0.85);

              /* ── 大气边缘光 ── */
              float fres = 1.0 - clamp(dot(N, V), 0.0, 1.0);
              col += vec3(0.24, 0.54, 1.0) * pow(fres, 2.5) * (0.28 + 1.05 * max(ndl, 0.0));

              gl_FragColor = vec4(col, 1.0);
            }
          `}));ze.position.copy($),x.add(ze);const gt=new e.Mesh(new e.SphereGeometry(rt*1.07,80,56),new e.ShaderMaterial({uniforms:{uSunDir:me.uSunDir},transparent:!0,depthWrite:!1,blending:e.AdditiveBlending,side:e.BackSide,fog:!1,vertexShader:`
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            void main() {
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vNormalW = normalize(mat3(modelMatrix) * normal);
              vViewDirW = normalize(cameraPosition - wp.xyz);
              gl_Position = projectionMatrix * viewMatrix * wp;
            }
          `,fragmentShader:`
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            uniform vec3 uSunDir;
            void main() {
              float fres = 1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDirW)), 0.0, 1.0);
              float lit = 0.26 + 0.92 * max(dot(normalize(vNormalW), normalize(uSunDir)), 0.0);
              gl_FragColor = vec4(vec3(0.30, 0.58, 1.0), pow(fres, 2.4) * lit * 0.66);
            }
          `}));gt.position.copy($),x.add(gt);const Ue=new e.Mesh(new e.SphereGeometry(Ot,48,34),new e.MeshBasicMaterial({map:Ae(eo),color:9341570,fog:!1}));Ue.position.copy(it),x.add(Ue),[{orbit:5200,radius:26,color:10260870,emissive:1709842,phase:.9},{orbit:8200,radius:46,color:14200946,emissive:2760979,phase:2.4},{orbit:13e3,radius:34,color:11818298,emissive:2363401,phase:4.1},{orbit:26e3,radius:230,color:13215352,emissive:2761238,phase:1.2},{orbit:34e3,radius:190,color:13351308,emissive:2827800,ring:!0,phase:3.3},{orbit:44e3,radius:120,color:9423830,emissive:1517612,phase:5.6},{orbit:54e3,radius:116,color:4878271,emissive:1055280,phase:.4}].forEach(t=>{const o=new e.Mesh(new e.SphereGeometry(t.radius,m?28:44,m?20:32),new e.MeshStandardMaterial({color:t.color,emissive:t.emissive,roughness:.9,metalness:.04}));if(o.position.set(Math.cos(t.phase)*t.orbit,Math.sin(t.phase*2.1)*t.orbit*.018,Math.sin(t.phase)*t.orbit),t.ring){const r=new e.Mesh(new e.RingGeometry(t.radius*1.5,t.radius*2.4,96),new e.MeshBasicMaterial({color:14206875,side:e.DoubleSide,transparent:!0,opacity:.32,depthWrite:!1,fog:!1}));r.rotation.x=Math.PI/2-.34,o.add(r)}x.add(o);const n=260,a=[];for(let r=0;r<=n;r++){const c=r/n*Math.PI*2;a.push(Math.cos(c)*t.orbit,0,Math.sin(c)*t.orbit)}const i=new e.BufferGeometry;i.setAttribute("position",new e.Float32BufferAttribute(a,3)),x.add(new e.Line(i,new e.LineBasicMaterial({color:6063792,transparent:!0,opacity:.16,depthWrite:!1,fog:!1})))});{const o=[];for(let a=0;a<=300;a++){const i=a/300*Math.PI*2;o.push(Math.cos(i)*xe,0,Math.sin(i)*xe)}const n=new e.BufferGeometry;n.setAttribute("position",new e.Float32BufferAttribute(o,3)),x.add(new e.Line(n,new e.LineBasicMaterial({color:7316696,transparent:!0,opacity:.2,depthWrite:!1,fog:!1})))}const q=new e.Group;x.add(q),q.visible=!1;const wt=new e.Mesh(new e.SphereGeometry(26,28,20),new e.MeshBasicMaterial({color:16777215,fog:!1}));q.add(wt);const Ne=new e.Sprite(new e.SpriteMaterial({map:Le("rgba(255,255,255,1)","rgba(150,235,255,0.6)",128),transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending,fog:!1}));Ne.scale.setScalar(420),q.add(Ne);const je=new e.Sprite(new e.SpriteMaterial({map:ct(128),color:14216447,transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending,opacity:.85,fog:!1}));q.add(je);const re=34;function Mt(t,o){const n=new e.BufferGeometry,a=new Float32Array((re+1)*2*3),i=new Float32Array((re+1)*2*3),r=[];for(let u=0;u<re;u++){const d=u*2;r.push(d,d+1,d+2,d+1,d+3,d+2)}n.setIndex(r),n.setAttribute("position",new e.BufferAttribute(a,3)),n.setAttribute("color",new e.BufferAttribute(i,3));const c=new e.Mesh(n,new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,blending:e.AdditiveBlending,side:e.DoubleSide,fog:!1}));return c.frustumCulled=!1,q.add(c),{mesh:c,pos:a,col:i,width:o,rgb:t}}const yt=Mt([.62,.86,1],1),bt=Mt([1,.86,.62],2.1);bt.mesh.visible=!1,yt.mesh.visible=!1;const R=new e.Sprite(new e.SpriteMaterial({map:It(256,64),color:12574975,transparent:!0,depthWrite:!1,depthTest:!1,blending:e.AdditiveBlending,opacity:.9,fog:!1}));R.renderOrder=6,x.add(R),R.visible=!1;const St=48,qe=new e.BufferGeometry,qt=new Float32Array((St+1)*3),$t=new Float32Array((St+1)*3);qe.setAttribute("position",new e.BufferAttribute(qt,3)),qe.setAttribute("color",new e.BufferAttribute($t,3));const xt=new e.Line(qe,new e.LineBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,blending:e.AdditiveBlending,fog:!1}));xt.frustumCulled=!1,q.add(xt);const De=0,he=new e.BufferGeometry,H=new Float32Array(De*2*3),E=new Float32Array(De*2*3);he.setAttribute("position",new e.BufferAttribute(H,3)),he.setAttribute("color",new e.BufferAttribute(E,3));const At=new e.LineSegments(he,new e.LineBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,blending:e.AdditiveBlending,fog:!1}));At.frustumCulled=!1,q.add(At);const Ct=m?90:200,We=new Float32Array(Ct*3),$e=new e.BufferGeometry;$e.setAttribute("position",new e.BufferAttribute(We,3));const Ke=new e.Points($e,new e.PointsMaterial({color:12575999,size:34,sizeAttenuation:!0,transparent:!0,opacity:.8,depthWrite:!1,blending:e.AdditiveBlending,fog:!1}));Ke.frustumCulled=!1,Ke.visible=!1,q.add(Ke);function Ye(t,o){const n=t.length-1,a=de(o)*n,i=Math.min(Math.floor(a),n-1),r=a-i,c=r*r*(3-2*r);return t[i].clone().multiplyScalar(1-c).addScaledVector(t[i+1],c)}const Qe=[new e.Vector3(2400,700,3200),new e.Vector3(2100,560,3800),new e.Vector3(1500,400,2600),new e.Vector3(700,220,900),new e.Vector3(1500,340,-1100),new e.Vector3(5600,560,-4600),new e.Vector3(13e3,640,-6200),new e.Vector3(21700,320,-1400),new e.Vector3(20450,300,-300),new e.Vector3(27e3,5200,-9e3),new e.Vector3(34e3,27e3,3e4)];function Vt(t){const o=de(t),n=o*o*(3-2*o);return de(n*.35+o*.65)}const Z=new e.Vector3,O=new e.Vector3,Be=new e.Vector3,Pt=new e.Vector3,fe=new e.Vector3(0,1,0);function pe(t,o,n,a){Z.copy(o).sub(t).normalize(),O.crossVectors(Z,fe),O.lengthSq()<1e-8&&O.set(1,0,0),O.normalize(),Be.crossVectors(O,Z).normalize();const i=Math.tan(w.fov*Math.PI/360),r=i*w.aspect,c=(n-.5)*2*r,u=(.5-a)*2*i;return Pt.copy(Z).addScaledVector(O,-c).addScaledVector(Be,-u),t.clone().add(Pt.normalize().multiplyScalar(2e3))}function _t(t){const o=X(X(.8,.24,y(.04,.3,t)),X(.24,.84,y(.4,.68,t)),y(.34,.46,t)),n=X(.26,.34,y(.06,.3,t))*(1-y(.3,.6,t))+.3*y(.3,.6,t),a=X(X(X(4200,1500,y(0,.5,t)),2600,y(.5,.8,t)),7200,y(.8,1,t));return{x:o,y:n,d:a}}function zt(t,o,n,a,i){Z.copy(o).sub(t).normalize(),O.crossVectors(Z,fe),O.lengthSq()<1e-8&&O.set(1,0,0),O.normalize(),Be.crossVectors(O,Z).normalize();const r=Math.tan(w.fov*Math.PI/360),c=r*w.aspect,u=(n-.5)*2*c,d=(.5-a)*2*r,h=Z.clone().addScaledVector(O,u).addScaledVector(Be,d).normalize();return t.clone().addScaledVector(h,i)}function Xe(t,o){const n=o.clone().add(new e.Vector3(300,900,2e4)),a=pe(o,n,.5,.46),i=X(.78,.9,y(.16,.42,t)),r=pe(o,new e.Vector3(0,0,0),i,.34),c=pe(o,$,.28,.44),u=pe(o,$,.42,.46),d=pe(o,new e.Vector3(0,0,0),.5,.5),h=a.clone();return h.lerp(r,y(.06,.26,t)),h.lerp(c,y(.4,.6,t)),h.lerp(u,y(.62,.72,t)),h.lerp(d,y(.78,.96,t)),h}const Kt=.79;function Yt(t){const o=Kt*Math.PI*2,n=-Math.cos(o),a=Math.sin(o),i=Math.atan2(a,n),r=Math.atan2(t.z-$.z,t.x-$.x);return i-r}let Dt=!1;const B=new e.Vector3,Ze=new e.Vector3,Je=new e.Vector3,Te=new e.Vector3(0,0,0),ve=new e.Vector3(0,0,1);let Wt=!1;const Re=[];let Bt=!1;function Qt(t,o){if(!Dt){Dt=!0;const s=Ye(Qe,0),v=Xe(0,s);ae.position.copy(zt(s,v,.86,.2,13e4))}const n=Vt(t),a=Ye(Qe,n);a.x+=Math.sin(o*.31)*26+Math.sin(o*.17+1.3)*18,a.y+=Math.cos(o*.24+.7)*20+Math.sin(o*.13)*12,a.z+=Math.sin(o*.19+2.1)*22,w.position.copy(a);const i=Xe(t,a);i.x+=Math.sin(o*.21+.4)*40,i.y+=Math.cos(o*.27+1.8)*30,w.lookAt(i),w.rotateZ(Math.sin(o*.16)*.0022);const r=_t(t),c=Math.sin(o*.62)*.03+Math.sin(o*1.07+1.7)*.012,u=Math.cos(o*.48+.6)*.028+Math.sin(o*.93+2.3)*.011,d=1+Math.sin(o*.37)*.09,h=r.x+c,g=r.y+u,l=r.d*d;B.copy(zt(a,i,h,g,l)),q.position.copy(B),Wt||(Ze.copy(B),Wt=!0),Je.copy(B).sub(Ze);const A=B.clone().normalize();A.lengthSq()<.5&&A.set(0,0,1);{const s=i.clone().sub(a).normalize(),v=new e.Vector3().crossVectors(s,fe).normalize(),b=new e.Vector3().crossVectors(v,s).normalize(),V=s.clone().multiplyScalar(.34).addScaledVector(v,-.76).addScaledVector(b,-.55).normalize();let S=0;Je.lengthSq()>1e-6?(Te.lerp(Je.clone().normalize(),.22),Te.lengthSq()>1e-6?(ve.copy(Te).normalize().multiplyScalar(-1),S=.55):ve.copy(V)):ve.copy(V),ve.lerp(V,1-S),ve.lerp(A,.12).normalize()}Ze.copy(B);const f=l*.95;if(!Bt){for(let s=0;s<=re;s++)Re.push(B.clone());Bt=!0}Re.shift(),Re.push(B.clone());const M=i.clone().sub(a).normalize(),C=new e.Vector3().crossVectors(M,fe).normalize(),G=new e.Vector3().crossVectors(C,M).normalize(),_=C.clone().multiplyScalar(-.8).addScaledVector(G,-.58).addScaledVector(M,.28).normalize(),I=new e.Vector3().crossVectors(_,M).normalize(),U=I.clone(),D=new e.Vector3().crossVectors(_,I).normalize();{const s=l*.55*(1+Math.sin(o*1.35)*.07),v=l*.038,b=_.dot(C),V=-_.dot(G);R.center.set(0,.5),R.position.copy(B),R.scale.set(s,v,1),R.material.rotation=Math.atan2(V,b)+Math.sin(o*.83)*.11}const L=(s,v,b)=>{for(let S=0;S<=re;S++){const j=S/re,Y=(.0012+j*.01)*s.width*l,J=B.clone().addScaledVector(_,j*f*b).addScaledVector(I,Math.sin(j*7+o*.8)*Y*v),ot=J.clone().addScaledVector(I,Y),nt=J.clone().addScaledVector(I,-Y);s.pos.set([ot.x,ot.y,ot.z],S*6),s.pos.set([nt.x,nt.y,nt.z],S*6+3);const se=Math.pow(1-j,.95),[Ft,Gt,Lt]=s.rgb;s.col.set([Ft*se,Gt*se,Lt*se],S*6),s.col.set([Ft*se,Gt*se,Lt*se],S*6+3)}const V=s.mesh.geometry;V.getAttribute("position").needsUpdate=!0,V.getAttribute("color").needsUpdate=!0};L(yt,.22,1),L(bt,.75,.62);for(let s=0;s<De;s++){const v=s/De*Math.PI*2+o*.3,b=l*(.1+s*37%100/100*.16),V=U.clone().multiplyScalar(Math.cos(v)*b).addScaledVector(D,Math.sin(v)*b),S=l*(.04+s*53%100/100*.09),j=B.clone().add(V),Y=j.clone().addScaledVector(_,S);H[s*6]=j.x,H[s*6+1]=j.y,H[s*6+2]=j.z,H[s*6+3]=Y.x,H[s*6+4]=Y.y,H[s*6+5]=Y.z;const J=.1+s*29%100/100*.18;E[s*6]=.8*J,E[s*6+1]=.92*J,E[s*6+2]=1*J,E[s*6+3]=0,E[s*6+4]=0,E[s*6+5]=0}he.getAttribute("position").needsUpdate=!0,he.getAttribute("color").needsUpdate=!0;{for(let s=0;s<Ct;s++){const v=Math.pow(Math.random(),1.4),b=v*f*1.5,V=v*l*.06,S=Math.random()*Math.PI*2,j=B.x+_.x*b+U.x*Math.cos(S)*V+D.x*Math.sin(S)*V,Y=B.y+_.y*b+U.y*Math.cos(S)*V+D.y*Math.sin(S)*V,J=B.z+_.z*b+U.z*Math.cos(S)*V+D.z*Math.sin(S)*V;We[s*3]=j,We[s*3+1]=Y,We[s*3+2]=J}$e.getAttribute("position").needsUpdate=!0}const K=1+Math.sin(o*4.2)*.1;wt.scale.setScalar(l*45e-5*K),Ne.scale.setScalar(l*.032*(1+Math.sin(o*2.1)*.06)),je.scale.setScalar(l*.16*(1+Math.sin(o*1.6+.9)*.08)),je.material.rotation=o*.12;{const s=a.clone().sub($).normalize(),v=new e.Vector3().crossVectors(s,fe).normalize(),b=new e.Vector3().subVectors(new e.Vector3(0,0,0),$).normalize(),V=y(.42,.6,t),S=s.clone().multiplyScalar(.82).addScaledVector(v,.57).normalize();me.uSunDir.value.copy(b).lerp(S,V).normalize()}const ye=y(.6,.7,t)*(1-y(.8,.9,t));me.uDetail.value=ye;const ie=o*.05,be=y(.56,.72,t),Zt=Yt(a);ze.rotation.y=ie*(1-be)+(Zt+ie*.15)*be,ze.rotation.z=.12,Ue.rotation.y=o*.06;{const s=Math.max(a.length(),Q*1.2),v=2*Math.atan(Q/s),b=y(.1,.55,v);_e.uDetail.value=b,_e.uIntensity.value=(.94-t*.08)*(1-b*.2)}jt.forEach((s,v)=>{const b=1+Math.sin(o*(.42+v*.15)+v*1.3)*.035;s.scale.setScalar(vt[v].s*b)});{const s=a.length(),v=Math.min(s*.075,Q*7.5);Ie.scale.setScalar(v*(1+Math.sin(o*1.7)*.04))}Oe.rotation.y=o*.007,dt.rotation.y=o*.0014,ut.rotation.y=o*.0026,mt.rotation.y=o*.0038,pt.rotation.y=o*.0022,Ut.rotation.y=-o*.0018,Pe.rotation.y=o*.0026,Pe.position.y=Math.sin(o*.05)*260,Nt.forEach(({sp:s,base:v,phase:b})=>{s.material.opacity=v*(.9+.1*Math.sin(o*.1+b))}),z.style.setProperty("--ds-scrim-opacity",oe(t).toFixed(3))}let N=null;if(!m&&p.UnrealBloomPass){N=new p.EffectComposer(P),N.addPass(new p.RenderPass(x,w));const t=new p.UnrealBloomPass(new e.Vector2(window.innerWidth*.5,window.innerHeight*.5),.42,.62,.82);N.addPass(t),N.addPass(new p.OutputPass),N.setSize(window.innerWidth,window.innerHeight)}function He(){const t=window.innerWidth,o=window.innerHeight;w.aspect=t/o,w.updateProjectionMatrix(),P.setSize(t,o,!1),N&&N.setSize(t,o),Ce.uPixelRatio.value=Math.min(window.devicePixelRatio,m?1.5:2),T()}window.addEventListener("resize",He,{passive:!0}),window.addEventListener("scroll",T,{passive:!0}),He();let ge=!0,Ee=performance.now(),we=0,Me=0,Fe=0,et=0;function Xt(t){if(Me>=2||(Fe++,et+=t,Fe<120))return;const o=1e3/(et/Fe);Fe=0,et=0,Me===0&&o<45&&ne>1?(Me=1,ne=1,P.setPixelRatio(1),Ce.uPixelRatio.value=1,He(),console.info("[ds-bg] 帧率偏低（"+o.toFixed(0)+" fps），已降低渲染分辨率")):Me<=1&&o<30&&N&&(Me=2,N=null,console.info("[ds-bg] 帧率仍偏低（"+o.toFixed(0)+" fps），已关闭泛光后处理"))}function tt(){if(!ge)return;requestAnimationFrame(tt);const t=performance.now(),o=t-Ee;we+=Math.min(.05,o/1e3),Ee=t,Xt(o);const n=k-W;W+=n*.06,Math.abs(n)<2e-4&&(W=k),Ce.uTime.value=we,_e.uTime.value=we,me.uTime.value=we,Qt(W,we),N?N.render():P.render(x,w)}F.classList.remove("is-loading"),T(),W=k,tt(),document.addEventListener("visibilitychange",()=>{document.hidden?ge=!1:ge||(ge=!0,Ee=performance.now(),tt())}),P.domElement.addEventListener("webglcontextlost",t=>{t.preventDefault(),ge=!1,F.remove(),z.remove(),document.body.dataset.dsFallback="context-lost",console.warn("[ds-bg] WebGL 上下文丢失，已退回静态深空背景")}),/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)&&(window.__dsProbe=t=>{const o=Vt(t),n=w.position.clone(),a=w.quaternion.clone();w.position.copy(Ye(Qe,o)),w.lookAt(Xe(t,w.position)),w.updateMatrixWorld(!0);const i=u=>{const d=u.clone().sub(w.position),h=new e.Vector3(0,0,-1).applyQuaternion(w.quaternion),g=d.dot(h)<=0,l=u.clone().project(w);return{x:+((l.x+1)/2).toFixed(3),y:+((1-l.y)/2).toFixed(3),behind:g}},r=_t(t),c={p:t,sun:i(new e.Vector3(0,0,0)),earth:i($.clone()),moon:i(it.clone()),comet:{x:r.x,y:r.y,d:r.d},sunAngularDeg:+(2*Math.atan(Q/w.position.length())*180/Math.PI).toFixed(2)};return w.position.copy(n),w.quaternion.copy(a),w.updateMatrixWorld(!0),c})};document.body.classList.add("ds-3d-page");const ce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let le=!1,ee="";try{const e=document.createElement("canvas"),p=e.getContext("webgl2"),m=p?null:e.getContext("webgl");le=!!(window.WebGLRenderingContext&&(p||m)),le||(ee="no-webgl-context")}catch{le=!1,ee="webgl-probe-threw"}const te=le?ce?"reduced-motion":"":ee;if(te)document.body.dataset.dsFallback=te,console.info("[ds-bg] 3D 背景未启动（原因："+te+"），已使用静态深空背景，页面内容不受影响。");else{const e=window.matchMedia("(max-width: 767px)").matches,p=[Se(()=>import("./three.module.iOYB3rD4.js"),[]),Se(()=>import("./EffectComposer.BAxweMNB.js"),__vite__mapDeps([0,1,2,3])),Se(()=>import("./RenderPass.CbCLlHbP.js"),__vite__mapDeps([4,1,3])),Se(()=>import("./OutputPass.DyAvi0F0.js"),__vite__mapDeps([5,1,3]))];e||p.push(Se(()=>import("./UnrealBloomPass.Z9t2svEr.js"),__vite__mapDeps([6,1,3,2]))),Promise.all(p).then(m=>{const F=m[0],{EffectComposer:z}=m[1],{RenderPass:oe}=m[2],{OutputPass:P}=m[3],ne=m[4];try{Ge(F,{EffectComposer:z,RenderPass:oe,OutputPass:P,UnrealBloomPass:ne?.UnrealBloomPass,LOW:e})}catch(x){document.body.dataset.dsFallback="boot-failed",console.warn("[ds-bg] 3D 场景初始化失败，已退回静态深空背景",x)}}).catch(m=>{document.body.dataset.dsFallback="three-load-failed",console.warn("[ds-bg] Three.js 加载失败，已退回静态深空背景",m)})}let k=0,W=0}
