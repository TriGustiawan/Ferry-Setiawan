const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Siapa Nama Anda? ', (nama) => {
    rl.question('Apa yang Anda Pikirkan tentang NodeJS? ', (jawaban) => {
        const respon = {
            nama: nama,
            jawaban: jawaban
        };

        // Check if the file exists first, otherwise initialize an empty array
        let responder = [];
        try {
            const file = fs.readFileSync('responnode.json', 'utf-8');
            responder = JSON.parse(file);
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File tidak ditemukan, membuat file baru...');
            } else {
                console.error('Terjadi kesalahan saat membaca file:', err);
                return;
            }
        }

        // Add the new response to the array
        responder.push(respon);

        // Write the updated array back to the file
        fs.writeFileSync('responnode.json', JSON.stringify(responder, null, 2));

        console.log(`Terima Kasih ${nama} atas respon Anda`);
        rl.close();
    });
});
