## Jest Nedir?

Çeşitli JavaScript projelerinde kullanılan popüler araçlardan biri olan Jest, test süreçlerini kolaylaştırma ve geliştirme verimliliğini artırma konularında önemli bir rol oynamaktadır.

## Proje

Node-Express projesinde Jest kullanarak test yazma sürecini simüle etmek amacıyla bir proje oluşturdum. Projemizde yalnızca bir "user" tablosu bulunuyor. Bu "user" tablosuna yönelik olumlu ve olumsuz işlemlerin tüm senaryolarını test ederek, doğru hataların üretilip üretilmediğini ve diğer durumların kontrolünü sağlamayı hedefledim.

## Test Kodlarının Önemi

Projelerimizde test kodlarını yazmak, zaman zaman yorucu ve uğraştırıcı bir süreç olabilir; ancak test kodlarının gerçekten büyük bir önemi vardır.

Test kodları, yazılım geliştirme sürecinin kritik bir parçasını oluşturur. Doğru ve eksiksiz testler, yazılımın hatasız çalışmasını sağlamak ve istikrarlı bir şekilde işlevsel olmasını garanti etmek için gereklidir. Test kodları, potansiyel hataları erkenden tespit etmenize, kodunuzu güncellediğinizde geriye dönük uyumluluğu sürdürmenize ve ürününüzü güvenilir bir şekilde sunmanıza yardımcı olur.

## Proje Çalıştırma

1. İlk adım olarak, projenizi test etmeye başlamadan önce "db" klasöründeki Docker dosyasını başlatmalısınız. Bu işlem, veritabanınızın düzgün bir şekilde çalışmasını sağlayacaktır.

2. Docker başlatıldıktan sonra, veritabanını oluşturmak ve gerekli tabloyu yaratmak için `npm run start` komutunu kullanmalısınız. Bu adım, projenizin veritabanı bağlantısını hazır hale getirecektir.

3. Veritabanı işlemleri tamamlandıktan sonra, "start" işlemini durdurmalısınız, çünkü testler aynı HTTP sunucusu üzerinden işlem yapacaklar ve bu nedenle hata alabilirsiniz.

4. Son olarak, test kodlarını çalıştırmak için `npm test` komutunu kullanmalısınız. Bu adım, projenizin test sonuçlarını görüntülemenizi sağlar.
