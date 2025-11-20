// الألوان المتاحة لكل نوع قماش
const colorsData = {
    1: ["كحلي", "أبيض", "بني"],
    2: ["أسود", "رمادي"],
    3: ["أزرق", "بيج", "سكري"],
    4: ["أخضر", "نبيتي"]
};

// أول Step = اختيار القماش
const clothRadios = document.querySelectorAll('input[name="cloth"]');
const colorSection = document.getElementById("color-section");
const colorsDiv = document.getElementById("colors");

clothRadios.forEach(radio => {
    radio.addEventListener("change", function () {

        // امسح الألوان القديمة
        colorsDiv.innerHTML = "";

        // هات الألوان الخاصة بالقماش ده
        const clothId = this.value;
        const availableColors = colorsData[clothId];

        // ضيف كل لون
        availableColors.forEach(color => {
            colorsDiv.innerHTML +=
                "<label><input type='radio' name='color' value='" + color + "'> " + color + "</label><br>";
        });

        // إظهار قسم الألوان
        colorSection.style.display = "block";

        // اخفاء اللي بعده
        document.getElementById("length-section").style.display = "none";
        document.getElementById("tailor-section").style.display = "none";
        document.getElementById("cost-section").style.display = "none";

        updatePrice();
        addColorEvents();
    });
});

function addColorEvents() {
    const colorRadios = document.querySelectorAll("input[name='color']");
    colorRadios.forEach(radio => {
        radio.addEventListener("change", function () {

            document.getElementById("length-section").style.display = "block";
            document.getElementById("tailor-section").style.display = "block";
            document.getElementById("cost-section").style.display = "block";

            updatePrice();
            addOtherEvents();
        });
    });
}

function addOtherEvents() {
    const groups = ["length", "tailor", "cost"];

    groups.forEach(group => {
        const radios = document.querySelectorAll("input[name='" + group + "']");
        radios.forEach(radio => {
            radio.addEventListener("change", updatePrice);
        });
    });
}

function updatePrice() {
    let price = 0;

    // هات كل الاختيارات اللي اتعملها تشيك
    const selected = document.querySelectorAll("input[type='radio']:checked");

    selected.forEach(r => {
        price += 10; // كل حاجة 10 وإنت تعدلهم بعدين
    });

    document.getElementById("price").innerHTML = price + " جنيه";
}