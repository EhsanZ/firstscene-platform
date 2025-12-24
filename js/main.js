// Main JavaScript for Nadeed Platform

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeForms();
    initializeFileUploads();
});

// Navigation handling
function initializeNavigation() {
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.dashboard-nav a, .nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Form handling
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(form);
        });
    });
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const formType = form.dataset.formType || 'default';
    
    // Simulate form submission
    showAlert('تم إرسال النموذج بنجاح', 'success');
    
    // In production, this would send data to backend
    console.log('Form submitted:', formType, Object.fromEntries(formData));
}

// File upload handling
function initializeFileUploads() {
    const fileUploadAreas = document.querySelectorAll('.file-upload-area');
    
    fileUploadAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        
        area.addEventListener('click', () => {
            if (input) input.click();
        });
        
        if (input) {
            input.addEventListener('change', function(e) {
                handleFileSelect(e, area);
            });
        }
    });
}

function handleFileSelect(event, area) {
    const files = event.target.files;
    if (files.length > 0) {
        const fileName = files[0].name;
        const fileSize = (files[0].size / 1024 / 1024).toFixed(2);
        
        area.innerHTML = `
            <p>✓ تم اختيار الملف</p>
            <p><strong>${fileName}</strong></p>
            <p>الحجم: ${fileSize} ميجابايت</p>
            <button type="button" class="btn-secondary" onclick="this.parentElement.querySelector('input').value=''; this.parentElement.innerHTML='<p>اضغط لاختيار ملف أو اسحب الملف هنا</p><input type=\\'file\\' style=\\'display:none\\'>'">إزالة</button>
        `;
        
        // Re-initialize the input
        const newInput = area.querySelector('input[type="file"]');
        if (newInput) {
            newInput.addEventListener('change', function(e) {
                handleFileSelect(e, area);
            });
        }
    }
}

// Alert system
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Workflow stage management
function updateWorkflowStage(stageId, newStage) {
    const stages = document.querySelectorAll('.workflow-stage');
    stages.forEach((stage, index) => {
        stage.classList.remove('active', 'completed');
        if (index < newStage) {
            stage.classList.add('completed');
        } else if (index === newStage) {
            stage.classList.add('active');
        }
    });
}

// Status badge colors
const statusColors = {
    'جديد': 'status-new',
    'تم التواصل المبدئي': 'status-review',
    'جاري تقييم النص': 'status-review',
    'تم قبوله بشروط': 'status-review',
    'تم قبوله بدون شروط': 'status-accepted',
    'تم رفضه': 'status-rejected',
    'انتظار رد من الكاتب': 'status-review',
    'تم توقيع العقد': 'status-accepted',
    'جاهز للنشر': 'status-accepted',
    'تم النشر': 'status-published'
};

function getStatusClass(status) {
    return statusColors[status] || 'status-new';
}

// Rating input
function setupRatingInput(input) {
    input.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 10) this.value = 10;
    });
}

// Initialize rating inputs
document.addEventListener('DOMContentLoaded', function() {
    const ratingInputs = document.querySelectorAll('.rating-input input[type="number"]');
    ratingInputs.forEach(setupRatingInput);
});

// Export functions for use in other scripts
window.NadeedPlatform = {
    showAlert,
    updateWorkflowStage,
    getStatusClass,
    handleFormSubmit
};

