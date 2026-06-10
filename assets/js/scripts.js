
// Canvas background — node graph
const canvas = document.getElementById('canvas-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let nodes = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function initNodes() {
        nodes = [];
        const count = Math.floor(window.innerWidth / 80);
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 2 + 1
            });
        }
    }
    initNodes();

    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get current theme's primary color dynamically
        const rootStyles = getComputedStyle(document.documentElement);
        const cyanRgb = rootStyles.getPropertyValue('--cyan-rgb').trim() || '74, 123, 157';

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${cyanRgb}, ${0.15 * (1 - dist / 160)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        // Draw nodes
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${cyanRgb}, 0.5)`;
            ctx.fill();
            // update
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        });
        requestAnimationFrame(drawCanvas);
    }
    drawCanvas();
}

// Data streams matrix animation
const streamContainer = document.getElementById('streams');
if (streamContainer) {
    const streamData = [
        'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'FROM', 'WHERE', 'JOIN', 'NULL', 'TRUE', 'INDEX', 'QUERY', 'TABLE', 'LIMIT', 'GROUP BY', 'ORDER BY',
        'AWS::EC2', 'S3::Bucket', 'Lambda', 'VPC', 'CIDR', 'SSH', 'TCP', 'UDP', 'RDS', 'PITR', 'GET', 'POST', '200 OK', '404', '500',
        'git push', 'git pull', 'pip install', 'npm run', 'deploy', 'scale', 'monitor', 'snapshot', 'backup', 'region', 'zone', 'cluster', 'node', 'pod', 'container'
    ];

    function createStream() {
        const el = document.createElement('div');
        el.className = 'stream';
        const words = Array.from({ length: 20 }, () => streamData[Math.floor(Math.random() * streamData.length)]).join('  ·  ');
        el.textContent = words;
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (18 + Math.random() * 20) + 's';
        el.style.animationDelay = (Math.random() * -30) + 's';
        streamContainer.appendChild(el);
    }
    for (let i = 0; i < 12; i++) createStream();
}

// Scroll reveal observer
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
}