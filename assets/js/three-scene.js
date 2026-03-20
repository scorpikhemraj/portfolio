/* Guard: only run 3D scene if THREE loaded successfully */
    if (typeof THREE === 'undefined') { console.warn('[Portfolio] THREE not available, skipping 3D scene.'); }
    else (function () {
      const canvas = document.getElementById('hero-3d');
      if (!canvas) return;
      const wrap = canvas.parentElement;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      function resize() {
        const w = wrap.offsetWidth || 500;
        const h = wrap.offsetHeight || 540;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener('resize', resize);

      const redLine = new THREE.LineBasicMaterial({ color: 0xE63946, transparent: true, opacity: 0.88 });
      const dimLine = new THREE.LineBasicMaterial({ color: 0xE63946, transparent: true, opacity: 0.22 });
      const connMat = new THREE.LineBasicMaterial({ color: 0xE63946, transparent: true, opacity: 0.15 });
      const ringMat = new THREE.LineBasicMaterial({ color: 0xE63946, transparent: true, opacity: 0.28 });
      const innerMat = new THREE.MeshBasicMaterial({ color: 0xE63946, wireframe: true });

      const root = new THREE.Group();
      scene.add(root);

      const icosa = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.0, 1)), redLine.clone());
      root.add(icosa);
      const inner = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.18, 1)), dimLine.clone());
      root.add(inner);

      const torusEdge = new THREE.EdgesGeometry(new THREE.TorusGeometry(2.5, 0.007, 6, 90));
      const r1 = new THREE.LineSegments(torusEdge, ringMat.clone()); r1.rotation.x = Math.PI / 2; root.add(r1);
      const r2 = new THREE.LineSegments(torusEdge, ringMat.clone()); r2.rotation.set(Math.PI / 4, Math.PI / 6, 0); root.add(r2);
      const r3 = new THREE.LineSegments(torusEdge, ringMat.clone()); r3.rotation.set(0, Math.PI / 2, Math.PI / 3); root.add(r3);

      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 2), innerMat.clone());
      root.add(core);

      const PCOUNT = 60;
      const pPos = [];
      const pGroup = new THREE.Group();
      root.add(pGroup);
      const sGeo = new THREE.SphereGeometry(0.046, 6, 6);
      for (let i = 0; i < PCOUNT; i++) {
        const phi = Math.acos(2 * Math.random() - 1), theta = Math.random() * Math.PI * 2;
        const rad = 1.6 + Math.random() * 1.4;
        const x = rad * Math.sin(phi) * Math.cos(theta), y = rad * Math.sin(phi) * Math.sin(theta), z = rad * Math.cos(phi);
        pPos.push(new THREE.Vector3(x, y, z));
        const m = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({ color: 0xE63946, transparent: true, opacity: 0.55 }));
        m.position.set(x, y, z); pGroup.add(m);
      }

      const MAX_SEG = 80;
      const cPos = new Float32Array(MAX_SEG * 6);
      const cGeo = new THREE.BufferGeometry();
      cGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
      const cLines = new THREE.LineSegments(cGeo, connMat.clone());
      root.add(cLines);
      (function updateConn() {
        let idx = 0;
        for (let i = 0; i < PCOUNT && idx < MAX_SEG * 2; i++)
          for (let j = i + 1; j < PCOUNT && idx < MAX_SEG * 2; j++)
            if (pPos[i].distanceTo(pPos[j]) < 1.05) {
              cPos.set([pPos[i].x, pPos[i].y, pPos[i].z], idx * 3); idx++;
              cPos.set([pPos[j].x, pPos[j].y, pPos[j].z], idx * 3); idx++;
            }
        cGeo.setDrawRange(0, idx); cGeo.attributes.position.needsUpdate = true;
      })();

      const oData = [{ r: 2.2, spd: 0.008, ax: 0, ph: 0 }, { r: 2.6, spd: 0.005, ax: 1, ph: 2.1 }, { r: 2.4, spd: 0.012, ax: 2, ph: 4.2 }, { r: 1.9, spd: 0.010, ax: 0, ph: 1.2 }];
      const oGeo = new THREE.SphereGeometry(0.09, 8, 8);
      const oNodes = oData.map(d => {
        const mesh = new THREE.Mesh(oGeo, new THREE.MeshBasicMaterial({ color: 0xFF6B76 }));
        root.add(mesh); return { mesh, ...d, angle: d.ph };
      });

      let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
      document.addEventListener('mousemove', e => {
        tRY = ((e.clientX / window.innerWidth) - 0.5) * 0.7;
        tRX = ((e.clientY / window.innerHeight) - 0.5) * 0.45;
      });

      let t = 0;
      (function animate() {
        requestAnimationFrame(animate);
        t += 0.01;
        cRX += (tRX - cRX) * 0.04; cRY += (tRY - cRY) * 0.04;
        root.rotation.x = cRX + t * 0.055; root.rotation.y = cRY + t * 0.085;
        icosa.rotation.y = -t * 0.045;
        inner.rotation.x = t * 0.11; inner.rotation.z = t * 0.07;
        r1.rotation.z = t * 0.055; r2.rotation.x = t * 0.038; r3.rotation.y = t * 0.065;
        core.rotation.x = t * 0.28; core.rotation.y = t * 0.19;
        core.scale.setScalar(1 + Math.sin(t * 2.4) * 0.09);
        oNodes.forEach(o => {
          o.angle += o.spd;
          if (o.ax === 0) o.mesh.position.set(Math.cos(o.angle) * o.r, Math.sin(o.angle * .38) * .42, Math.sin(o.angle) * o.r);
          else if (o.ax === 1) o.mesh.position.set(Math.sin(o.angle * .3) * .42, Math.cos(o.angle) * o.r, Math.sin(o.angle) * o.r);
          else o.mesh.position.set(Math.cos(o.angle) * o.r, Math.sin(o.angle) * o.r, Math.cos(o.angle * .65) * .5);
        });
        pGroup.children.forEach((dot, i) => {
          dot.position.x += Math.sin(t * .8 + i * .4) * 0.003;
          dot.position.y += Math.cos(t * .6 + i * .5) * 0.002;
          dot.material.opacity = 0.28 + Math.abs(Math.sin(t * 1.1 + i * .7)) * 0.48;
        });
        renderer.render(scene, camera);
      })();
    })();