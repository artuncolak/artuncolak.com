---
title: Ubuntu Üzerinde Nginx Server Kurulumu
slug: ubuntu-uzerinde-nginx-server-kurulumu
description: 'Ubuntu üzerinde Nginx server kurulum rehberi.'
date: 2020-07-16T18:58:54Z
preview: '/media/2020-07-16-ubuntu-üzerinde-nginx-server-kurulumu/main.png'
---

Bu rehberde size websiteniz için Ubuntu üzerinde Nginx server nasıl kurulur onu anlatmaya çalışacağım.

Yüksek eş zamanlı çalışma kabiliyeti, yüksek performans ve düşük hafıza kullanımına odaklanılarak tasarlanmış bir Web serverdır.

Eğer Ubuntu serverınıza root girişi yaptıysanız başlayabiliriz.

### Nginx kurulumu

`apt install nginx`

### Sitemizin dosyalarının tutulacağı dizinin oluşturulması

Default olarak Nginx site dosyalarını `/var/www/` dizininde tutmaktadır siz istediğiniz yerde dosyalarınızı saklayabilirsiniz ben bu dizinde saklayacağım.

`mkdir deneme.com`

### Nginx için sites-available dizininde yeni sitemizin oluşturulması

Bu dizinde sitemizin yapılandırma dosyasını oluşturacağız.

`cd /etc/nginx/sites-available`
`touch deneme.com`

### Yeni sitemizin yapılandırmasının yapılması

Yukarıda oluşturduğumuz deneme.com dosyasını istediğiniz editörle açabilirsiniz. Çoğu linux dağıtımında nano ve vim yüklü olarak gelmektedir ben vim kullanacağım.

`vim deneme.com`

Yukarıdaki komutu çalıştırıp vim’e girdikten sonra insert tuşu ile yazma moduna geçebilirsiniz.

Açılan boş sayfaya aşağıdaki konfigürasyonları yazalım.

```json
server {
    listen 80;
    server_name deneme.com www.deneme.com;
    root /var/www/deneme.com;
    index index.html;
    access_log /var/log/nginx/deneme.com.access.log;
    error_log /var/log/nginx/deneme.com.error.log;
    location / { try_files $uri /index.html =404; }
}
```

`ESC` tuşuna basarak insert modundan çıkıp `:wq` komutu ile vimden çıkış yapalım.

### Sitenin Nginx için aktive edilmesi

Nginx’e oluşturduğumuz sitenin aktif olduğunu söylememiz gerekiyor. Bunun için `/etc/nginx/sites-enabled` dizininde sitemizin bir linkini oluşturmamız gerekiyor.

`cd /etc/nginx/sites-enabled` `ln -s ../sites-available/deneme.com`

### Site dizinine gerekli izinlerin verilmesi

`chown -R $USER:www-data /var/www/deneme.com`
`chmod 755 -R`
`/var/www/deneme.com`

Sitemizin dizinine kadar olan tüm dizinlerin çalıştırılabilir yapılması gerekiyor.

`chmod +x /var/www`
`chmod +x /var/www/deneme.com`

### Nginxin yeniden başlatılması

`service nginx restart`

### Nginx in test edilmesi için index.html oluşturmak

`cd /var/www/deneme.com`
`touch index.html`
`echo Merhaba > index.html`

### deneme.com adresine gidin (bu sizin kendi domaininiz ya da ip adresiniz olacak)

Tebrikler😄. Eğer ekranda Merhaba yazısını gördüyseniz başardınız demektir.
