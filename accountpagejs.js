window.addEventListener('load', function () { // Wait for page to load (prevents errors)

    document.getElementById('PlayButton').addEventListener("mouseup", () => {
        console.log('click');
        document.getElementById('container').style.animation = 'SlideToRight 0.2s ease-in 0s 1 normal forwards';
        setTimeout(() => {
            document.getElementById('container').style.display = 'none';
            document.getElementById('ConnectingPage').style.display = 'block';
        }, 201);
    });

    // Connecting page code
    const chatPanel = document.getElementById('Chat-panel');
    const resizeHandle = document.querySelector('.resize-handle');
    const content = document.getElementById('content');
    let isResizing = false;
    const handleHeight = parseFloat(getComputedStyle(resizeHandle).height) / 2;

    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.body.style.cursor = 'ns-resize';
        e.preventDefault(); // Prevent text selection during resizing
    });

    document.addEventListener('mousemove', function(e) {
        if (isResizing) {
            const minHeight = chatPanel.style.minHeight ? parseInt(chatPanel.style.minHeight, 10) : 0;
            const maxHeight = chatPanel.style.maxHeight ? parseInt(chatPanel.style.maxHeight, 10) : Infinity;
            const newHeight = e.clientY - chatPanel.getBoundingClientRect().top - handleHeight;
            if (newHeight > minHeight && newHeight < maxHeight) {
                chatPanel.style.height = `${newHeight}px`;
            }
        }
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
        document.body.style.cursor = 'default';
    });

    // Drag to scroll functionality
    let isDragging = false;
    let startY;
    console.log(document.getElementsByClassName('Chat-message').length)

    chatPanel.addEventListener('mousedown', function(e) {
        isDragging = true;
        startY = e.clientY - content.offsetTop;
        document.body.style.cursor = 'grabbing';
        e.preventDefault(); // Prevent text selection during dragging
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaY = e.clientY - startY;
            if (deltaY <= 5 && deltaY >= -(content.offsetHeight - chatPanel.offsetHeight) - 10) {
                content.style.top = `${deltaY}px`;
            }
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
});