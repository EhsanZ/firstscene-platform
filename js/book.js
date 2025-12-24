// Book page JavaScript

let currentPage = 1;
let totalPages = 250;
let fontSize = 16;
let nightMode = false;

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Font size controls
function changeFontSize(action) {
    const bookContent = document.getElementById('book-content');
    if (action === 'increase') {
        fontSize = Math.min(fontSize + 2, 24);
    } else {
        fontSize = Math.max(fontSize - 2, 12);
    }
    bookContent.style.fontSize = fontSize + 'px';
}

// Font family change
function changeFontFamily(font) {
    const bookContent = document.getElementById('book-content');
    bookContent.style.fontFamily = font + ', sans-serif';
}

// Night mode toggle
function toggleNightMode() {
    nightMode = !nightMode;
    const bookContent = document.getElementById('book-content');
    const reader = document.querySelector('.book-reader');
    
    if (nightMode) {
        bookContent.style.backgroundColor = '#1a1a1a';
        bookContent.style.color = '#e0e0e0';
        reader.style.backgroundColor = '#1a1a1a';
    } else {
        bookContent.style.backgroundColor = '';
        bookContent.style.color = '';
        reader.style.backgroundColor = '';
    }
}

// Page navigation
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePageInfo();
        // In a real app, this would load the next page content
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePageInfo();
        // In a real app, this would load the previous page content
    }
}

function updatePageInfo() {
    const pageInfo = document.querySelector('.page-info');
    if (pageInfo) {
        pageInfo.textContent = `الصفحة ${currentPage} من ${totalPages}`;
    }
}

// Request access
function requestAccess() {
    if (confirm('هل تريد طلب الإذن بقراءة هذا العمل؟ سيتم إرسال الطلب إلى الكاتب.')) {
        alert('تم إرسال طلب الإذن. سيتم إشعارك عند الموافقة.');
    }
}

// Scroll to reviews
function scrollToReviews() {
    showTab('reviews');
    document.getElementById('reviews-tab').scrollIntoView({ behavior: 'smooth' });
}

// Review form
function showReviewForm() {
    document.getElementById('reviewModal').style.display = 'flex';
}

function hideReviewForm() {
    document.getElementById('reviewModal').style.display = 'none';
}

// Handle review form submission
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.querySelector('[data-form-type="book-review"]');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('تم إرسال المراجعة بنجاح. شكراً لمساهمتك!');
            hideReviewForm();
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideReviewForm();
            }
        });
    }
});

