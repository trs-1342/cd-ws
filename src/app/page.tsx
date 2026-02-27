"use client";

import { useEffect } from "react";
import GithubTables from "./components/GithubTables";

const NAV = [
  { id: "home", label: "Ana Sayfa" },
  { id: "amac", label: "Projenin Amacı" },
  { id: "yapi", label: "Proje Yapısı" },
  { id: "indirme", label: "İndirme & Düzenleme" },
  { id: "kurallar", label: "Katılım Kuralları" },
  { id: "belgelendirme", label: "Belgelendirme" },
  { id: "hedefler", label: "Hedefler" },
  { id: "katkicilar", label: "Katkı Sağlayanlar" },
];

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("dark-theme");
  const next = isDark ? "light" : "dark";
  if (next === "dark") body.classList.add("dark-theme");
  else body.classList.remove("dark-theme");
  try { localStorage.setItem("cdersleri-theme", next); } catch { }
}

export default function Page() {
  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as HTMLAnchorElement;
      if (t?.tagName === "A" && t.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = t.getAttribute("href")!.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <main>
      {/* Üst çubuk */}
      <header className="header">
        <div className="header-inner">

          <nav className="nav">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}>{n.label}</a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Temayı değiştir"
              title="Temayı değiştir"
            >
              {/* Güneş ikonu (aydınlık) */}
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              {/* Ay ikonu (karanlık) */}
              <svg className="icon-moon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
              </svg>
              Tema
            </button>

            <a
              className="badge"
              href="https://github.com/iguGH2026/c-dersleri"
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden>◆</span> GitHub
            </a>
          </div>
        </div>
      </header>

      <section id="home" className="section hero">
        <div className="hero-content" style={{ display: "flex", alignItems: "center", gap: 48, justifyContent: "space-between" }}>
          <div style={{ flex: 1, maxWidth: 750 }}>
            <div className="badge" style={{ marginBottom: 16 }}>
              IGÜ · Yazılım Mühendisliği · C
            </div>
            <h1 className="title">C Dersleri (c-dersleri)</h1>
            <p>
              İstanbul Gelişim Üniversitesi Yazılım Mühendisliği öğrencileri için
              ortak C projesi. Disiplinli pratik, açık kaynak katkı geçmişi ve
              gerçek Git–GitHub akışı.
            </p>
            <div className="cta">
              <a className="badge" href="#amac">Projenin Amacı</a>
              <a className="badge" href="#indirme">Kurulum &amp; Akış</a>
              <a
                className="badge"
                href="https://github.com/iguGH2026/c-dersleri/tree/main/Proje_Kullanim_Klavuzu"
                target="_blank"
                rel="noreferrer"
              >
                Kullanım Klavuzu
              </a>
            </div>
          </div>
          <div>
            <img
              src="./cp.png"
              alt="cp"
              loading="lazy"
              style={{
                width: 260,
                maxWidth: "40vw",
                height: "auto",
                borderRadius: 8,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            />
          </div>
        </div>
      </section>


      <div className="hr" />

      <GithubTables />

      {/* PROJENİN AMACI */}
      <section id="amac" className="section" style={{ padding: "64px 0" }}>
        <h2>PROJENİN AMACI</h2>
        <div style={{ marginTop: 16, maxWidth: 800 }}>
          <p>
            Bu proje, İstanbul Gelişim Üniversitesi Yazılım Mühendisliği 1. sınıf
            öğrencilerinin C dilinde öğrendiklerini uygulamalı şekilde
            geliştirmesi ve ortak bir GitHub deposu üzerinden paylaşması amacıyla
            oluşturulmuştur. Her katılımcı, kendi adına açılmış bir klasörde
            çalışarak bireysel katkı yapar.
          </p>
          <p>
            Amaç; birlikte öğrenmek, kod disiplini kazanmak ve Git–GitHub
            ortamına alışmaktır. Projenin kuralları zor geliyorsa ayrılmanızı
            rica ederiz. Konfor alanında değil, baskı altında öğrenilir.
          </p>
          <p>
            Proje sonunda herkesin kendi CV’sine ve deneyimine ekleyebileceği bir
            açık kaynak proje geçmişi olacak. İlk ayda hemen katılım sağlanması
            beklenmemelidir; hepimiz yolun başındayız ve öğreneceğimiz çok şey var.
          </p>
        </div>
      </section>

      <div className="hr" />

      {/* PROJE YAPISI */}
      <section id="yapi" className="section" style={{ padding: "64px 0" }}>
        <h2>PROJE YAPISI</h2>
        <p style={{ marginTop: 16, maxWidth: 800 }}>
          Her katılımcı için proje ana dizininde bir klasör bulunur.
        </p>
        <div className="grid cols-2" style={{ marginTop: 24 }}>
          <div className="card">
            <pre style={{ fontSize: 14, lineHeight: 1.6 }}>{`ana proje dizini /
│
├─ Ali_Veli        <== örnek klasör adı
├─ Ahmet_Yilmaz    <== örnek klasör adı
├─ Aysenur_Gurses  <== örnek klasör adı
├─ Ismail_Sen      <== örnek klasör adı
└─ README.md       <== proje bilgilendirmesi`}</pre>
          </div>
          <div className="note">
            <p style={{ margin: 0, fontWeight: 600 }}>Proje Kullanım Klavuzu</p>
            <p style={{ marginTop: 8 }}>
              Daha detaylı anlatım için{" "}
              <a
                href="https://github.com/iguGH2026/c-dersleri/tree/main/Proje_Kullanim_Klavuzu"
                target="_blank"
                rel="noreferrer"
              >
                Proje Kullanım Klavuzu
              </a>{" "}
              ’na bakınız.
            </p>
          </div>
        </div>
      </section>

      <div className="hr" />

      {/* İNDİRME & DÜZENLEME */}
      <section id="indirme" className="section" style={{ padding: "64px 0" }}>
        <h2>İNDİRME VE DÜZENLEME SİSTEMİ</h2>

        <div style={{ marginTop: 24, display: "grid", gap: 32 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>1) Katılım ve Erişim İzni</h3>
            <p style={{ marginTop: 8, maxWidth: 800 }}>
              Projeye katkı yapmak isteyen öğrenciler önce yöneticilerle iletişime geçer.
              Yöneticiler, GitHub kullanıcı adınızı aldıktan sonra e-posta adresinize
              davet (invite) gönderir. Daveti kabul eden kullanıcı projeye yazma
              izni kazanır ve <strong>main</strong> branch üzerinde düzenleme yapabilir.
              Katkı talebi için iletişim:{" "}
              <a href="mailto:igu2025gh@hotmail.com">igu2025gh@hotmail.com</a>
            </p>
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>2) Projeyi İndirme (Klonlama)</h3>
            <pre className="card" style={{ marginTop: 8, fontSize: 14 }}>{`git clone https://github.com/iguGH2026/c-dersleri.git
cd c-dersleri`}</pre>
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>3) Çalışmaya Başlamadan Önce Son Güncellemeleri Alma (Zorunlu)</h3>
            <pre className="card" style={{ marginTop: 8, fontSize: 14 }}>{`git switch main
git fetch origin
git pull --rebase origin main

# Çatışma olursa:
git add <duzeltilen-dosyalar>
git rebase --continue`}</pre>
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>4) Klasör Ekleme ve Düzenleme</h3>
            <p style={{ marginTop: 8, maxWidth: 800 }}>
              Her öğrenci yalnızca kendi klasöründe çalışmalıdır. Klasör adı{" "}
              <code className="kbd">Ad_Soyad</code> formatında olmalı, Türkçe karakter
              kullanılmamalıdır.
            </p>
            <pre className="card" style={{ marginTop: 8, fontSize: 14 }}>{`mkdir Ad_Soyad
cd Ad_Soyad
echo "// ilk örnek dosya" > ornek.c`}</pre>
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>5) Değişiklikleri Kaydetme ve Gönderme</h3>
            <pre className="card" style={{ marginTop: 8, fontSize: 14 }}>{`git add .
git commit -m "Ad_Soyad klasörü içinde ornek.c eklendi"
git push origin main

# Uyarı alırsanız:
git pull --rebase origin main
git push origin main`}</pre>
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>6) Yönetici Onayı ve Denetim</h3>
            <p style={{ marginTop: 8, maxWidth: 800 }}>
              Her commit düzenli olarak incelenir. Uygun olmayan değişiklikler geri
              alınabilir. Müdahale durumlarını{" "}
              <a href="mailto:hattab1342@gmail.com">proje yöneticisine</a>{" "}
              bildirin.
            </p>
            <div className="note" style={{ marginTop: 8 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>MÜDAHALE UYARISI</p>
              <p style={{ marginTop: 6 }}>
                Yazdığınız kodlara başkası müdahale ederse dosyalarınızı tekrar
                düzenleyip gönderin veya{" "}
                <a href="mailto:hattab1342@gmail.com">hattab1342@gmail.com</a>{" "}
                adresine iletin.
              </p>
            </div>
          </div>

          <div className="card">
            <p style={{ margin: 0, fontWeight: 600 }}>Gereksinimler (özet)</p>
            <ul style={{ marginTop: 8 }}>
              <li>Git yüklü olmalı. Kontrol: <code className="kbd">git --version</code></li>
              <li>Kimlik ayarı: <code className="kbd">git config --global user.name "Ad Soyad"</code> ve{" "}
                <code className="kbd">git config --global user.email "github_email@example.com"</code></li>
              <li>
                Ayrıntılı rehber:{" "}
                <a
                  href="https://github.com/iguGH2026/c-dersleri/tree/main/Proje_Kullanim_Klavuzu"
                  target="_blank"
                  rel="noreferrer"
                >Proje Kullanım Klavuzu</a>
              </li>
            </ul>
          </div>

          <div className="note">
            <p style={{ margin: 0, fontWeight: 600 }}>DİKKAT (.git)</p>
            <p style={{ marginTop: 6 }}>
              Projede bulunan <code className="kbd">.git</code> klasörüne <u>asla dokunmayın</u>.
            </p>
          </div>
        </div>
      </section>

      <div className="hr" />

      {/* KATILIM KURALLARI */}
      <section id="kurallar" className="section" style={{ padding: "64px 0" }}>
        <h2>KATILIM KURALLARI</h2>
        <ol style={{ marginTop: 16, maxWidth: 800 }}>
          <li>Klasör adınız <code className="kbd">Ad_Soyad</code> (Örn: <code className="kbd">Halil_Hattab</code>) ve Türkçe karakter içermez.</li>
          <li>Yalnızca kendi klasörünüzde dosya oluşturun/silin/düzenleyin.</li>
          <li>Kodlarda Türkçe karakter kullanmayın (ğ, ü, ş, ö, ç, ı).</li>
          <li>Dosya adları anlamlı olsun (ör. <code className="kbd">faktoriyel.c</code>).</li>
          <li>Her kod derlenebilir durumda olmalı; hatalı kod yüklemeyin.</li>
          <li>Git akışı: <code className="kbd">git add .</code> · <code className="kbd">git commit -m "Yeni ödev eklendi"</code> · <code className="kbd">git push</code></li>
          <li>Başkalarının klasörlerine izin olmadan dokunmayın; hata olursa commit’i geri alın.</li>
          <li>Projeler haftalık kontrol edilir; katkılar kendi GitHub hesabınızla görünür.</li>
        </ol>
      </section>

      <div className="hr" />

      {/* BELGELENDİRME */}
      <section id="belgelendirme" className="section" style={{ padding: "64px 0" }}>
        <h2>BELGELENDİRME</h2>
        <p style={{ marginTop: 16, maxWidth: 800 }}>
          Her klasör içinde kısa bir <code className="kbd">README.md</code> dosyası bulunmalı ve şunları içermelidir:
        </p>
        <ul style={{ marginTop: 8, maxWidth: 800 }}>
          <li>Projenin adı</li>
          <li>Ne amaçla yazıldığı</li>
          <li>Kısa çalışma açıklaması</li>
          <li>Derleme ve çalıştırma komutları</li>
        </ul>
      </section>

      <div className="hr" />

      {/* HEDEFLER */}
      <section id="hedefler" className="section" style={{ padding: "64px 0" }}>
        <h2>HEDEFLER</h2>
        <ul style={{ marginTop: 16, maxWidth: 800 }}>
          <li>C dili pratiği yapmak</li>
          <li>Git ve GitHub akışını öğrenmek</li>
          <li>Kodlama disiplinini kazanmak</li>
          <li>Ortak çalışma kültürünü geliştirmek</li>
          <li>Katkı geçmişiyle CV’ye referans oluşturmak</li>
        </ul>
      </section>

      <div className="hr" />

      {/* KATKI SAĞLAYANLAR */}
      {/*<section id="katkicilar" className="section" style={{ padding: "64px 0" }}>
        <h2>Katkı Sağlayanlar</h2>
        <p style={{ marginTop: 8 }}>Bu projeye katkı sağlayan öğrenciler aşağıda listelenmiştir.</p>
        <div className="avatars">
          <a className="avatar" href="https://github.com/iguGH2026" target="_blank" rel="noreferrer">
            <img src="https://avatars.githubusercontent.com/iguGH2026" alt="iguGH2026" width={70} height={70} />
          </a>
          <a className="avatar" href="https://github.com/trs-1342" target="_blank" rel="noreferrer">
            <img src="https://avatars.githubusercontent.com/trs-1342" alt="trs-1342" width={70} height={70} />
          </a>
          <a className="avatar" href="https://github.com/sara-rezk" target="_blank" rel="noreferrer">
            <img src="https://avatars.githubusercontent.com/sara-rezk" alt="sara-rezk" width={70} height={70} />
          </a>
          <a className="avatar" href="https://github.com/qusaitahan2007-debug" target="_blank" rel="noreferrer">
            <img src="https://avatars.githubusercontent.com/qusaitahan2007-debug" alt="qusaitahan2007-debug" width={70} height={70} />
          </a>
          <a className="avatar" href="https://github.com/65SH" target="_blank" rel="noreferrer">
            <img src="https://avatars.githubusercontent.com/65SH" alt="65SH" width={70} height={70} />
          </a>
        </div>
        <div className="note" style={{ marginTop: 16 }}>
          <p style={{ margin: 0, fontWeight: 600 }}>Not</p>
          <p style={{ marginTop: 6 }}>
            Katkıda bulunmak isteyen öğrenciler yöneticiden davet almalı; katkıları
            onaylandıktan sonra bu listeye eklenir.
          </p>
        </div>
      </section>*/}

      <footer>
        <div className="section footer-inner">
          <span>© {new Date().getFullYear()} c-dersleri · IGÜ</span>
          <div className="footer-links">
            <a href="#home">Başa dön</a>
            <a href="https://github.com/iguGH2026/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:igu2025gh@hotmail.com">İletişim</a>
            <a href="https://hattab.vercel.app">Geliştirici</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
