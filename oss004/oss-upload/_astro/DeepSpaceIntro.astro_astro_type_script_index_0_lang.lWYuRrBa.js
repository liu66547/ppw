const Rt="modulepreload",Ht=function(q){return"/"+q},Ut={},Et=function(at,P,Y){let V=Promise.resolve();if(P&&P.length>0){let w=function(S){return Promise.all(S.map(g=>Promise.resolve(g).then(A=>({status:"fulfilled",value:A}),A=>({status:"rejected",reason:A}))))};document.getElementsByTagName("link");const b=document.querySelector("meta[property=csp-nonce]"),C=b?.nonce||b?.getAttribute("nonce");V=w(P.map(S=>{if(S=Ht(S),S in Ut)return;Ut[S]=!0;const g=S.endsWith(".css"),A=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${S}"]${A}`))return;const v=document.createElement("link");if(v.rel=g?"stylesheet":Rt,g||(v.as="script"),v.crossOrigin="",v.href=S,C&&v.setAttribute("nonce",C),document.head.appendChild(v),g)return new Promise((p,nt)=>{v.addEventListener("load",p),v.addEventListener("error",()=>nt(new Error(`Unable to preload CSS for ${S}`)))})}))}function t(w){const b=new Event("vite:preloadError",{cancelable:!0});if(b.payload=w,window.dispatchEvent(b),!b.defaultPrevented)throw w}return V.then(w=>{for(const b of w||[])b.status==="rejected"&&t(b.reason);return at().catch(t)})},te={src:"/_astro/earth_day.d1pdJ3jg.jpg",width:2048,height:1024,format:"jpg",orientation:1},ee={src:"/_astro/earth_clouds.DOLuqenA.jpg",width:2048,height:1024,format:"jpg"},oe={src:"/_astro/earth_lights.CS8wFlFC.png",width:2048,height:1024,format:"png"},ae={src:"/_astro/moon.D_Wp7Gh9.jpg",width:1024,height:512,format:"jpg"},ne=document.getElementById("ds-bg");if(ne){let q=function(t){const w=window.matchMedia("(max-width: 767px)").matches,b=document.createElement("div");b.className="ds-canvas",document.body.appendChild(b);const C=document.createElement("div");C.className="ds-scrim",document.body.appendChild(C);const S=e=>1-.45*Math.min(1,Math.max(0,e)),g=new t.WebGLRenderer({antialias:!w,alpha:!0,powerPreference:"high-performance"});let A=Math.min(window.devicePixelRatio,w?1.5:2);g.setPixelRatio(A),g.setSize(window.innerWidth,window.innerHeight,!1),g.outputColorSpace=t.SRGBColorSpace,g.toneMapping=t.ACESFilmicToneMapping,g.toneMappingExposure=.7,g.domElement.style.pointerEvents="none",b.appendChild(g.domElement);const v=new t.Scene;v.fog=new t.FogExp2(263692,26e-6);const p=new t.PerspectiveCamera(52,window.innerWidth/window.innerHeight,1,9e4),nt=`
        float dsHash(vec3 p) {
          p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float dsNoise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(dsHash(i + vec3(0.0, 0.0, 0.0)), dsHash(i + vec3(1.0, 0.0, 0.0)), f.x),
                mix(dsHash(i + vec3(0.0, 1.0, 0.0)), dsHash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
            mix(mix(dsHash(i + vec3(0.0, 0.0, 1.0)), dsHash(i + vec3(1.0, 0.0, 1.0)), f.x),
                mix(dsHash(i + vec3(0.0, 1.0, 1.0)), dsHash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
            f.z);
        }
        float dsFbm(vec3 p, int oct) {
          float a = 0.5, s = 0.0, n = 0.0;
          for (int i = 0; i < 6; i++) {
            if (i >= oct) break;
            s += a * dsNoise(p);
            n += a;
            a *= 0.5;
            p *= 2.03;
          }
          return s / max(n, 1e-4);
        }
        // 脊状噪声：制造丝状、纤维状的细节（太阳的细颗粒 / 星云丝絮）
        float dsRidge(vec3 p, int oct) {
          float a = 0.5, s = 0.0, n = 0.0;
          for (int i = 0; i < 6; i++) {
            if (i >= oct) break;
            float v = 1.0 - abs(dsNoise(p) * 2.0 - 1.0);
            s += a * v * v;
            n += a;
            a *= 0.5;
            p *= 2.07;
          }
          return s / max(n, 1e-4);
        }
      `;function rt(e,o,n=256){const a=document.createElement("canvas");a.width=a.height=n;const m=a.getContext("2d"),i=m.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);i.addColorStop(0,e),i.addColorStop(.4,o),i.addColorStop(1,"rgba(0,0,0,0)"),m.fillStyle=i,m.fillRect(0,0,n,n);const r=new t.CanvasTexture(a);return r.colorSpace=t.SRGBColorSpace,r}function It(e=128){const o=document.createElement("canvas");o.width=o.height=e;const n=o.getContext("2d"),a=e/2,m=n.createRadialGradient(a,a,0,a,a,a*.42);m.addColorStop(0,"rgba(255,255,255,1)"),m.addColorStop(.5,"rgba(214,238,255,0.55)"),m.addColorStop(1,"rgba(150,200,255,0)"),n.fillStyle=m,n.fillRect(0,0,e,e),n.globalCompositeOperation="lighter";const i=(s,d,h,c,u,l)=>{const f=n.createLinearGradient(s,d,h,c);f.addColorStop(0,"rgba(255,255,255,"+l+")"),f.addColorStop(.35,"rgba(200,230,255,"+l*.28+")"),f.addColorStop(1,"rgba(150,200,255,0)"),n.strokeStyle=f,n.lineWidth=u,n.lineCap="round",n.beginPath(),n.moveTo(s,d),n.lineTo(h,c),n.stroke()};i(a,a,e,a,1.6,.95),i(a,a,0,a,1.6,.95),i(a,a,a,0,1.6,.95),i(a,a,a,e,1.6,.95),i(a,a,e*.86,e*.14,1,.45),i(a,a,e*.14,e*.86,1,.45),i(a,a,e*.14,e*.14,1,.45),i(a,a,e*.86,e*.86,1,.45),n.globalCompositeOperation="source-over";const r=new t.CanvasTexture(o);return r.colorSpace=t.SRGBColorSpace,r}function yt(e=512){const o=document.createElement("canvas");o.width=o.height=e;const n=o.getContext("2d"),a=n.createImageData(e,e),m=a.data,i=new Uint8Array(512);for(let c=0;c<256;c++)i[c]=c;for(let c=255;c>0;c--){const u=Math.random()*(c+1)|0,l=i[c];i[c]=i[u],i[u]=l}for(let c=0;c<256;c++)i[c+256]=i[c];const r=(c,u)=>i[i[c&255]+(u&255)&511]/255,s=(c,u)=>{const l=Math.floor(c),f=Math.floor(u),y=c-l,M=u-f,x=y*y*(3-2*y),_=M*M*(3-2*M);return(r(l,f)*(1-x)+r(l+1,f)*x)*(1-_)+(r(l,f+1)*(1-x)+r(l+1,f+1)*x)*_},d=(c,u)=>{let l=.5,f=0,y=0;for(let M=0;M<5;M++)f+=l*s(c,u),y+=l,l*=.5,c*=2.07,u*=2.03;return f/y};for(let c=0;c<e;c++)for(let u=0;u<e;u++){const l=(c*e+u)*4,f=u/e,y=c/e,M=f-.5,x=y-.5,_=Math.sqrt(M*M+x*x)*2,et=Math.max(0,1-_),ot=d(f*4.5,y*4.5),Tt=Math.pow(Math.max(0,ot-.42)/.58,1.7)*Math.pow(et,1.35);m[l]=255,m[l+1]=255,m[l+2]=255,m[l+3]=Math.min(255,Tt*235)}n.putImageData(a,0,0);const h=new t.CanvasTexture(o);return h.colorSpace=t.SRGBColorSpace,h}const $={uTime:{value:0},uPixelRatio:{value:A}},jt=`
        attribute float aSize;
        attribute float aPhase;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          vColor = aColor;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // 不同相位、不同频率的克制闪烁
          vTwinkle = 0.70 + 0.30 * sin(uTime * (0.4 + fract(aPhase) * 0.85) + aPhase);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uPixelRatio * (330.0 / max(-mv.z, 1.0));
        }
      `,Ot=`
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d);
          if (r > 0.5) discard;
          float a = smoothstep(0.5, 0.05, r);
          gl_FragColor = vec4(vColor * vTwinkle, a * vTwinkle);
        }
      `;function xt(e,o,n,a,m){const i=new Float32Array(e*3),r=new Float32Array(e*3),s=new Float32Array(e),d=new Float32Array(e),h=new t.Color;for(let l=0;l<e;l++){const f=o+Math.random()*(n-o),y=Math.random()*Math.PI*2,M=Math.acos(2*Math.random()-1);i[l*3]=f*Math.sin(M)*Math.cos(y),i[l*3+1]=f*Math.cos(M)*.68,i[l*3+2]=f*Math.sin(M)*Math.sin(y);const x=Math.random()<.14;h.setHSL(x?.08+Math.random()*.06:.54+Math.random()*.14,x?.55:.28+Math.random()*.34,.55+Math.random()*.42),r[l*3]=h.r,r[l*3+1]=h.g,r[l*3+2]=h.b,s[l]=a+Math.pow(Math.random(),2.4)*(m-a),d[l]=Math.random()*Math.PI*2}const c=new t.BufferGeometry;c.setAttribute("position",new t.BufferAttribute(i,3)),c.setAttribute("aColor",new t.BufferAttribute(r,3)),c.setAttribute("aSize",new t.BufferAttribute(s,1)),c.setAttribute("aPhase",new t.BufferAttribute(d,1));const u=new t.Points(c,new t.ShaderMaterial({uniforms:$,transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,fog:!1,vertexShader:jt,fragmentShader:Ot}));return u.frustumCulled=!1,u}const St=xt(w?3400:7200,4e3,3e4,.8,2.4),At=xt(w?900:2e3,1200,9e3,1.6,4.6);v.add(St,At);{const e=w?40:90,o=new Float32Array(e*3),n=new Float32Array(e*3),a=new Float32Array(e),m=new Float32Array(e),i=new t.Color;for(let d=0;d<e;d++){const h=3e3+Math.random()*22e3,c=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1);o[d*3]=h*Math.sin(u)*Math.cos(c),o[d*3+1]=h*Math.cos(u)*.7,o[d*3+2]=h*Math.sin(u)*Math.sin(c);const l=Math.random()<.22;i.setHSL(l?.09+Math.random()*.05:.55+Math.random()*.1,.35,.86+Math.random()*.14),n[d*3]=i.r,n[d*3+1]=i.g,n[d*3+2]=i.b,a[d]=26+Math.random()*46,m[d]=Math.random()*Math.PI*2}const r=new t.BufferGeometry;r.setAttribute("position",new t.BufferAttribute(o,3)),r.setAttribute("aColor",new t.BufferAttribute(n,3)),r.setAttribute("aSize",new t.BufferAttribute(a,1)),r.setAttribute("aPhase",new t.BufferAttribute(m,1));const s=new t.Points(r,new t.PointsMaterial({size:260,sizeAttenuation:!0,vertexColors:!0,map:It(128),transparent:!0,opacity:.85,depthWrite:!1,blending:t.AdditiveBlending,fog:!1}));s.frustumCulled=!1,v.add(s);var qt=s}const Yt=yt(w?384:512),$t=yt(w?384:512),X=new t.Group,Pt=[];[{r:8500,a:.5,c:2771578,s:12e3,o:.3,tex:0},{r:9500,a:3.6,c:2051934,s:9e3,o:.2,tex:1},{r:13e3,a:2.3,c:4861802,s:15e3,o:.26,tex:0},{r:15500,a:5.1,c:2375787,s:12500,o:.18,tex:1},{r:17500,a:3.9,c:2051934,s:17e3,o:.22,tex:0},{r:2e4,a:.9,c:5451866,s:15e3,o:.15,tex:1},{r:25e3,a:3.1,c:3096426,s:21e3,o:.15,tex:1},{r:6500,a:1.9,c:4016754,s:2e4,o:.11,tex:1},{r:7e3,a:.35,c:14252586,s:9500,o:.13,tex:0},{r:8800,a:2.75,c:12729466,s:10500,o:.1,tex:1},{r:11e3,a:1.15,c:2068358,s:12e3,o:.1,tex:1},{r:12500,a:4.35,c:9063380,s:11e3,o:.09,tex:0},{r:14500,a:5.85,c:3108816,s:13500,o:.09,tex:1},{r:16500,a:.95,c:14722620,s:12e3,o:.07,tex:0},{r:19e3,a:3.25,c:12470878,s:15e3,o:.085,tex:1},{r:22e3,a:5.05,c:3846312,s:17e3,o:.08,tex:1}].forEach((o,n)=>{const a=new t.Sprite(new t.SpriteMaterial({map:o.tex===0?Yt:$t,color:o.c,transparent:!0,opacity:o.o,depthWrite:!1,blending:t.AdditiveBlending,fog:!1}));a.position.set(Math.cos(o.a)*o.r,(Math.random()-.5)*4600-700,Math.sin(o.a)*o.r),a.scale.setScalar(o.s),a.material.rotation=n*1.37%(Math.PI*2),X.add(a),Pt.push({sp:a,base:o.o,phase:n*.9})}),v.add(X);const G=w?1400:3800,Ct=(()=>{const e=new Float32Array(G*3),o=new Float32Array(G*3),n=new Float32Array(G),a=new Float32Array(G),m=new t.Color;for(let s=0;s<G;s++){const d=1500+Math.pow(Math.random(),.65)*2e4,h=Math.random()*Math.PI*2;e[s*3]=Math.cos(h)*d,e[s*3+1]=(Math.random()-.5)*(200+d*.055),e[s*3+2]=Math.sin(h)*d,m.setHSL(.56+Math.random()*.1,.4,.34+Math.random()*.26),o[s*3]=m.r,o[s*3+1]=m.g,o[s*3+2]=m.b,n[s]=1.2+Math.random()*3.6,a[s]=Math.random()*Math.PI*2}const i=new t.BufferGeometry;i.setAttribute("position",new t.BufferAttribute(e,3)),i.setAttribute("aColor",new t.BufferAttribute(o,3)),i.setAttribute("aSize",new t.BufferAttribute(n,1)),i.setAttribute("aPhase",new t.BufferAttribute(a,1));const r=new t.Points(i,new t.ShaderMaterial({uniforms:$,transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,fog:!1,vertexShader:`
              attribute float aSize;
              attribute float aPhase;
              attribute vec3 aColor;
              uniform float uTime;
              uniform float uPixelRatio;
              varying vec3 vColor;
              varying float vFade;
              void main() {
                vColor = aColor;
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                vFade = 0.55 + 0.45 * sin(uTime * 0.2 + aPhase);
                gl_Position = projectionMatrix * mv;
                gl_PointSize = aSize * uPixelRatio * (310.0 / max(-mv.z, 1.0));
              }
            `,fragmentShader:`
              varying vec3 vColor;
              varying float vFade;
              void main() {
                vec2 d = gl_PointCoord - 0.5;
                float r = length(d);
                if (r > 0.5) discard;
                gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, r) * 0.45 * vFade);
              }
            `}));return r.frustumCulled=!1,r})();v.add(Ct);const k=420;function K(e,o=!0){const n=typeof e=="string"?e:e.src,a=new t.TextureLoader().load(n);return o&&(a.colorSpace=t.SRGBColorSpace),a.anisotropy=g.capabilities.getMaxAnisotropy(),a.wrapS=t.RepeatWrapping,a}const it={uTime:{value:0},uBrightness:{value:.82}},st=new t.Mesh(new t.SphereGeometry(k,96,64),new t.ShaderMaterial({uniforms:it,fog:!1,vertexShader:`
            varying vec2 vUv;
            varying vec3 vObjPos;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            void main() {
              vUv = uv;
              vObjPos = position;
              vec4 worldPos = modelMatrix * vec4(position, 1.0);
              vNormalW = normalize(mat3(modelMatrix) * normal);
              vViewDirW = normalize(cameraPosition - worldPos.xyz);
              gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
          `,fragmentShader:`
            precision highp float;
            varying vec2 vUv;
            varying vec3 vObjPos;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            uniform float uTime;
            uniform float uBrightness;

            ${nt}

            void main() {
              vec3 n = normalize(vObjPos);
              float fres = 1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDirW)), 0.0, 1.0);

              /* ── 米粒组织（granulation）──
                 太阳表面是无数对流元胞，胞界比胞心暗。
                 用脊状噪声的反相画胞界，比单纯 fbm 更像真太阳。 */
              float g1 = dsFbm(n * 5.5 + vec3(0.0, uTime * 0.020, 0.0), 4);
              float g2 = dsFbm(n * 13.0 - vec3(uTime * 0.015, 0.0, uTime * 0.010), 3);
              float cells = dsRidge(n * 26.0 + vec3(uTime * 0.010, 0.0, 0.0), 2);
              float granule = (g1 * 0.60 + g2 * 0.30) * (1.0 - cells * 0.32);

              /* 大尺度对流：让表面明暗真的在流动（贴图是静态的，
                 不留神会显得"贴了张皮"，这层流动就是解药） */
              float flow = dsFbm(n * 2.1 + vec3(uTime * 0.045, uTime * 0.028, 0.0), 3);
              float heat = clamp(granule * 0.74 + flow * 0.46, 0.0, 1.0);

              /* 色温分层：核心白热 -> 亮黄 -> 金橙 -> 边缘深橙红。
                 这是反复试下来观感最好的一版 —— 贴图方案实测会出现
                 同心环与条纹伪影，不如纯噪声干净。 */
              vec3 deep   = vec3(0.88, 0.20, 0.015);
              vec3 mid    = vec3(1.00, 0.55, 0.08);
              vec3 bright = vec3(1.00, 0.86, 0.52);
              vec3 hot    = vec3(1.00, 0.99, 0.95);
              vec3 col = mix(deep, mid, smoothstep(0.08, 0.50, heat));
              col = mix(col, bright, smoothstep(0.46, 0.80, heat));
              col = mix(col, hot, smoothstep(0.78, 1.0, heat));

              /* ── 黑子：暗区 + 半影环 ── */
              float spotField = dsFbm(n * 3.3 + vec3(uTime * 0.006, 41.0, 0.0), 3);
              float spot = smoothstep(0.62, 0.78, spotField);
              float penumbra = smoothstep(0.58, 0.66, spotField) * (1.0 - spot);
              col = mix(col, col * 0.30, spot * 0.85);
              col = mix(col, col * 0.74, penumbra * 0.5);

              /* ── 耀斑：黑子附近的亮斑 ── */
              float flare = dsRidge(n * 8.5 + vec3(0.0, uTime * 0.03, uTime * 0.02), 2);
              col += vec3(1.0, 0.74, 0.32) * smoothstep(0.72, 0.96, flare) * spot * 0.95;

              /* ── 临边昏暗（真实恒星大气的必然现象） ── */
              col *= mix(1.0, 0.68, pow(fres, 1.25));

              /* ── 边缘白炽环：参考图最显著的特征 ──
                 球体边缘一圈极亮的白热光，把太阳"框"出来，
                 再叠一层暖橙过渡，与日冕壳体衔接。 */
              /* 强度经过实测调整：1.6 时边缘会被推到纯白，
                 整个球面看起来是一块平的浅色圆盘，颗粒感全丢。 */
              col += vec3(1.0, 0.97, 0.90) * pow(fres, 3.2) * 0.95;
              col += vec3(1.0, 0.62, 0.20) * pow(fres, 1.7) * 0.32;

              // 热辐射感
              col += vec3(0.18, 0.10, 0.03) * pow(heat, 3.0);

              gl_FragColor = vec4(col * uBrightness, 1.0);
            }
          `})),J=new t.Group;st.renderOrder=1,J.add(st);const Ft=[{s:k*2.3,i:"rgba(255,220,160,0.19)",m:"rgba(255,144,44,0.08)"},{s:k*4.6,i:"rgba(255,190,104,0.12)",m:"rgba(255,112,24,0.05)"},{s:k*8.5,i:"rgba(255,158,68,0.07)",m:"rgba(255,92,16,0.025)"}],Xt=Ft.map((e,o)=>{const n=new t.Sprite(new t.SpriteMaterial({map:rt(e.i,e.m,256),transparent:!0,depthWrite:!1,depthTest:!1,blending:t.AdditiveBlending,fog:!1}));return n.scale.setScalar(e.s),n.renderOrder=3+o,J.add(n),n});J.add(new t.PointLight(16767392,2.2,0,0)),v.add(new t.AmbientLight(2767444,.6)),v.add(J);const N=132,z=new t.Vector3(-40,1180,-1620),Wt=new t.Vector3(200,1470,-1380),Q={uTime:{value:0},uSunDir:{value:new t.Vector3(1,0,0)},uDayMap:{value:K(te)},uCloudMap:{value:K(ee,!1)},uLightsMap:{value:K(oe)}},Z=new t.Mesh(new t.SphereGeometry(N,128,88),new t.ShaderMaterial({uniforms:Q,fog:!1,vertexShader:`
            varying vec2 vUv;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            void main() {
              vUv = uv;
              vec4 worldPos = modelMatrix * vec4(position, 1.0);
              vNormalW = normalize(mat3(modelMatrix) * normal);
              vViewDirW = normalize(cameraPosition - worldPos.xyz);
              gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
          `,fragmentShader:`
            precision highp float;
            varying vec2 vUv;
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            uniform float uTime;
            uniform vec3 uSunDir;
            uniform sampler2D uDayMap;
            uniform sampler2D uCloudMap;
            uniform sampler2D uLightsMap;

            void main() {
              vec3 N = normalize(vNormalW);
              vec3 L = normalize(uSunDir);
              vec3 V = normalize(vViewDirW);
              float ndl = dot(N, L);

              /* ── 日面：真实海陆轮廓 ──
                 three.js 那张 earth_atmos 自带一点云，这里压暗它，
                 好让独立的云层贴图当主角（否则会叠出双层云）。 */
              vec3 day = texture2D(uDayMap, vUv).rgb;
              day = mix(vec3(dot(day, vec3(0.299, 0.587, 0.114))), day, 1.22);
              day *= 0.88;

              /* ── 云层：独立贴图，随时间缓慢西移 ── */
              vec2 cuv = vec2(fract(vUv.x + uTime * 0.0016), vUv.y);
              float clouds = texture2D(uCloudMap, cuv).r;
              clouds = smoothstep(0.16, 0.86, clouds);

              /* ── 光照：朗伯 + 柔和晨昏线 ── */
              float lit = smoothstep(-0.20, 0.30, ndl);

              /* 云在朝阳侧更亮，背光侧偏灰 */
              vec3 cloudCol = mix(vec3(0.42, 0.46, 0.54), vec3(1.0, 0.99, 0.97), lit);
              vec3 albedo = mix(day, cloudCol, clouds * 0.80);

              vec3 col = albedo * (0.045 + 1.85 * lit);

              /* ── 夜面城市灯光：直接用 NASA 夜景贴图 ── */
              vec3 lights = texture2D(uLightsMap, vUv).rgb;
              float night = 1.0 - lit;
              col += lights * night * 1.55;

              /* ── 海洋镜面高光（用亮度反推海陆：海面在日面图上很暗） ── */
              float oceanMask = 1.0 - smoothstep(0.05, 0.18, dot(day, vec3(0.299, 0.587, 0.114)));
              vec3 H = normalize(L + V);
              float spec = pow(max(dot(N, H), 0.0), 52.0);
              col += vec3(1.0, 0.97, 0.90) * spec * oceanMask * 0.9 * lit
                     * (1.0 - clouds * 0.8);

              /* ── 大气边缘光（菲涅尔） ── */
              float fres = 1.0 - clamp(dot(N, V), 0.0, 1.0);
              col += vec3(0.24, 0.52, 1.0) * pow(fres, 2.6) * (0.30 + 1.0 * max(ndl, 0.0));

              gl_FragColor = vec4(col, 1.0);
            }
          `}));Z.position.copy(z),v.add(Z);const ct=new t.Mesh(new t.SphereGeometry(N*1.075,80,56),new t.ShaderMaterial({uniforms:{uSunDir:Q.uSunDir},transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,side:t.BackSide,fog:!1,vertexShader:`
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            void main() {
              vec4 worldPos = modelMatrix * vec4(position, 1.0);
              vNormalW = normalize(mat3(modelMatrix) * normal);
              vViewDirW = normalize(cameraPosition - worldPos.xyz);
              gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
          `,fragmentShader:`
            varying vec3 vNormalW;
            varying vec3 vViewDirW;
            uniform vec3 uSunDir;
            void main() {
              float fres = 1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDirW)), 0.0, 1.0);
              float lit = 0.28 + 0.90 * max(dot(normalize(vNormalW), normalize(uSunDir)), 0.0);
              gl_FragColor = vec4(vec3(0.30, 0.58, 1.0), pow(fres, 2.4) * lit * 0.62);
            }
          `}));ct.position.copy(z),v.add(ct);const lt=new t.Mesh(new t.SphereGeometry(N*.27,48,34),new t.MeshStandardMaterial({map:K(ae),roughness:.98,metalness:0,emissive:724242,color:12170926}));lt.position.copy(Wt),v.add(lt);const Kt=[{orbit:900,radius:22,color:10260870,emissive:1709842,phase:.9},{orbit:1450,radius:40,color:14200946,emissive:2760979,phase:2.4},{orbit:3300,radius:58,color:11818298,emissive:2363401,phase:4.1},{orbit:4700,radius:190,color:13215352,emissive:2761238,phase:1.2},{orbit:6200,radius:162,color:13351308,emissive:2827800,ring:!0,phase:3.3},{orbit:7900,radius:112,color:9423830,emissive:1517612,phase:5.6},{orbit:9500,radius:108,color:4878271,emissive:1055280,phase:.4}],Bt=[];Kt.forEach(e=>{const o=new t.Mesh(new t.SphereGeometry(e.radius,40,28),new t.MeshStandardMaterial({color:e.color,emissive:e.emissive,roughness:.88,metalness:.05}));if(o.position.set(Math.cos(e.phase)*e.orbit,Math.sin(e.phase*2.1)*e.orbit*.02,Math.sin(e.phase)*e.orbit),e.ring){const r=new t.Mesh(new t.RingGeometry(e.radius*1.45,e.radius*2.3,96),new t.MeshBasicMaterial({color:14206875,side:t.DoubleSide,transparent:!0,opacity:.36,depthWrite:!1}));r.rotation.x=Math.PI/2-.36,o.add(r)}v.add(o),Bt.push(o);const n=240,a=[];for(let r=0;r<=n;r++){const s=r/n*Math.PI*2;a.push(Math.cos(s)*e.orbit,0,Math.sin(s)*e.orbit)}const m=new t.BufferGeometry;m.setAttribute("position",new t.Float32BufferAttribute(a,3));const i=new t.Line(m,new t.LineBasicMaterial({color:6063792,transparent:!0,opacity:.18,depthWrite:!1,fog:!1}));v.add(i)});const dt=new t.Vector3(-760,300,1120),mt=new t.Vector3(900,2100,-7800),Jt=mt.clone().sub(dt).normalize(),F=new t.Group,_t=new t.Mesh(new t.SphereGeometry(7.5,24,18),new t.MeshBasicMaterial({color:16777215,fog:!1}));F.add(_t);const ut=new t.Sprite(new t.SpriteMaterial({map:rt("rgba(255,255,255,1)","rgba(150,235,255,0.55)",128),transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,fog:!1}));ut.scale.setScalar(118),F.add(ut);const U=30,D=new t.BufferGeometry,W=new Float32Array((U+1)*2*3),T=new Float32Array((U+1)*2*3),Vt=[];for(let e=0;e<U;e++){const o=e*2;Vt.push(o,o+1,o+2,o+1,o+3,o+2)}D.setIndex(Vt),D.setAttribute("position",new t.BufferAttribute(W,3)),D.setAttribute("color",new t.BufferAttribute(T,3)),F.add(new t.Mesh(D,new t.MeshBasicMaterial({vertexColors:!0,transparent:!0,side:t.DoubleSide,depthWrite:!1,blending:t.AdditiveBlending,fog:!1})));const R=w?80:180,ht=new t.BufferGeometry,H=new Float32Array(R*3),Dt=new Float32Array(R);for(let e=0;e<R;e++)Dt[e]=Math.random();ht.setAttribute("position",new t.BufferAttribute(H,3));const Lt=new t.Points(ht,new t.PointsMaterial({size:6.5,sizeAttenuation:!0,map:rt("rgba(215,250,255,1)","rgba(100,195,255,0.5)",48),color:12577535,transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,fog:!1}));F.add(Lt),v.add(F);{const e=w?10:22,o=new t.BufferGeometry,n=new Float32Array(e*6),a=new Float32Array(e*6),m=new t.Color;for(let r=0;r<e;r++){const s=6e3+Math.random()*16e3,d=Math.random()*Math.PI*2,h=Math.cos(d)*s,c=(Math.random()-.5)*6e3,u=Math.sin(d)*s,l=240+Math.random()*700;n[r*6]=h,n[r*6+1]=c,n[r*6+2]=u,n[r*6+3]=h+(Math.random()-.5)*l,n[r*6+4]=c+(Math.random()-.5)*l*.35,n[r*6+5]=u+(Math.random()-.5)*l,m.setHSL(.55+Math.random()*.08,.5,.6+Math.random()*.3);const f=.16+Math.random()*.3;a[r*6]=m.r*f,a[r*6+1]=m.g*f,a[r*6+2]=m.b*f,a[r*6+3]=0,a[r*6+4]=0,a[r*6+5]=0}o.setAttribute("position",new t.BufferAttribute(n,3)),o.setAttribute("color",new t.BufferAttribute(a,3));const i=new t.LineSegments(o,new t.LineBasicMaterial({vertexColors:!0,transparent:!0,opacity:.5,depthWrite:!1,blending:t.AdditiveBlending,fog:!1}));i.frustumCulled=!1,v.add(i)}const ft=[new t.Vector3(2400,760,2400),new t.Vector3(4500,1250,1150),new t.Vector3(-2600,8400,-6200)],E=new t.Vector3,L=new t.Vector3,Gt=new t.Vector3,kt=new t.Vector3;function Nt(e,o,n,a){E.copy(o).sub(e).normalize(),L.crossVectors(E,new t.Vector3(0,1,0)),L.lengthSq()<1e-8&&L.set(1,0,0),L.normalize(),Gt.crossVectors(L,E).normalize();const m=Math.tan(p.fov*Math.PI/360),i=m*p.aspect,r=(n-.5)*2*i,s=(.5-a)*2*m;return kt.copy(E).addScaledVector(L,-r).addScaledVector(Gt,-s),e.clone().add(kt.normalize().multiplyScalar(1200))}function zt(e){const o=vt(ft,e),n=.88+e*.06,a=.78,m=Nt(o,new t.Vector3(0,0,0),n,.3),i=Nt(o,z,a,.24),r=Math.min(1,Math.max(0,(e-.2)/.35));return m.lerp(i,r),e>.72&&m.lerp(new t.Vector3(0,0,0),Math.min(1,(e-.72)/.28)),m}function pt(e){const o=Math.min(1,Math.max(0,e)),n=o*o*(3-2*o),a=Math.sin(Math.PI*o)*.18;return Math.min(1,Math.max(0,n*.86+o*.14+a*(o>0&&o<1?1:0)))}function vt(e,o){const n=e.length-1,a=Math.min(1,Math.max(0,o))*n,m=Math.min(Math.floor(a),n-1),i=a-m,r=i*i*(3-2*i);return e[m].clone().multiplyScalar(1-r).addScaledVector(e[m+1],r)}let I=0,B=0;function wt(){const o=document.documentElement.scrollHeight-window.innerHeight;I=o<=0?0:Math.min(1,Math.max(0,window.scrollY/o))}/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)&&(window.__dsProbe=e=>{const o=p.position.clone(),n=p.quaternion.clone();p.position.copy(vt(ft,pt(e))),p.lookAt(zt(pt(e))),p.updateMatrixWorld(!0),p.updateProjectionMatrix();const a=(i,r)=>{let s=1,d=0,h=1,c=0,u=!1;for(let f=0;f<96;f++){const y=f/96*Math.PI*2,M=Math.acos(1-2*(f%48)/48),x=i.clone().addScaledVector(new t.Vector3(Math.sin(M)*Math.cos(y),Math.cos(M),Math.sin(M)*Math.sin(y)),r);if(x.clone().applyMatrix4(p.matrixWorldInverse).z>-1)continue;u=!0;const _=x.project(p),et=_.x*.5+.5,ot=-_.y*.5+.5;s=Math.min(s,et),d=Math.max(d,et),h=Math.min(h,ot),c=Math.max(c,ot)}if(!u)return null;const l=f=>+f.toFixed(3);return{x0:l(s),x1:l(d),y0:l(h),y1:l(c),w:l(d-s),h:l(c-h),cx:l((s+d)/2),cy:l((h+c)/2)}},m={p:e,cam:p.position.toArray().map(Math.round),sun:a(new t.Vector3(0,0,0),k),earth:a(z,N),moon:a(Wt,N*.27),comet:a(dt.clone().lerp(mt,Math.pow(e,.85)),10)};return p.position.copy(o),p.quaternion.copy(n),p.updateMatrixWorld(!0),m});const gt=new t.Vector3,tt=new t.Vector3;let j=0,Mt=performance.now();function Qt(e,o){gt.copy(dt).lerp(mt,Math.pow(e,.85)),F.position.copy(gt),F.lookAt(gt.clone().add(Jt));const n=pt(e);p.position.copy(vt(ft,n));const a=Math.sin(o*.31)*1.2+Math.sin(o*.17+1.3)*.8,m=Math.cos(o*.24+.7)*1+Math.sin(o*.13)*.6;p.position.x+=a,p.position.y+=m,p.position.z+=Math.sin(o*.19+2.1)*.9,tt.copy(zt(n)),tt.x+=Math.sin(o*.21+.4)*2.4,tt.y+=Math.cos(o*.27+1.8)*1.8,p.lookAt(tt),p.rotateZ(Math.sin(o*.16)*.0018),Q.uSunDir.value.copy(z).negate().normalize(),st.rotation.y=o*.0075,Z.rotation.y=o*.03,ct.rotation.y=Z.rotation.y,Bt.forEach((s,d)=>{s.rotation.y=o*(.05+d*.012)}),lt.rotation.y=o*.045;const i=.8+e*1,r=900*i;for(let s=0;s<=U;s++){const d=s/U,h=(Math.sin(d*Math.PI)*.6+.13)*34*i,c=-d*r,u=s*2;W[u*3]=-h,W[u*3+1]=0,W[u*3+2]=c,W[(u+1)*3]=h,W[(u+1)*3+1]=0,W[(u+1)*3+2]=c;const l=Math.pow(1-d,2.2);for(const f of[0,1])T[(u+f)*3]=l*.82,T[(u+f)*3+1]=l*.95,T[(u+f)*3+2]=l}D.attributes.position.needsUpdate=!0,D.attributes.color.needsUpdate=!0,_t.scale.setScalar(.9+Math.sin(o*6)*.13),ut.scale.setScalar(118+Math.sin(o*4.4)*14);for(let s=0;s<R;s++){const d=Dt[s],h=(d+o*.2)%1;H[s*3]=Math.sin(d*91.7)*22*(.3+h),H[s*3+1]=Math.cos(d*57.3)*13*(.2+h),H[s*3+2]=-h*r*.95}ht.attributes.position.needsUpdate=!0,Lt.material.opacity=.7*(.5+e*.5),Xt.forEach((s,d)=>{const h=1+Math.sin(o*(.42+d*.15)+d*1.3)*.035;s.scale.setScalar(Ft[d].s*h)}),Pt.forEach(({sp:s,base:d,phase:h})=>{s.material.opacity=d*(.88+.12*Math.sin(o*.11+h))}),X.rotation.y=o*.0035,X.position.y=Math.sin(o*.05)*90,St.rotation.y=o*.0018,At.rotation.y=o*.0042,Ct.rotation.y=o*.0026,qt.rotation.y=-o*.0022,C.style.setProperty("--ds-scrim-opacity",S(B).toFixed(3)),it.uBrightness.value=.86-e*.16}let O=!0;function bt(){if(!O)return;requestAnimationFrame(bt);const e=performance.now();j+=Math.min(.05,(e-Mt)/1e3),Mt=e,$.uTime.value=j,it.uTime.value=j,Q.uTime.value=j,B+=(I-B)*.06,Math.abs(I-B)<2e-4&&(B=I),Qt(B,j),g.render(v,p)}wt(),B=I;function Zt(){p.aspect=window.innerWidth/window.innerHeight,p.updateProjectionMatrix(),g.setSize(window.innerWidth,window.innerHeight,!1),A=Math.min(window.devicePixelRatio,window.innerWidth<768?1.5:2),g.setPixelRatio(A),$.uPixelRatio.value=A,wt()}window.addEventListener("scroll",wt,{passive:!0}),window.addEventListener("resize",Zt,{passive:!0}),document.addEventListener("visibilitychange",()=>{document.hidden?O=!1:O||(O=!0,Mt=performance.now(),bt())}),g.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault(),O=!1,b.remove(),C.remove(),document.body.dataset.dsFallback="context-lost",console.warn("[ds-bg] WebGL 上下文丢失，已退回静态深空背景")}),bt()};document.body.classList.add("ds-3d-page");const at=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let P=!1,Y="";try{const t=document.createElement("canvas"),w=t.getContext("webgl2"),b=w?null:t.getContext("webgl");P=!!(window.WebGLRenderingContext&&(w||b)),P||(Y="no-webgl-context")}catch{P=!1,Y="webgl-probe-threw"}const V=P?at?"reduced-motion":"":Y;V?(document.body.dataset.dsFallback=V,console.info("[ds-bg] 3D 背景未启动（原因："+V+"），已使用静态深空背景，页面内容不受影响。")):Et(()=>import("./three.module.iOYB3rD4.js"),[]).then(t=>{try{q(t)}catch(w){document.body.dataset.dsFallback="boot-failed",console.warn("[ds-bg] 3D 场景初始化失败，已退回静态深空背景",w)}}).catch(t=>{document.body.dataset.dsFallback="three-load-failed",console.warn("[ds-bg] Three.js 加载失败，已退回静态深空背景",t)})}
