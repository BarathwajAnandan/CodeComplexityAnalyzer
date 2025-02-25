// Create a canvas and draw a simple "TC" text as the icon
const sizes = [16, 32, 48, 128];
const icons = {};

sizes.forEach(size => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, size, size);
    
    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TC', size/2, size/2);
    
    // Convert to base64
    icons[size] = canvas.toDataURL();
});

export default icons; 