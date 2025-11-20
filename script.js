// ===================== أسعار القماش ====================
const clothPrices = {
    1: 250,
    2: 200,
    3: 220,
    4: 270,
    5: 950,
    6: 250,
    7: 290,
    8: 180
};

// ===================== ألوان كل نوع =====================
const colorsData = {
    1: ["كحلي", "أسود", "جملي", "رصاصي فاتح", "رصاصي غامق", "فراني", "زيتي"],
    2: ["بني محروق", "بيج", "بني فاتح", "بني غامق", "كحلي", "رصاصي فاتح", "رصاصي غامق", "فراني"],
    3: ["رصاصي فاتح", "رصاصي غامق", "بني فاتح", "بني غامق", "بيج"],
    4: ["أسود", "رصاصي فاتح", "رصاصي غامق", "بني فاتح", "بني غامق", "زيتي", "كحلي"],
    5: ["جملي", "مشمشي", "أسود", "زيتي", "فراني"],
    6: ["كحلي", "أبيض", "بني"],
    7: ["زيتي", "سماوي", "رمادي", "بني فاتح", "بني غامق", "أسود", "جملي"],
    8: ["بيج فاتح"]
};

// ===================== أسعار (التفصيل + الكُلفة) =====================
const finalPrices = {
    1: 250,   // تفصيل عادي
    2: 300,   // تفصيل مكفف
    3: 850,   // نص كُلفة
    4: 1500,  // كُلفة كاملة
    5: 1000,  // كُلفة كاملة بدون شريط
    6: 600    // نص كُلفة بدون شريط
};

// ===================== عناصر HTML =====================
const clothRadios = document.querySelectorAll('input[name="cloth"]');
const colorSection = document.getElementById("color-section");
const colorsDiv = document.getElementById("colors");
const lengthSection = document.getElementById("length-section");
const finalSection = document.getElementById("final-section");
const priceSpan = document.getElementById("price");

// ===================== عند اختيار نوع القماش =====================
clothRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        const clothId = radio.value;

        // عرض الألوان
        colorsDiv.innerHTML = "";
        colorsData[clothId].forEach(color => {
            colorsDiv.innerHTML += `
                <label><input type="radio" name="color" value="${color}"> ${color}</label><br>
            `;
        });

        colorSection.style.display = "block";
        lengthSection.style.display = "none";
        finalSection.style.display = "none";

        addColorEvents();
        updatePrice();
    });
});

// ===================== بعد اختيار اللون =====================
function addColorEvents() {
    document.querySelectorAll('input[name="color"]').forEach(radio => {
        radio.addEventListener("change", () => {
            lengthSection.style.display = "block";
            finalSection.style.display = "none";
            addLengthEvents();
            updatePrice();
        });
    });
}

// ===================== بعد اختيار الطول =====================
function addLengthEvents() {
    document.querySelectorAll('input[name="length"]').forEach(radio => {
        radio.addEventListener("change", () => {
            finalSection.style.display = "block";
            addFinalEvents();
            updatePrice();
        });
    });
}

// ===================== بعد اختيار التفصيل + الكُلفة =====================
function addFinalEvents() {
    document.querySelectorAll('input[name="final"]').forEach(radio => {
        radio.addEventListener("change", updatePrice);
    });
}

// ===================== حساب السعر =====================
function updatePrice() {

    let total = 0;

    const cloth = document.querySelector('input[name="cloth"]:checked');
    const length = document.querySelector('input[name="length"]:checked');
    const finalChoice = document.querySelector('input[name="final"]:checked');

    if (cloth) {
        const base = clothPrices[cloth.value];

        if (length) {
            total += base * length.value;  // سعر القماش × عدد الأمتار
        }
    }

    if (finalChoice) {
        total += finalPrices[finalChoice.value]; // إضافة التفصيل + الكُلفة
    }

    priceSpan.textContent = total;
}