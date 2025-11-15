// Ürün veritabanı
const products = [
    // Kadın Tokaları - Kurdeleli
    {
        id: 1,
        name: "Klasik Kırmızı Kurdele Toka",
        category: "kadin",
        description: "Şık kırmızı kurdele ile tasarlanmış zarif toka",
        price: "₺89",
        colors: ["red"],
        emoji: "🎀"
    },
    {
        id: 2,
        name: "Siyah Kurdele Toka",
        category: "kadin",
        description: "Klasik siyah kurdele toka, her kıyafetle uyumlu",
        price: "₺79",
        colors: ["black"],
        emoji: "🖤"
    },
    {
        id: 3,
        name: "Beyaz Kurdele Toka",
        category: "kadin",
        description: "Temiz ve zarif beyaz kurdele toka",
        price: "₺85",
        colors: ["white"],
        emoji: "🤍"
    },
    {
        id: 4,
        name: "Kırmızı-Beyaz Kurdele Toka",
        category: "kadin",
        description: "Kırmızı ve beyaz kombinasyonlu özel tasarım",
        price: "₺95",
        colors: ["red", "white"],
        emoji: "🎀"
    },
    {
        id: 5,
        name: "Siyah-Beyaz Kurdele Toka",
        category: "kadin",
        description: "Zarif siyah-beyaz kurdele kombinasyonu",
        price: "₺92",
        colors: ["black", "white"],
        emoji: "💎"
    },
    {
        id: 6,
        name: "Kırmızı-Siyah Kurdele Toka",
        category: "kadin",
        description: "Göz alıcı kırmızı-siyah kurdele toka",
        price: "₺98",
        colors: ["red", "black"],
        emoji: "✨"
    },
    
    // Çocuk Tokaları - Lisanslı Karakterler
    {
        id: 7,
        name: "Barbie Toka",
        category: "cocuk",
        description: "Resmi Barbie lisanslı pembe toka",
        price: "₺129",
        colors: ["red", "white"],
        emoji: "👸"
    },
    {
        id: 8,
        name: "Kuromi Toka",
        category: "cocuk",
        description: "Sevimli Kuromi karakterli lisanslı toka",
        price: "₺119",
        colors: ["red", "black"],
        emoji: "🐱",
        image: "images/kuromi.png"
    },
    {
        id: 9,
        name: "Stitch Toka",
        category: "cocuk",
        description: "Disney Stitch karakterli özel toka",
        price: "₺139",
        colors: ["red", "white", "black"],
        emoji: "👾"
    },
    {
        id: 10,
        name: "Barbie Prenses Toka",
        category: "cocuk",
        description: "Barbie prenses temalı özel tasarım toka",
        price: "₺135",
        colors: ["red", "white"],
        emoji: "👑"
    },
    {
        id: 11,
        name: "Kuromi Macera Toka",
        category: "cocuk",
        description: "Kuromi macera serisi lisanslı toka",
        price: "₺125",
        colors: ["red", "black"],
        emoji: "🎯",
        image: "images/kuromi.png"
    },
    {
        id: 12,
        name: "Stitch Uzaylı Toka",
        category: "cocuk",
        description: "Stitch uzaylı temalı eğlenceli toka",
        price: "₺145",
        colors: ["red", "white", "black"],
        emoji: "🚀"
    }
];

// DOM elementleri
const productsGrid = document.getElementById('productsGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const navLinks = document.querySelectorAll('.nav-link');

let currentCategory = 'all';

// Ürün kartı oluşturma fonksiyonu
function createProductCard(product) {
    const colorDots = product.colors.map(color => {
        const colorClass = `color-${color}`;
        return `<div class="color-dot ${colorClass}" title="${color === 'red' ? 'Kırmızı' : color === 'black' ? 'Siyah' : 'Beyaz'}"></div>`;
    }).join('');

    // Görsel varsa img tag'i, yoksa emoji kullan
    const imageContent = product.image 
        ? `<img src="${product.image}" alt="${product.name}" onerror="this.parentElement.innerHTML='${product.emoji}'">`
        : product.emoji;

    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${imageContent}
            </div>
            <div class="product-info">
                <span class="product-category ${product.category}">${product.category === 'kadin' ? 'Kadın' : 'Çocuk'}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-colors">
                    ${colorDots}
                </div>
                <div class="product-price">${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Sepete Ekle</button>
            </div>
        </div>
    `;
}

// Ürünleri göster
function displayProducts(category = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem; font-size: 1.2rem; color: #666;">Bu kategoride ürün bulunamadı.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        productsGrid.innerHTML += createProductCard(product);
    });
}

// Kategori değiştirme
function changeCategory(category) {
    currentCategory = category;
    
    // Butonları güncelle
    categoryButtons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Nav linklerini güncelle
    navLinks.forEach(link => {
        if (link.dataset.category === category) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Ürünleri göster
    displayProducts(category);
    
    // Sayfayı yukarı kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listeners
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        changeCategory(btn.dataset.category);
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        changeCategory(link.dataset.category);
    });
});

// Sepete ekleme fonksiyonu
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Basit bir alert (gerçek uygulamada modal veya bildirim kullanılabilir)
        alert(`${product.name} sepete eklendi! 🛒`);
        
        // Buton animasyonu
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Eklendi! ✓';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }
}

// Sayfa yüklendiğinde tüm ürünleri göster
document.addEventListener('DOMContentLoaded', () => {
    displayProducts('all');
});

// Smooth scroll için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

