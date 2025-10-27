document.addEventListener('DOMContentLoaded', () => {

    // --- (BAGIAN 1) DATA PRODUK ANDA ---
    // Ganti data ini dengan produk Anda yang sebenarnya.
    const products = [
        {
            name: 'Undangan Walimatul Aqiqah',
            image: 'Undangan Nikah, Khitan, Walimatul, dan Tahlil/Undangan Walimatul/Undangan-Walimatul-Aqiqah-Folio.jpg', // Ganti dengan path Anda, misal 'images/walimatul-01.jpg'
            price: 1000
        },
        {
            name: 'Undangan Walimatul Ursy',
            image: 'Undangan Nikah, Khitan, Walimatul, dan Tahlil/Undangan Walimatul/Walimatul-Ursy-Folio.jpg', // Ganti dengan path Anda, misal 'images/walimatul-01.jpg'
            price: 1000
        },
        {
            name: 'Undangan Tahlilan',
            image: 'Undangan Nikah, Khitan, Walimatul, dan Tahlil/Undangan Doa dan Tahlil/100-Hari.jpg', // Ganti dengan path Anda, misal 'images/tahlilan-01.jpg'
            price: 1000
        },
        {
            name: 'Undangan Tahlilan Lipat',
            image: 'Undangan Nikah, Khitan, Walimatul, dan Tahlil/Undangan Doa dan Tahlil/Tahlil-Lipat-3.jpg', // Ganti dengan path Anda, misal 'images/tahlilan-01.jpg'
            price: 1000
        },
        {
            name: 'Undangan Khitan (Sunatan)',
            image: 'Undangan Nikah, Khitan, Walimatul, dan Tahlil/Undangan Khitan/Khitan K 01.jpeg', // Ganti dengan path Anda
            price: 3000
        },
        {
            name: 'Undangan Nikah',
            image: 'Undangan Nikah, Khitan, Walimatul, dan Tahlil/Undangan Rayya/Raya 348.jpeg', // Ganti dengan path Anda
            price: 3000
        }
        // {
        //     name: 'Undangan Ulang Tahun Anak',
        //     image: 'images/100-Hari.jpg', // Ganti dengan path Anda
        //     price: 1200
        // },
        // {
        //     name: 'Kartu Ucapan Aqiqah',
        //     image: 'images/100-Hari.jpg', // Ganti dengan path Anda
        //     price: 800
        // },
        // {
        //     name: 'Stiker Label Produk',
        //     image: 'images/100-Hari.jpg', // Ganti dengan path Anda
        //     price: 500
        // }
    ];

    // --- (BAGIAN 2) FUNGSI FORMAT RUPIAH ---
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    }

    // --- (BAGIAN 3) MENAMPILKAN PRODUK SECARA DINAMIS ---
    const productListContainer = document.getElementById('product-list');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-price">${formatRupiah(product.price)} / pcs</p>
        `;
        
        card.addEventListener('click', () => {
            // Kirim nama, harga satuan, dan URL gambar ke modal
            openModal(product.name, product.price, product.image);
        });
        
        productListContainer.appendChild(card);
    });

    // --- (BAGIAN 4) FUNGSI MODAL (POP-UP FORM) ---
    
    // Ambil semua elemen modal yang relevan
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-button');
    const modalProductName = document.getElementById('modal-product-name');
    const modalQty = document.getElementById('modal-qty');
    const modalPrice = document.getElementById('modal-price');
    const modalTotal = document.getElementById('modal-total');
    const modalProductImage = document.getElementById('modal-product-image'); // Elemen <img> di modal

    // Ambil elemen form
    const orderForm = document.getElementById('order-form');
    const productNameInput = document.getElementById('product-name-input');
    const productPriceInput = document.getElementById('product-price-input');
    const custQtyInput = document.getElementById('cust-qty'); // Input jumlah di modal
    
    // Fungsi untuk MEMBUKA modal
    function openModal(name, price, imageUrl) {
        const defaultQty = 25; 
        const total = defaultQty * price;

        // 1. Set info ringkasan
        modalProductName.textContent = name;
        modalQty.textContent = defaultQty;
        modalPrice.textContent = formatRupiah(price);
        modalTotal.textContent = formatRupiah(total);
        
        // 2. Set gambar di modal
        modalProductImage.src = imageUrl;
        modalProductImage.alt = name; 

        // 3. Simpan data di input form
        productNameInput.value = name;
        productPriceInput.value = price; 
        custQtyInput.value = defaultQty; 
        
        // 4. Tampilkan modal
        modal.style.display = 'flex';
    }

    // Fungsi untuk MENUTUP modal
    function closeModal() {
        modal.style.display = 'none';
        orderForm.reset(); 
    }

    // Event listener untuk tombol close (x)
    closeBtn.addEventListener('click', closeModal);

    // Event listener untuk klik di luar area modal (area abu-abu)
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // --- (BAGIAN 5) KALKULATOR TOTAL DINAMIS ---
    custQtyInput.addEventListener('input', () => {
        const price = parseFloat(productPriceInput.value) || 0;
        const quantity = parseInt(custQtyInput.value, 10) || 0;
        
        const total = price * quantity;
        
        modalQty.textContent = quantity;
        modalTotal.textContent = formatRupiah(total);
    });


    // --- (BAGIAN 6) FUNGSI FORM WHATSAPP ---
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        // ---------------------------------------------------
        // !!! GANTI NOMOR INI DENGAN NOMOR WA ANDA !!!
        const adminPhoneNumber = '6287853338254'; 
        // ---------------------------------------------------

        // 1. Ambil data dari form
        const productName = productNameInput.value;
        const custName = document.getElementById('cust-name').value;
        const custWA = document.getElementById('cust-wa').value;
        const custQty = custQtyInput.value; 
        const custPrice = productPriceInput.value;
        const custNotes = document.getElementById('cust-notes').value;
        
        // 2. Hitung total
        const totalAmount = parseInt(custQty, 10) * parseInt(custPrice, 10);

        // 3. Buat template pesan WhatsApp
        let message = `Halo Pleeart, saya mau konfirmasi pesanan:\n\n`;
        message += `*Produk:* ${productName}\n`;
        message += `*Jumlah:* ${custQty} pcs\n`;
        message += `*Harga Satuan:* ${formatRupiah(custPrice)}\n`;
        message += `*Total Harga:* ${formatRupiah(totalAmount)}\n\n`;
        message += `--- Data Pemesan ---\n`;
        message += `*Nama:* ${custName}\n`;
        message += `*No. WA:* ${custWA}\n`;
        message += `*Catatan:* ${custNotes}\n\n`;
        message += `Mohon diproses, terima kasih.`;

        // 4. Buat URL WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${adminPhoneNumber}&text=${encodeURIComponent(message)}`;

        // 5. Buka WhatsApp di tab baru
        window.open(whatsappURL, '_blank');

        // 6. Tutup modal
        closeModal();
    });

    
    // --- (BAGIAN 7) LOGIKA NAVIGASI MOBILE (HAMBURGER) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    // 1. Saat tombol hamburger di-klik
    menuToggle.addEventListener('click', () => {
        // Tambah/hapus class 'show' pada .nav-menu
        navMenu.classList.toggle('show');
    });

    // 2. (Opsional tapi bagus) Tutup menu saat link di-klik
    // Ini berguna untuk Single Page App, saat klik link hanya scroll
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

});