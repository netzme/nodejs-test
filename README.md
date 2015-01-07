### INTRO ###
Testing pada server bisa dilakukan dua jenis, yaitu unit testing dan component/integration testing. Unit testing hanya mengetest fungsi suatu module/class secara isolated (tidak menaikkan server). Sedangkan component/integration testing perlu melakukan simulasi dengan memberikan request seolah-olah dari client dan butuh untuk menaikkan server secara real.

Yang perlu dilakukan adalah mencoba membuat integration testing untuk server.

### REQUIREMENTS ###
* Server adalah sebuah MQTT subscriber yang mempunyai fungsi: membaca pesan dari sebuah endpoint, menambahkan timestamp dan mengirimkan ulang pesan tersebut ke endpoint lain.
* Buat sebuah integration test yang mensimulasikan behaviour ini sudah benar diimplementasi.
* Gunakan [framework mocha](http://mochajs.org) untuk melakukan testing.