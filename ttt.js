let papan = ['', '', '', '', '', '', '', '', ''];
let pemain = 'X';
let menang = false;
const warnaMenang = 'rgba(255, 213, 0, 0.7)';
const warnaSeri = 'rgba(222, 226, 177, 0.7)'



const inisialisasiPapan = () => {
    papan = ['', '', '', '', '', '', '', '', ''];
    document.querySelector('.container').style.boxShadow = 'inset 0 0 5px rgba(0, 0, 0, 0.3), inset 1px 2px 5px rgba(2, 27, 26, 1), 0 0 15px rgba(122, 179, 124, 0.7)';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    document.getElementById('message').textContent = '';
    pemain = 'X';
    menang = false;
};

const tampilkanPesan = (pesan) => {
    document.getElementById('message').textContent = pesan;
};

const gantiPemain = () => {
    pemain = (pemain === 'X') ? 'O' : 'X';
};

const tempatTersedia = (index) => {
    return papan[index] === '';
};

const tandaiPapan = (index) => {
    papan[index] = pemain;
    document.querySelector(`.cell[data-index="${index}"]`).textContent = pemain;
};

const reaksi = (warna) => {
    document.querySelector('.container').style.boxShadow = `inset 0 0 5px rgba(0, 0, 0, 0.3), inset 1px 2px 5px rgba(2, 27, 26, 1), 0 0 15px ${warna},  0 0 50px ${warna}`;
};

const cekKemenangan = () => {
    const polaKemenangan = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (let pola of polaKemenangan) {
        const [a, b, c] = pola;
        if (papan[a] && papan[a] === papan[b] && papan[a] === papan[c]) {
            return true;
        }
    }
    return false;
};

const cekSeri = () => {
    return papan.every(cell => cell !== '');
};

const klikSel = (index) => {
    if (menang || !tempatTersedia(index)) {
        return;
    }

    tandaiPapan(index);

    if (cekKemenangan()) {
        menang = true;
        tampilkanPesan(`Selamat! Pemain ${pemain} menang!`);
        reaksi(warnaMenang);
    } else if (cekSeri()) {
        tampilkanPesan('Permainan seri.');
        reaksi(warnaSeri);
    } else {
        gantiPemain();
        tampilkanPesan(`Giliran pemain : ${pemain}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const index = parseInt(cell.getAttribute('data-index'));
            klikSel(index);
        });
    });

    document.getElementById('reset').addEventListener('click', inisialisasiPapan);

    inisialisasiPapan();
});
