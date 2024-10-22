class NilaiController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    tampilkanRataRata(nilai) {
        try {
            const modelNilai = new this.model(nilai);
            const rataRata = modelNilai.hitungRataRata();
            document.getElementById("output").innerHTML = this.view.render(rataRata, 'rataRata');
        } catch (error) {
            document.getElementById("output").innerHTML = this.view.renderError(error.message);
        }
    }

    tampilkanTotal(nilai) {
        try {
            const modelNilai = new this.model(nilai);
            const total = modelNilai.hitungTotal();
            document.getElementById("output").innerHTML = this.view.render(total, 'total');
        } catch (error) {
            document.getElementById("output").innerHTML = this.view.renderError(error.message);
        }
    }
}

class Nilai {
    constructor(nilai) {
        this.nilai = nilai;
    }

    hitungRataRata() {
        if (!Array.isArray(this.nilai) || this.nilai.length === 0) {
            throw new Error("Data nilai tidak valid atau kosong.");
        }
        const total = this.nilai.reduce((acc, curr) => acc + curr, 0);
        return total / this.nilai.length;
    }

    hitungTotal() {
        if (!Array.isArray(this.nilai) || this.nilai.length === 0) {
            throw new Error("Data nilai tidak valid atau kosong.");
        }
        return this.nilai.reduce((acc, curr) => acc + curr, 0);
    }
}

class NilaiView {
    render(value, type) {
        if (type === 'rataRata') {
            return `
                <div class="nilai-card">
                    <p>Rata-rata nilai: ${value}</p>
                </div>
            `;
        } else if (type === 'total') {
            return `
                <div class="nilai-card">
                    <p>Total nilai: ${value}</p>
                </div>
            `;
        }
    }

    renderError(error) {
        return `
            <div class="nilai-card error">
                <p>Error: ${error}</p>
            </div>
        `;
    }
}

// Inisialisasi dan Penggunaan
const nilaiController = new NilaiController(Nilai, NilaiView);
nilaiController.tampilkanRataRata([85, 90, 75, 95]); // Menampilkan rata-rata
nilaiController.tampilkanTotal([85, 90, 75, 95]);    // Menampilkan total nilai
nilaiController.tampilkanRataRata([]);               // Menampilkan error: Data nilai tidak valid atau kosong.

function bagi(a, b) {
    try {
        if (b === 0) {
            throw new Error("Pembagian dengan nol tidak diperbolehkan.");
        }
        return a / b;
    } catch (error) {
        console.error("Terjadi error:", error.message);
    } finally {
        console.log("Operasi pembagian selesai.");
    }
}

// Penggunaan fungsi bagi
console.log(bagi(10, 2)); // Output: 5
console.log(bagi(10, 0)); // Output: Terjadi error: Pembagian dengan nol tidak diperbolehkan.
//                         //         Operasi pembagian selesai.
